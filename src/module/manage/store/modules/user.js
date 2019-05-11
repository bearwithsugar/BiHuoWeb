import * as types from '../mutation-types'
import api from 'src/server/user'

const state = {
  userInfo: {
    accessToken: '',
    authed: false,
    bizUserProducts: [],
    brandType: 1,
    channelId: 0,
    createDate: '',
    createTime: '',
    id: null,
    phone: '',
    status: null,
    step: null,
    type: null,
    userDetail: {},
    userLevel: null,
    userType: null,
    userVip: {},
    userName: ''
  },
  userType: ''
}

// getters
const getters = {
  userInfo: state => state.userInfo,
  userType: state => state.userType
}

// mutations
const mutations = {
  // 更新用户信息
  [types.UPDATE_USERINFO] (state, payload) {
    Object.assign(state.userInfo, payload)
  },
  // 完善用户信息
  [types.IMPROVE_USERTAGS] (state, payload) {
    Object.assign(state.userInfo, payload)
  }
}

// actions
const actions = {
  updateUserInfo ({ commit }, payload) {
    api.update(payload).then(res => {
      res && commit(types.UPDATE_USERINFO, res)
    })
  },
  improveUserInfo ({ commit }, payload) {
    api.improve(payload).then(res => {
      res && commit(types.IMPROVE_USERTAGS, res)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
