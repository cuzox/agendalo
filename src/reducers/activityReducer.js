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
        fetching: true 
      }
    case FETCH_ACTIVITIES_SUCCESS: 
      return { 
        fetching: false,
        activities: action.payload
      }
    case FETCH_ACTIVITIES_FAILED: 
      return { 
        fetching: false,
        fetchingFailed: true,
        error: action.payload
      }
    case CREATING_ACTIVITY:
      return { 
        creating: true 
      }
    case CREATE_ACTIVITY_SUCCESS: 
      return { 
        creating: false,
        createdActivity: action.payload
      }
    case CREATE_ACTIVITY_FAILED: 
      return { 
        creating: false,
        creatingFailed: true,
        error: action.payload
      }
    default:
      return state
  }
}