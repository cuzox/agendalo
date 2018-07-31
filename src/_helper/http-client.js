import axios from 'axios'

const url = 'https://api.agendalo.com.do/api'

const HttpClient = {
  get: (endpoint, query) => {
    return axios.get(`${url}/${endpoint}${buildQuery(query)}`)
  },
  post: (endpoint, data, query) => {
    return axios.post(`${url}/${endpoint}${buildQuery(query)}`, data)
  },
  patch: (endpoint, data) => {
    return axios.patch(`${url}/${endpoint}${buildQuery()}`, data)
  },
  put: (endpoint, data) => {
    return axios.put(`${url}/${endpoint}${buildQuery()}`, data)
  },
  delete: endpoint => {
    return axios.delete(`${url}/${endpoint}${buildQuery()}`)
  },
  form: (endpoint, data, filenames) => {
    let formData = new FormData()
    Object.keys(data).forEach((key, i) => formData.append(key, data[key], filenames[i]))

    return new Promise((succ, fail)=> {
      fetch(`${url}/${endpoint}${buildQuery()}`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => succ(res), err => fail(err))
    })
  },
  url: () => url
}

const buildQuery = (query = '') => {
  let build = ''
  let token = localStorage.getItem('token')
  if(typeof query == "object" && Object.keys(query).length) build += "?filter=" + JSON.stringify(query)
  else if(typeof query == "string" && query.length) build += "?" + query
  if(token) build += (build ? '&' : '?') + 'access_token=' + token
  
  return build
}

export default HttpClient