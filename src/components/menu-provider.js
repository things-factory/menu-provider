import { LitElement } from 'lit-element'
import { store } from '@things-factory/shell'
import { updateBaseMenu } from '@things-factory/base-menu'

export default class MenuProvider extends LitElement {
  static get properties() {
    return {}
  }

  firstUpdated(changedProperties) {
    fetch('http://board-demo.hatiolab.com/rest/menus', {
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          store.dispatch(updateBaseMenu(this._convertMenu(json.items)))
          return json
        })
      }
    })
  }

  _convertMenu(menus = []) {
    return menus.map(m => {
      return {
        name: m.name,
        pageName: m.routing
      }
    })
  }
}

window.customElements.define('menu-provider', MenuProvider)
