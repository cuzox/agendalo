import {
  CREATING_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILED,
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
  SCHEDULING_ACTIVITY,
  SCHEDULE_ACTIVITY_SUCC,
  SCHEDULE_ACTIVITY_FAIL,
  ACTIVITY_RESET,
  CREATE_NOT_LOGGED_IN,
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_SCHEDULED_ACTIVITIES_SUCC,
  REMOVE_SCHEDULED_ACTIVITY,
  REMOVING_ACTIVITY,
  REMOVE_ACTIVITY_SUCC,
  REMOVE_ACTIVITY_FAIL,
  FILTER_ACTIVITIES
} from '../constants'

import HttpClient from '../_helper/http-client'
import uuidv4 from 'uuid/v4'

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

export const createActivity = (activity, photos) => (
  (dispatch, getState) => {
    let url = HttpClient.url()
    let accountId = getState().user.id
    dispatch(creatingActivity())
    HttpClient.post(`Accounts/${accountId}/Activities`, activity).then(res =>{
      let newActivity = res.data
      let files = {}, filenames = []
      photos.forEach((photo, i) => {
        filenames.push(`${newActivity.id}_${photo.key}.${photo.file.name.split('.').pop()}`)
        files["nomatter" + i] = photo.file
      })

      Promise.all([
        HttpClient.form(`Containers/${accountId}/upload`, files, filenames),
        HttpClient.put(`Activities/${newActivity.id}`, {
          ...newActivity,
          photos: filenames.map(filename => `${url}/Containers/${accountId}/download/${filename}`)
        })
      ]).then(res => {
        dispatch(createActivitySucc())
      })

    }).catch(error=>{
      dispatch(createActivityFail(error))
    })
  }
)

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

export const fetchActivities = filter => (
  dispatch => {
    dispatch(fetchingActivities())
    HttpClient.get('activities', filter).then(res =>{
      dispatch(fetchActivitiesSucc(res.data))
    }).catch(error =>{
      dispatch(fetchActivitiesFail(error))
    })
  }
)

export const fetchMyActivities = () => (
  (dispatch, getState) => {
    let state = getState()
    dispatch(fetchingActivities())
    HttpClient.get(`accounts/${state.user.id}/activities`).then(res =>{
      dispatch(fetchingMyActivitiesSucc(res.data))
    }).catch(error =>{
      dispatch(fetchActivitiesFail(error))
    })
  }
)

export const fetchingMyActivitiesSucc = myActivities =>({
  type: FETCH_MY_ACTIVITIES_SUCCESS,
  payload: myActivities
})

export const fetchScheduledActivities = () => (
  (dispatch, getState) => {
    let accountId = getState().user.id
    dispatch(fetchingActivities())
    HttpClient.get(`Accounts/${accountId}/savedActivities`).then(res =>{
      dispatch(fetchScheduledActivitiesSucc(res.data))
    }).catch(error =>{
      dispatch(fetchActivitiesFail(error))
    })
  }
)

export const fetchScheduledActivitiesSucc = scheduledActivities =>({
  type: FETCH_SCHEDULED_ACTIVITIES_SUCC,
  payload: scheduledActivities
})

export const fetchingActivity = () =>({
  type: FETCHING_ACTIVITY
})

export const fetchActivity = id => (
  dispatch => {
    dispatch(fetchingActivity())
    HttpClient.get(`activities/${id}`).then(res =>{
      dispatch(fetchActivitySucc(res.data))
    }).catch(error =>{
      dispatch(fetchActivityFail(error))
    })
  }
)

export const fetchActivityFail = error =>({
  type: FETCH_ACTIVITY_FAILED,
  payload: error
})

export const fetchActivitySucc = activity =>({
  type: FETCH_ACTIVITY_SUCCESS,
  payload: activity
})

export const updatingActivity = () =>({
  type: UPDATING_ACTIVITY
})

export const updateActivityFail = err =>({
  type: UPDATE_ACTIVITY_FAILED,
  payload: err
})

export const updateActivitySucc = activity =>({
  type: UPDATE_ACTIVITY_SUCCESS,
  payload: activity
})

export const removeScheduledActivitySucc = id => ({
  type: REMOVE_SCHEDULED_ACTIVITY,
  payload: id
})

export const removeScheduledActivity = id =>
  (dispatch, getState)=>{
    let accountId = getState().user.id
    dispatch(removeScheduledActivitySucc(id))
    HttpClient.delete(`Accounts/${accountId}/savedActivities/rel/${id}`)
  }

export const schedulingActivity = () =>({
  type: SCHEDULING_ACTIVITY
})

export const scheduleActivitySucc = () =>({
  type: SCHEDULE_ACTIVITY_SUCC
})

export const scheduleActivityFail = err =>({
  type: SCHEDULE_ACTIVITY_FAIL,
  payload: err
})

export const updateActivity = (activity, photos) => 
  (dispatch, getState) => {
    let url = HttpClient.url()
    let accountId = getState().user.id

    let files = {}, newFilenames = [], oldFilenames = []
    photos.forEach((photo, i) => {
      if(photo.deleted){
        HttpClient.delete(`Containers/${accountId}/files/${photo.src.split('/').pop()}`)
      }else if(photo.link){
        oldFilenames.push(photo.src)
      } else {
        newFilenames.push(`${activity.id}_${uuidv4()}.${photo.file.name.split('.').pop()}`)
        files["nomatter" + i] = photo.file
      }
    })

    if(Object.keys(files).length){
      dispatch(uploadingPhotos())
      HttpClient.form(`Containers/${accountId}/upload`, files, newFilenames).then(()=>{
        dispatch(uploadPhotosSucc())
      }).catch(error=>{
        dispatch(uploadPhotosFail(error))
      })
    }

    dispatch(updatingActivity())
    HttpClient.put(`Activities/${activity.id}`, {
      ...activity,
      photos: [
        ...oldFilenames,
        ...newFilenames.map(filename => `${url}/Containers/${accountId}/download/${filename}`)
      ]
    }).then(updatedActivity=>{      
      dispatch(updateActivitySucc(updatedActivity))
    }).catch(error=>{
      dispatch(updateActivityFail(error))
    })
  }

export const scheduleActivity = id =>
  (dispatch, getState) => {
    let accountId = getState().user.id
    dispatch(schedulingActivity())
    HttpClient.put(`Accounts/${accountId}/savedActivities/rel/${id}`).then(()=>{
      dispatch(scheduleActivitySucc())
    }).catch( err =>{
      dispatch(scheduleActivityFail())
    })
  }

export const uploadingPhotos = () => ({
  type: UPLOADING_PHOTOS
})

export const uploadPhotosFail = err => ({
  type: UPLOAD_PHOTOS_FAILED,
  payload: err
})

export const uploadPhotosSucc = () => ({
  type: UPLOAD_PHOTOS_SUCCESS
})

export const reset = () =>({
  type: ACTIVITY_RESET
})

export const filterActivities = filter => ({
  type: FILTER_ACTIVITIES,
  payload: filter
})

export const createNotLoggedIn = yesOrNah => ({
  type: CREATE_NOT_LOGGED_IN,
  payload: yesOrNah
})

export const removeActivity = id => 
  (dispatch, getState) => 
    new Promise((succ, fail) => {
      dispatch(removingActivity())
      let accountId = getState().user.id 
      HttpClient.delete(`Accounts/${accountId}/activities/${id}`).then(()=>{
        dispatch(removeActivitySucc(id))
        succ()
      }).catch(()=> 
        dispatch(removeActivityFail())
      )
    })
  

export const removeActivityFail = error =>({
  type: REMOVE_ACTIVITY_FAIL,
  payload: error
})

export const removeActivitySucc = id =>({
  type: REMOVE_ACTIVITY_SUCC,
  payload: id
})

export const removingActivity = () =>({
  type: REMOVING_ACTIVITY
})