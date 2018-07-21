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

      normalize.sort((a,b)=> a.text.localeCompare(b.text))
      let otherIndex = normalize.indexOf(normalize.filter(el => el.text == "Otro")[0])
      let other = normalize.splice(otherIndex, 1)[0]
      normalize.push(other)

      dispatch(setCategories(normalize))
    })    
  }
}