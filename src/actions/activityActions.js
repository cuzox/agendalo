import {
  ADD_REMOVE_IMAGE,
} from '../constants'

export const addImage = image =>{
  type: ADD_REMOVE_IMAGE
  payload: image
}