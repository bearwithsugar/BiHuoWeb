import Axios from 'axios'
import { domainConfig, configAxios } from 'src/lib/config-axios.js'
// axios-自定义配置
configAxios.init(Axios)

export const fetch = (url, params = {}) => {
  let { data, methods = 'get', baseURL, ContentType } = params

  return Axios.request({
    url: url,  
    headers: {
      'Content-Type': ContentType || 'application/json'
    },


    method: methods.toLowerCase(),

    baseURL: baseURL || `${domainConfig.url}`,

    params: methods.toLowerCase() === 'get' ? data : null,

    data: methods.toLowerCase() !== 'get' ? data : null,

    timeout: 5000,

    responseType: 'json',

    validateStatus: function (status) {
      return status >= 200 && status < 300
    }
  })
}
