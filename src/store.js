import { applyMiddleware, createStore} from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"

import reducers from "./_reducers"

const middleware = applyMiddleware(thunk, logger)
const store = createStore(reducers, middleware)

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept('./_reducers', () => {
      store.replaceReducer(reducers, middleware)
    })
  }
}

export default store