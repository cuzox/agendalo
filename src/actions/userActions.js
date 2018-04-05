import {
  LOG_IN,
  LOG_OUT
} from '../constants'

export const logIn = email => ({type: LOG_IN, payload: email})
export const logOut = () => ({type: LOG_OUT})

export function logInAsync(){
  return dispatch => {
    let response = {
      name: "Will",
      email: "will@email.com"
    }
    dispatch(logIn(response))
  }
}

