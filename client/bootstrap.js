import { store } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import { updateMenu } from '@things-factory/menu-base'

export default function bootstrap() {
  auth.on('profile', fetchMenus)
}

function fetchMenus() {
  var state = store.getState()
  var baseUrl = state.app.baseUrl

  var searchParam = new URLSearchParams()
  searchParam.append('query', JSON.stringify([{ name: 'hidden_flag', operator: 'is_not_true' }]))

  fetch(`${baseUrl}/menus/user_menus/STANDARD?${searchParam}`, {
    credentials: 'include'
  }).then(res => {
    if (res.ok) {
      res.json().then(json => {
        store.dispatch(updateMenu(_convertMenu(json)))
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
        ...m
      })
    } else {
      if (!menuObject[m.parent_id])
        menuObject[m.parent_id] = {
          children: []
        }

      menuObject[m.parent_id].children.push({
        ...m
      })
    }
  })

  Object.values(menuObject).forEach(v => {
    menuList.push(v)
  })

  return menuList
}
