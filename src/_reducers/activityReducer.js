import {
  CREATING_ACTIVITY,
  CREATE_ACTIVITY_FAILED,
  CREATE_ACTIVITY_SUCCESS,
  UPDATING_ACTIVITY,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_FAILED,
  UPLOADING_PHOTOS,
  UPLOAD_PHOTOS_SUCCESS,
  UPLOAD_PHOTOS_FAILED,
  FETCHING_ACTIVITIES,
  FETCH_ACTIVITIES_FAILED,
  FETCH_ACTIVITIES_SUCCESS,
  FETCHING_ACTIVITY,
  FETCH_ACTIVITY_FAILED,
  FETCH_ACTIVITY_SUCCESS,
  ACTIVITY_RESET,
  SEARCH_ACTIVITIES,
  CREATE_NOT_LOGGED_IN
} from '../constants'

const initialState = {
  fetching: false,
  fetchingFailed: null,
  creating: false,
  createSuccess: null,
  createFailed: null,
  updating: false,
  updateSuccess: null,
  updateFailed: null,
  uploading: false,
  uploadSuccess: false,
  uploadFailed: null,
  attemptToCreateNotLoggedIn: false,
  activities: [],
  visible: [],
  search: ''
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case FETCHING_ACTIVITY:
    case FETCHING_ACTIVITIES:
      return {
        ...state,
        fetching: true 
      }
    case FETCH_ACTIVITIES_SUCCESS: 
      return {
        ...state,
        fetching: false,
        activities: action.payload,
        visible: action.payload
      }
    case FETCH_ACTIVITY_FAILED: 
    case FETCH_ACTIVITIES_FAILED: 
      return {
        ...state,
        fetching: false,
        fetchingFailed: action.payload
      }
    case FETCH_ACTIVITY_SUCCESS: 
      return {
        ...state,
        fetching: false,
        activity: action.payload
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
        createSuccess: action.payload
      }
    case CREATE_ACTIVITY_FAILED: 
      return {
        ...state,
        creating: false,
        createFailed: action.payload
      }
    case UPDATING_ACTIVITY:
      return {
        ...state,
        updating: true
      }
    case UPDATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        updating: false,
        updateSuccess: action.payload
      }
    case UPDATE_ACTIVITY_FAILED:
      return {
        ...state,
        updating: false,
        updateFailed: action.payload
      }
    case UPLOADING_PHOTOS:
      return {
        ...state,
        uploading: true
      }
    case UPLOAD_PHOTOS_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploadSuccess: true,
      }
    case UPLOAD_PHOTOS_FAILED:
      return {
        ...state,
        uploading: false,
        uploadFailed: action.payload
      }
    case ACTIVITY_RESET:
      return {
        ...state,
        uploadFailed: null,
        uploadSuccess: false,
        createFailed: null,
        createSuccess: null,
        updateFailed: null,
        updateSuccess: null
      }
    case SEARCH_ACTIVITIES:
      return {
        ...state,
        search: action.payload,
        visible: state.activities.filter(act =>{
          return act.name.toLowerCase().includes(action.payload.toLowerCase()) || !action.payload
        })
      }
    case CREATE_NOT_LOGGED_IN:
      return {
        ...state,
        attemptToCreateNotLoggedIn: action.payload
      }
    default:
      return state
  }
}