import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux"
import store from "./store"
import App from './components/App';

import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, 
  document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <Provider store={ store }>
        <App />
      </Provider>, 
      document.getElementById('root'))
  })
}
registerServiceWorker();
