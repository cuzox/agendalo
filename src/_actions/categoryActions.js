import {
  FECTHING_CATEGORIES,
  FETCHED_CATEGORIES
} from '../constants'

export const setCategories = categories =>({
  type: FETCHED_CATEGORIES,
  payload: categories
})

export function fetchCategories(){
  return dispatch =>{
    let categories = [
      {
        key: "7",
        value: "7",
        text: "Lanzamiento"
      },
      {
        key: "1",
        value: "1",
        text: "Conferencia"
      },
      {
        key: "2",
        value: "2",
        text: "Concierto"
      },
      {
        key: "3",
        value: "3",
        text: "Campamento"
      },
      {
        key: "4",
        value: "4",
        text: "Charla"
      },
      {
        key: "5",
        value: "5",
        text: "Retiro"
      },
      {
        key: "6",
        value: "6",
        text: "Otro"
      }
    ]
    dispatch(setCategories(categories))
  }
}