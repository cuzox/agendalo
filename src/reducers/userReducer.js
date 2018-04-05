const initialState = {
  id: null,
  name: null,
  email: null,
  loggingIn: false,
  loggedIn: false,
  error: null
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case "LOG_IN":
      return { loggingIn: true }
    case "LOG_IN_FAILED": 
      return { loggingIn: false, error: action.payload}
    case "LOG_IN_":
      return {
          ...action.payload,
          loggingIn: false,
          loggedIn: true,
      }
    default:
      return state
  }
}