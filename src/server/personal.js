import { fetch } from 'src/lib/fetch.js'

export default {
  // 查询个人资料
  self (params) {
    return fetch('/pi/bizuser/self', params)
  },
  // 充值
  recharge (params) {
    return fetch('/pi/bizorder/recharge', params)
  },
  // 重新支付
  rePay (params) {
    return fetch('/pi/bizorder/rePay', params)
  },
  // check充值
  rechargeCheck (params) {
    return fetch(`/pi/bizorder/check/${params.orderNo}`, params)
  },
  // 查询所有余额充值商品信息
  getOrderSKU (params) {
    return fetch('/pi/bizproduct/recharge/list', params)
  },
  // 获取VIP充值列表
  getVipList (params) {
    return fetch('/pi/bizproduct/vip/list', params)
  },
  // vip充值
  buyVip (params) {
    return fetch('/pi/bizorder/buyvip', params)
  }
}
