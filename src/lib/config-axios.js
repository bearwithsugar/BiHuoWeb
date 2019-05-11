import { Message } from 'element-ui'

// ip配置
export const domainConfig = {
  'development': {
     //url: 'http://1655w941f1.51mypc.cn'
     url:'http://47.94.87.217:19999'
  },
  'production': {
    url: ''
  }
}[process.env.NODE_ENV] || {
  url: 'https://www.okbihuo.com'
}

export const configAxios = {
  init (_axios) {
    _axios.defaults.baseURL = `${domainConfig.url}`

    // 添加一个请求拦截器
    _axios.interceptors.request.use(
      function (config) {
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        if (localStorage.BHTOKEN) {
          config.headers['pi-businesstkn'] = localStorage.BHTOKEN
          //config.headers['Content-Type'] = 'application/json'
        } else {
          // 忘记密码，登录，获取验证码时不需要
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // 添加一个响应拦截器
    _axios.interceptors.response.use(
      function (res) {
        let data = res.data || res
        if (data.code === 403) {
          // alert('登录超时，请重新登录');return;
          localStorage.BHTOKEN = ''
          location.href = 'index.html'
        }

        if (data.suc === false && data.msg) {
          Message({
            message: data.msg,
            type: 'warning',
            customClass: 'message-tip',
            duration: 3000
          })
          return false
        } else {
          return data
        }
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  }
}
