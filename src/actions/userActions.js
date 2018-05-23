import {
  LOGOUT,
  LOGGING_IN,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from '../constants'

export const loggingIn = () => ({
  type: LOGGING_IN
})

export const loginFail = () => ({
  type: LOGIN_FAILED
})

export const loginSucc = () => ({
  type: LOGIN_SUCCESS
})

export const logout = () => ({
  type: LOGOUT
})

export const login = email =>
  dispatch => {
    dispatch(loggingIn())
    let response = {
      name: "Will",
      email: "will@email.com"
    }
    dispatch(loginSucc(response))
  }
