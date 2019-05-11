import Vue from 'vue'
import App from './App'
import 'common/style'
import hView from 'components'
import Router from 'vue-router'
// axios配置
import Axios from 'axios'
import { configAxios } from 'src/lib/config-axios.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'common/css/v-icon.css'

Vue.use(Router)
Vue.use(hView)
// axios-自定义配置
configAxios.init(Axios)
Object.defineProperty(Vue.prototype, '$http', {
  value: Axios
})

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})
