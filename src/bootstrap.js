import { store } from '@things-factory/shell'
import { updateBaseMenu } from '@things-factory/base-menu'
import menuProvider from './reducers/main'

export default function bootstrap() {
  store.addReducers({
    menuProvider
  })

  fetchMenuInfo()
}

function fetchMenuInfo() {
  var searchParam = new URLSearchParams()
  searchParam.append('query', JSON.stringify([{ name: 'hidden_flag', operator: 'is_not_true' }]))

  fetch(`http://52.231.75.202/rest/menus/user_menus/STANDARD?${searchParam}`, {
    credentials: 'include'
  }).then(res => {
    if (res.ok) {
      res.json().then(json => {
        store.dispatch(updateBaseMenu(_convertMenu(json)))
        return json
      })
    }
  })
}

function _convertMenu(menus = []) {
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
        menuId: m.id
      })
    }
  })

  Object.values(menuObject).forEach(v => {
    menuList.push(v)
  })

  return menuList
}
