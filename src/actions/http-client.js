import axios from 'axios'

const HttpClient = (() =>{
  let url = 'https://api.agendalo.com.do/api'
  let token = localStorage.token || ''

  function get(endpoint, filter = {}){
    return axios.get(`${url}/${endpoint}${buildQuery(filter)}`)
  }
  function post(endpoint, data, filter = {}){
    return axios.post(`${url}/${endpoint}${buildQuery(filter)}`, data)
  }
  function patch(endpoint, data){
    return axios.patch(`${url}/${endpoint}${buildQuery()}`, data)
  }
  function put(endpoint, data){
    return axios.put(`${url}/${endpoint}${buildQuery()}`, data)
  }

  function buildQuery(filter = {}){
    let query = ''
    if(token) query += '?accessToken=' + token
    query += (query.length ? '&' : '?') + 'filter=' + JSON.stringify(filter)
    return query
  }
  
  return { get, post, patch, put }
})()

export default HttpClient