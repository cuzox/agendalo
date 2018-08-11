import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import store from "./store"
import App from './App'

import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css'

import 'element-theme-default';

import { LocaleProvider } from 'antd';
import es_ES from 'antd/lib/locale-provider/es_ES';
import 'moment/locale/es';

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={ store }>
    <LocaleProvider locale={es_ES}><App /></LocaleProvider>
  </Provider>, 
  document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={ store }>
        <LocaleProvider locale={es_ES}><App /></LocaleProvider>
      </Provider>, 
      document.getElementById('root'))
  })
}
registerServiceWorker();
