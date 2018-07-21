import {
  LOGOUT,
  LOGGING_IN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTERING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_RESET
} from '../constants'

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  loggingIn: false,
  loggedIn: false,
  loginSuccess: false,
  loginFailed: false,
  registering: false,
  registerSuccess: false,
  registerFailed: false,
  isAdmin: false,
  error: null
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case LOGGING_IN:
      return {
        ...state,
        loggingIn: true
      }
    case LOGIN_SUCCESS: 
      return { 
        ...state,
        ...action.payload,
        loggingIn: false,
        loginSuccess: true,
        loggedIn: true,
        isAdmin: action.payload.type == 'admin'
      }
    case LOGIN_FAILED:
      return { 
        ...state,
        loggingIn: false,
        loginFailed: true,
        error: action.payload
      }
    case LOGOUT:
      return {
        ...initialState
      }
    case REGISTERING:
      return { 
        ...state,
        registering: true
      }
    case REGISTER_FAIL: 
      return { 
        ...state,
        registering: false, 
        registerFailed: true,
        error: action.payload
      }
    case REGISTER_SUCCESS:
      return { 
        ...state,
        registering: false,
        registerSuccess: true
      }
    case AUTH_RESET:
      return {
        ...state,
        loginSuccess: false,
        loginFailed: false,
        registerSuccess: false,
        registerFailed: false
      }
    default:
      return state
  }
}