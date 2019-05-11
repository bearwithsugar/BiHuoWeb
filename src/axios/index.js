import axios from 'axios'
import * as conf from '../assets/config'

axios.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.baseURL = conf.BASEURL
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  res => {
    return res
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axios
