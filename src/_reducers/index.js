import { combineReducers } from "redux"

import user from "./userReducer"
import category from "./categoryReducer"
import activity from "./activityReducer"

export default combineReducers({
  user,
  category,
  activity
})