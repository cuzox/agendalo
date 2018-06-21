import axios from 'axios'

let url = 'https://api.agendalo.com.do/api'

const HttpClient = {
  get: (endpoint, query = {}) => {
    return axios.get(`${url}/${endpoint}${buildQuery(query)}`)
  },
  post: (endpoint, data) => {
    return axios.post(`${url}/${endpoint}${buildQuery()}`, data)
  },
  patch: (endpoint, data) => {
    return axios.patch(`${url}/${endpoint}${buildQuery()}`, data)
  },
  put: (endpoint, data) => {
    return axios.put(`${url}/${endpoint}${buildQuery()}`, data)
  }
}

const buildQuery = (query = {}) => {
  let build = ''
  let token = localStorage.token || ''
  if(token) build += '?accessToken=' + token
  if(!Object.keys(query).length) return build
  build += (token ? '&' : '?') + JSON.stringify(query)
  return build
}

export default HttpClient