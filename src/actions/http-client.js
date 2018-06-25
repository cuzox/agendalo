import axios from 'axios'

const url = 'https://api.agendalo.com.do/api'

const HttpClient = {
  get: (endpoint, query) => {
    return axios.get(`${url}/${endpoint}${buildQuery(query)}`)
  },
  post: (endpoint, query, data) => {
    return axios.post(`${url}/${endpoint}${buildQuery(query)}`, data)
  },
  patch: (endpoint, data) => {
    return axios.patch(`${url}/${endpoint}${buildQuery()}`, data)
  },
  put: (endpoint, data) => {
    return axios.put(`${url}/${endpoint}${buildQuery()}`, data)
  }
}

const buildQuery = (query = '') => {
  let build = ''
  let token = localStorage.getItem('token')
  if(typeof query == "object" && Object.keys(query).length) build += "?" + JSON.stringify(query)
  else if(typeof query == "string" && query.length) build += "?" + query
  if(token) build += (build ? '&' : '?') + 'access_token=' + token
  
  return build
}

export default HttpClient