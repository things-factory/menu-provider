import { updateBaseMenu } from '@things-factory/base-menu'
import { store } from '@things-factory/shell'
import { LitElement } from 'lit-element'

export default class MenuProvider extends LitElement {
  static get properties() {
    return {}
  }

  firstUpdated(changedProperties) {
    var searchParam = new URLSearchParams()
    searchParam.append('query', JSON.stringify([{ name: 'hidden_flag', operator: 'is_not_true' }]))

    fetch(`http://52.231.75.202/rest/menus/user_menus/STANDARD?${searchParam}`, {
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          store.dispatch(updateBaseMenu(this._convertMenu(json)))
          return json
        })
      }
    })
  }

  _convertMenu(menus = []) {
    const menuObject = {}
    const menuList = []
    menus.forEach(m => {
      if ((m.menu_type || '').toUpperCase() === 'MENU') {
        menuObject[m.id] = Object.assign({}, menuObject[m.id], {
          rank: m.rank,
          name: m.title
        })
      } else {
        if (!menuObject[m.parent_id])
          menuObject[m.parent_id] = {
            children: []
          }

        menuObject[m.parent_id].children.push({
          rank: m.rank,
          name: m.title,
          pageName: m.routing,
          routingType: m.routing_type,
          menuId: m.id,
          idField: m.id_field
        })
      }
    })

    Object.values(menuObject).forEach(v => {
      menuList.push(v)
    })

    return menuList
  }
}

window.customElements.define('menu-provider', MenuProvider)
