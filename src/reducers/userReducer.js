import {
  LOGOUT,
  LOGGING_IN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTERING,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from '../constants'

const initialState = {
  id: null,
  name: null,
  email: null,
  loggingIn: false,
  loggedIn: false,
  loginFailed: false,
  registering: false,
  registerSuccess: false,
  registerFailed: false,
  error: null
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case LOGGING_IN:
      return { 
        loggingIn: true,
        loginFailed: false,
      }
    case LOGIN_SUCCESS: 
      return { 
        loggedInUser: action.payload,
        loggingIn: false, 
        loggedIn: true
      }
    case LOGIN_FAILED:
      return { 
        loggingIn: false,
        loginFailed: true,
        error: action.payload
      }
    case LOGOUT:
      return {
        loggingIn: false,
        loggedIn: false,
      }
    case REGISTERING:
      return { 
        registering: true,
        registerFailed: false,
      }
    case REGISTER_FAIL: 
      return { 
        registering: false, 
        registerFailed: true,
        error: action.payload
      }
    case REGISTER_SUCCESS:
      return { 
        registering: false,
        registerSuccess: true
      } 
    default:
      return state
  }
}