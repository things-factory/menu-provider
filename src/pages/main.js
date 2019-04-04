import { store } from '@things-factory/shell'
import { html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import logo from '../../assets/images/hatiolab-logo.png'

import '../components/menu-provider'

class MenuProviderMain extends connect(store)(LitElement) {
  static get properties() {
    return {
      menuProvider: String
    }
  }
  render() {
    return html`
      <section>
        <h2>MenuProvider</h2>
        <img src=${logo}></img>
        <a href="base-menu-main">Move</a>
      </section>

      <menu-provider></menu-provider>
    `
  }

  stateChanged(state) {
    this.menuProvider = state.menuProvider.state_main
  }
}

window.customElements.define('menu-provider-main', MenuProviderMain)
