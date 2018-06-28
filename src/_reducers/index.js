import { combineReducers } from "redux"

import user from "./userReducer"
import category from "./categoryReducer"
import activity from "./activityReducer"
import app from "./appReducer"

export default combineReducers({
  user,
  category,
  activity,
  app
})