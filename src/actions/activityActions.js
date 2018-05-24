import {
  CREATING_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILED,
  FETCHING_ACTIVITIES,
  FETCH_ACTIVITIES_FAILED,
  FETCH_ACTIVITIES_SUCCESS,
} from '../constants'

import HttpClient from './http-client'


export const creatingActivity = () =>({
  type: CREATING_ACTIVITY
})

export const createActivityFail = error =>({
  type: CREATE_ACTIVITY_FAILED,
  payload: error
})

export const createActivitySucc = activity =>({
  type: CREATE_ACTIVITY_SUCCESS,
  payload: activity
})

export const createActivity = activity =>
  dispatch => {
    dispatch(creatingActivity())
    HttpClient.post('activities', activity).then(newActivity =>{
      dispatch(createActivitySucc(newActivity))
    }).catch(error=>{
      dispatch(createActivityFail(error))
    })
  }

export const fetchingActivities = () =>({
  type: FETCHING_ACTIVITIES
})

export const fetchActivitiesFail = error =>({
  type: FETCH_ACTIVITIES_FAILED,
  payload: error
})

export const fetchActivitiesSucc = activities =>({
  type: FETCH_ACTIVITIES_SUCCESS,
  payload: activities
})

export const fetchActivities = () =>
  dispatch => {
    dispatch(fetchingActivities())
    HttpClient.get('activities').then(activities =>{
      dispatch(fetchActivitiesSucc(activities))
    }).catch(error =>{
      dispatch(fetchActivitiesFail(error))
    })
  }

