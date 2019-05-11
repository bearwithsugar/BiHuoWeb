import { fetch } from 'src/lib/fetch.js'

export default {
  // 获取模板列表
  getTemplates (params) {
    return fetch(`/pi/mod/main/${params.size}/${params.page}`, params)
  },
  // 创建活动（通过活动模板）
  create (params) {
    return fetch(`/pi/bizactivity/create/${params.id}`, params)
  },
  // 推荐活动
  recommend (params) {
    return fetch('/pi/bizactivity/indexContent', params)
  },
  // 我的活动
  myActs (params) {
    return fetch('/pi/bizactivity/mine', params)
  },
  // 预览活动链接
  link (params) {
    return fetch('/pi/business/channel/link', params)
  },
  // 编辑
  edit (params) {
    return fetch.post(`/pi/bizactivity/update/${params.id}`, params)
  },
  // 获取活动详情
  getDetail (params) {
    return fetch(`/pi/bizactivity/get/${params.id}`, params)
  },
  // 添加删除收藏活动
  changeCollect (params) {
    return fetch('/pi/bizactivity/coll/alter', params)
  },
  // 获取用户所有的活动
  getList (params) {
    return fetch('/pi/bizactivity/mine', params)
  },
  // 砍价活动详情
  haggle (params) {
    return fetch('/pi/bizactivity/haggle/detail', params)
  },
  // 集卡活动详情
  gather (params) {
    return fetch('/pi/bizactivity/gather/detail', params)
  },
  // 保存集卡活动
  gatherSave (params) {
    return fetch('/pi/bizactivity/gather/save', params)
  },
  // 保存或发布活动
  save (params) {
    return fetch('/pi/bizactivity/haggle/save', params)
  },
  // 直接发布活动
  publish (params) {
    return fetch('/pi/bizactivity/publish', params)
  },
  // 复制活动
  copy (params) {
    return fetch('/pi/bizactivity/copy', params)
  },
  // 删除活动
  delete (params) {
    return fetch('/pi/bizactivity/delete', params)
  },
  // 首页展示活动列表
  category (params) {
    return fetch('/pi/bizactivity/category', params)
  },
  // 换一批卡片
  anotherCard (params) {
    return fetch('/pi/bizactivity/gather/another', params)
  },
  // 用户获奖名单
  activeUserList (params) {
    return fetch('/pi/wxuseractivity/userList', params)
  },
  // 兑奖
  sureGetMoney (params) {
    return fetch('/pi/wxuseractivity/redeem', params)
  },
  // 活动渠道统计信息
  activeChannelList (params) {
    return fetch('/pi/business/channel/statistics', params)
  },
  // 删除渠道
  deleteChannel (params) {
    return fetch('/pi/business/channel/delete', params)
  }
}
