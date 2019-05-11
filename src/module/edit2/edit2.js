import Vue from 'vue'
import App from './App'

import 'common/style'
import hView from 'components'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// axios配置
import Axios from 'axios'
import { configAxios } from 'src/lib/config-axios.js'
// axios-自定义配置
configAxios.init(Axios)
Object.defineProperty(Vue.prototype, '$http', {
  value: Axios
})

Vue.use(hView)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})
