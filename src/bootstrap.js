import { store } from '@things-factory/shell'
import menuProvider from './reducers/main'

export default function bootstrap() {
  store.addReducers({
    menuProvider
  })
}
