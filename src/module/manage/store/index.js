import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import user from './modules/user.js'

Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    user
  }
})
