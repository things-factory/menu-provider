import { UPDATE_MENU_PROVIDER } from '../actions/main'

const INITIAL_STATE = {
  state_main: 'ABC'
}

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MENU_PROVIDER:
      return { ...state }

    default:
      return state
  }
}

export default main
