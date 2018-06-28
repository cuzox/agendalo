import {
  LOAD_APP
} from '../constants'

const initialState = {
  loaded: false
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case LOAD_APP:
      return {
        ...state,
        loaded: true 
      }
    default:
      return state
  }
}