import { fetch } from 'src/lib/fetch.js'

export default {
  // 查询个人资料
  self (params) {
    return fetch('/pi/bizuser/self', params)
  },
  // 是否登录
  isLogin (params) {
    return fetch('/pi/bizuser/login/state', params)
  },
  // 更新用户信息
  update (params) {
    return fetch('/pi/bizuser/update', params)
  },
  // 完善用户信息（step=1）
  improve (params) {
    return fetch('/pi/bizuser/furnish', params)
  },
  // 获取订单列表
  list (params) {
    return fetch('/pi/bizorder/list', params)
  },
  // 获取订单详情
  orderDetail (params) {
    return fetch('/pi/bizorder/detail', params)
  },
  orderCancel (params) {
    return fetch('/pi/bizorder/cancel', params)
  },
  // 获取新建活动列表
  initIndex (params) {
    return fetch('/pi/bizactivity/initIndex', params)
  },
   // 获取我的收藏活动
  coll (params) {
    return fetch('/pi/bizactivity/coll', params)
  },
  // 获取首页tags
  indexTags (params) {
    return fetch('/pi/bizactivity/indexTags', params)
  },
  query (params) {
    // 查询渠道
    return fetch('/pi/business/channel/query', params)
  },
  channelDelete (params) {
    // 删除渠道
    return fetch('/pi/business/channel/delete', params)
  },
  channelCreate (params) {
    // 创建渠道
    return fetch('/pi/business/channel/create', params)
  },
  channelEdit (params) {
    // 编辑渠道
    return fetch('/pi/business/channel/edit', params)
  },
  qrcode (params) {
    // 二维码生成
    return fetch('/downloadImg/qrcode/normal', params)
  },
  shopAdd (params) {
    // 添加门店
    return fetch('/pi/bizuser/shop/add', params)
  },
  shopDel (params) {
    // 删除门店
    return fetch('/pi/bizuser/shop/del', params)
  },
  // 获取行业列表
  industry (params) {
    return fetch('/pi/common/industry', params)
  },
  childIndustry (params) {
    return fetch('pi/bizactivity/childTags', params)
  },
  // 获取机构门店信息
  industryInfo (params) {
    return fetch('/pi/bizuser/industry/info', params)
  },
  // 修改密码
  resetPsw (params) {
    return fetch('/pi/bizuser/changepwd', params)
  },
  // 发送身份认证短信
  identity (params) {
    return fetch('/pi/common/send/sms/identity', params)
  },
  // 验证身份认证
  identityVerify (params) {
    return fetch('/pi/bizuser/identityVerify', params)
  },
  // 发送绑定新手机号验证码
  smsBindPhone (params) {
    return fetch('/pi/common/send/sms/bindPhone', params)
  },
  // 绑定手机
  bizuserBindPhone (params) {
    return fetch('/pi/bizuser/bindPhone', params)
  },
  resetGetCode (params) {
    return fetch('/pi/common/send/sms/identity', params)
  },
  mine (params) {
    return fetch('pi/bizactivity/mine', params)
  },
  wxLogin () {
    return fetch('pi/common/wx/info')
  }
}
