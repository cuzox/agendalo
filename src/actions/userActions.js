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

export const logout = () => 
  dispatch => {
    localStorage.clear()
    dispatch({ type: LOGOUT })
  }

export const login = credentials =>
  dispatch => {
    dispatch(loggingIn())
    HttpClient.post('accounts/login?include=user', credentials).then(user =>{
      if(!user.data.user) dispatch(loginFail({error: "Couldn't retrieve user"}))
      else{
        try{
          localStorage.setItem('token', JSON.stringify(user.data.id))
          localStorage.setItem('user', JSON.stringify(user.data.user))
          dispatch(loginSucc(user.data.user))
        } catch (err){
          dispatch(loginFail(err))
        }
      }
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

  export const reset = () => ({
    type: AUTH_RESET
  })