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
        key: "iglesia",
        value: "0",
        text: "Iglesia"
      },
      {
        key: "artista",
        value: "1",
        text: "Artista"
      },
      {
        key: "concierto",
        value: "2",
        text: "Concierto"
      },
      {
        key: "campamento",
        value: "3",
        text: "Campamento"
      },
      {
        key: "charla",
        value: "4",
        text: "Charla"
      },
      {
        key: "retiro",
        value: "5",
        text: "Retiro"
      }
    ]
    dispatch(setCategories(categories))
  }
}