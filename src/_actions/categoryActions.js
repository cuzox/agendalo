import {
  FECTHING_CATEGORIES,
  FETCHED_CATEGORIES
} from '../constants'

import HttpClient from '../_helper/http-client'

export const setCategories = categories =>({
  type: FETCHED_CATEGORIES,
  payload: categories
})

export function fetchCategories(){
  return dispatch =>{
    HttpClient.get('Categories').then(res => res.data).then(categories =>{
      let normalize = categories.map(cat =>({
        key: cat.id,
        value: cat.id,
        text: cat.name
      }))
      normalize.unshift({key: 0, value: 0, text: "Todas"})

      dispatch(setCategories(normalize))
    })    
  }
}