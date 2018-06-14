import {
  CREATING_ACTIVITY,
  CREATE_ACTIVITY_FAILED,
  CREATE_ACTIVITY_SUCCESS,
  FETCHING_ACTIVITIES,
  FETCH_ACTIVITIES_FAILED,
  FETCH_ACTIVITIES_SUCCESS
} from '../constants'

const initialState = {
  fetching: false,
  fetchingFailed: false,
  creating: false,
  createdActivity: null,
  creatingFailed: false,
  error: null,
  activities: []
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case FETCHING_ACTIVITIES:
      return {
        ...state,
        fetching: true 
      }
    case FETCH_ACTIVITIES_SUCCESS: 
      return {
        ...state,
        fetching: false,
        activities: action.payload
      }
    case FETCH_ACTIVITIES_FAILED: 
      return {
        ...state,
        fetching: false,
        fetchingFailed: true,
        error: action.payload
      }
    case CREATING_ACTIVITY:
      return {
        ...state,
        creating: true 
      }
    case CREATE_ACTIVITY_SUCCESS: 
      return {
        ...state,
        creating: false,
        createdActivity: action.payload
      }
    case CREATE_ACTIVITY_FAILED: 
      return {
        ...state,
        creating: false,
        creatingFailed: true,
        error: action.payload
      }
    default:
      return state
  }
}