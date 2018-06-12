import {
  LOGOUT,
  LOGGING_IN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTERING,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from '../constants'

import HttpClient from './http-client'

export const loggingIn = () => ({
  type: LOGGING_IN
})

export const loginFail = error => ({
  type: LOGIN_FAILED,
  payload: error
})

export const loginSucc = user => ({
  type: LOGIN_SUCCESS,
  payload: user
})

export const logout = () => ({
  type: LOGOUT
})

export const login = credentials =>
  dispatch => {
    dispatch(loggingIn())
    HttpClient.post('accounts/login', credentials, { include: "user" }).then(user =>{
      localStorage.token = JSON.stringify(user.data.id)
      delete user.data.id
      localStorage.user = JSON.stringify(user.data)
      dispatch(loginSucc(user.data))
    }).catch( error =>{
      dispatch(loginFail(error))
    })
  }

export const registering = () => ({
  type: REGISTERING
})

export const registerSucc = user => ({
  type: REGISTER_SUCCESS,
  payload: user
})

export const registerFail = error => ({
  type: REGISTER_FAIL,
  payload: error
})

export const register = payload =>
  dispatch => {
    dispatch(registering())
    HttpClient.post('accounts', payload).then(res =>{
      dispatch(registerSucc(res.data))
    }).catch( error =>{
      dispatch(registerFail(error))
    })
  }