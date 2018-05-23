import {
  FECTHING_CATEGORIES,
  FETCHED_CATEGORIES
} from '../constants'

const initialState = {
  fetching: false,
  categories: []
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case FECTHING_CATEGORIES:
      return { 
        fetching: true 
      }
    case FETCHED_CATEGORIES: 
      return { 
        fetching: false,
        categories: action.payload
      }
    default:
      return state
  }
}