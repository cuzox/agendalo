import axios from 'axios'

const HttpClient = (() =>{
  let url = 'https://api.agendalo.com.do/api'
  let token = localStorage.token || ''

  function get(endpoint, query = {}){
    return axios.get(`${url}/${endpoint}${buildQuery(query)}`)
  }
  function post(endpoint, data){
    return axios.post(`${url}/${endpoint}${buildQuery()}`, data)
  }
  function patch(endpoint, data){
    return axios.patch(`${url}/${endpoint}${buildQuery()}`, data)
  }
  function put(endpoint, data){
    return axios.put(`${url}/${endpoint}${buildQuery()}`, data)
  }

  function buildQuery(query = {}){
    let build = ''
    if(token) build += '?accessToken=' + token
    if(!Object.keys(query).length) return build
    build += (token ? '&' : '?') + JSON.stringify(query)
    return build
  }
  
  return { get, post, patch, put }
})()

export default HttpClient