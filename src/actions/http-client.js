import axios from 'axios'

const HttpClient = () =>{
  let url = 'https://api.agendalo.edu.do/api'
  let token = localStorage.token || ''

  function get(endpoint){
    return axios.get(`${url}/${endpoint}${token && ('?accessToken=' + token) }`)
  }
  function post(endpoint, data){
    return axios.post(`${url}/${endpoint}${token && ('?accessToken=' + token) }`, data)
  }
  function patch(endpoint, data){
    return axios.patch(`${url}/${endpoint}${token && ('?accessToken=' + token) }`, data)
  }
  function put(endpoint, data){
    return axios.put(`${url}/${endpoint}${token && ('?accessToken=' + token) }`, data)
  }
  
  return { get, post, patch, put }
}

export default HttpClient