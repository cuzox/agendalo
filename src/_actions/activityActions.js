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
  ACTIVITY_RESET,
  SEARCH_ACTIVITIES
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

export const createActivity = (accountId, activity, photos) => (
  dispatch => {
    let url = HttpClient.url()
    dispatch(creatingActivity())
    HttpClient.post(`Accounts/${accountId}/Activities`, activity).then(res =>{
      let newActivity = res.data
      dispatch(createActivitySucc(newActivity))
      console.log("photos", photos)
      let files = {}, filenames = []
      photos.forEach((photo, i) => {
        filenames.push(`${newActivity.id}_${uuidv4()}.${photo.name.split('.').pop()}`)
        files["nomatter" + i] = photo
      })

      dispatch(uploadingPhotos())
      HttpClient.form(`Containers/${accountId}/upload`, files, filenames).then(()=>{
        dispatch(uploadPhotosSucc())
      }).catch(error=>{
        dispatch(uploadPhotosFail(error))
      })

      dispatch(updatingActivity())
      HttpClient.patch(`Activities/${newActivity.id}`, {
        photos: filenames.map(filename => `${url}/Containers/${accountId}/download/${filename}`)
      }).then(updatedActivity=>{      
        dispatch(updateActivitySucc(updatedActivity))
      }).catch(error=>{
        dispatch(updateActivityFail(error))
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

export const updateActivity = activity => (
  dispatch => {
    dispatch(updatingActivity())
    HttpClient.patch('activities', activity).then(updatedActivity =>{
      dispatch(updateActivitySucc(updatedActivity))
    }).catch(error =>{
      dispatch(updateActivityFail(error))
    })
  }
)

export const uploadingPhotos = () =>({
  type: UPLOADING_PHOTOS
})

export const uploadPhotosFail = err =>({
  type: UPLOAD_PHOTOS_FAILED,
  payload: err
})

export const uploadPhotosSucc = () =>({
  type: UPLOAD_PHOTOS_SUCCESS
})

export const reset = () =>({
  type: ACTIVITY_RESET
})

export const searchActivities = search =>({
  type: SEARCH_ACTIVITIES,
  payload: search
})