import Axios from 'axios'
import { domainConfig } from 'src/lib/config-axios.js'

export default {
  // 注册获取验证码
  regGetCode (params) {
    let url = `${domainConfig.url}/pi/common/send/sms/reg`
    return Axios.get(url, {
      params
    })
  },
  // 修改密码获取验证码-忘记
  forgetGetCode (params) {
    let url = `${domainConfig.url}/pi/common/send/sms/forgetpwd`
    return Axios.get(url, {
      params
    })
  },
  // 修改密码获取验证码-已登录修改
  resetGetCode (params) {
    let url = `${domainConfig.url}/pi/common/send/sms/changepwd`
    return Axios.get(url, {
      params
    })
  },

  // 注册
  register (params) {
    let url = `${domainConfig.url}/pi/bizuser/reg`
    return Axios.get(url, {
      params
    })
  },

  // 登录
  login (params) {
    let url = `${domainConfig.url}/pi/bizuser/login`
    return Axios.get(url, {
      params
    })
  },

  // 退出登录
  outLogin (params) {
    let url = `${domainConfig.url}/pi/bizuser/logout`
    return Axios.get(url, {
      params
    })
  },

  // 忘记密码确定
  forget (params) {
    let url = `${domainConfig.url}/pi/bizuser/forgetpwd`
    return Axios.get(url, {
      params
    })
  },

  // 修改密码
  resetPsw (params) {
    let url = `${domainConfig.url}/pi/bizuser/changepwd`
    return Axios.get(url, {
      params
    })
  },

  // 获取行业列表
  industry (params) {
    let url = `${domainConfig.url}/pi/common/industry`
    return Axios.get(url, {
      params
    })
  }
}
