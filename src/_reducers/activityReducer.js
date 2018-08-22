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
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_SCHEDULED_ACTIVITIES_SUCC,
  SCHEDULING_ACTIVITY,
  SCHEDULE_ACTIVITY_SUCC,
  SCHEDULE_ACTIVITY_FAIL,
  ACTIVITY_RESET,
  CREATE_NOT_LOGGED_IN,
  REMOVE_SCHEDULED_ACTIVITY,
  FILTER_ACTIVITIES,
  REMOVE_ACTIVITY_FAIL,
  REMOVE_ACTIVITY_SUCC,
  REMOVING_ACTIVITY
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
  scheduleSucc: false,
  scheduleFail: null,
  attemptToCreateNotLoggedIn: false,
  myActivities: [],
  scheduledActivities: [],
  activities: [],
  visible: [],
  search: '',
  filter: {},
  removing: false,
  removeSucc: false,
  removeFail: null
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case FETCHING_ACTIVITY:
    case FETCHING_ACTIVITIES:
      return {
        ...state,
        fetching: true 
      }
    case FETCH_MY_ACTIVITIES_SUCCESS: 
      return {
        ...state,
        fetching: false,
        myActivities: action.payload
      }
    case FETCH_SCHEDULED_ACTIVITIES_SUCC: 
      return {
        ...state,
        fetching: false,
        scheduledActivities: action.payload
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
        createSuccess: true
      }
    case CREATE_ACTIVITY_FAILED: 
      return {
        ...state,
        creating: false,
        createFailed: action.payload
      }
    case SCHEDULING_ACTIVITY:
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
    case SCHEDULE_ACTIVITY_SUCC:
      return {
        ...state,
        updating: false,
        scheduleSucc: true
      }
    case SCHEDULE_ACTIVITY_FAIL:
      return {
        ...state,
        updating: false,
        scheduleFail: action.payload
      }
    case REMOVE_SCHEDULED_ACTIVITY:
      return {
        ...state,
        scheduledActivities: state.scheduledActivities.filter( act => act.id != action.payload )
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
        createSuccess: false,
        updateFailed: null,
        updateSuccess: null,
        scheduleSucc: false,
        scheduleFail: null,
        removeFail: null,
        removeSucc: false
      }
    case FILTER_ACTIVITIES:
      const filter = {
        ...state.filter,
        ...action.payload.filter
      }

      return {
        ...state,
        filter,
        visible: (action.payload.list || state.activities).filter(act =>
          Object.keys(filter).every(key => 
            typeof filter[key] == "number" && filter[key] == act[key] ||
            typeof filter[key] == "string" && act[key].toLowerCase().includes(filter[key].toLowerCase()) ||
            !filter[key]
          )
        )
      }
    case CREATE_NOT_LOGGED_IN:
      return {
        ...state,
        attemptToCreateNotLoggedIn: action.payload
      }
    case REMOVING_ACTIVITY:
      return {
        ...state,
        removing: true
      }
    case REMOVE_ACTIVITY_SUCC:
      return {
        ...state,
        removing: false,
        removingSucc: true,
        activities: state.activities.filter( act => act.id != action.payload ),
        visible: state.visible.filter( act => act.id != action.payload )
      }
    case REMOVE_ACTIVITY_FAIL:
      return {
        ...state,
        removing: false,
        error: action.payload
      }
    default:
      return state
  }
}