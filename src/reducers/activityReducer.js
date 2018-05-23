import {
  FETCHING_ACTIVITIES,
  FETCHED_ACTIVITIES
} from '../constants'

const initialState = {
  fetching: false,
  activities: []
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case FETCHING_ACTIVITIES:
      return { 
        fetching: true 
      }
    case FETCHED_ACTIVITIES: 
      return { 
        fetching: false, 
        activities: action.payload
      }
    default:
      return state
  }
}