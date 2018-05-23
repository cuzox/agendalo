import {
  LOGOUT,
  LOGGING_IN,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from '../constants'

const initialState = {
  id: null,
  name: null,
  email: null,
  loggingIn: false,
  loggedIn: false,
  error: null
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case LOGGING_IN:
      return { 
        loggingIn: true 
      }
    case LOGIN_FAILED: 
      return { 
        loggingIn: false, 
        error: action.payload
      }
    case LOGIN_SUCCESS: 
      return { 
        ...action.payload,
        loggingIn: false, 
        loggedIn: true
      }
    case LOGOUT:
      return {
          loggingIn: false,
          loggedIn: false,
      }
    default:
      return state
  }
}