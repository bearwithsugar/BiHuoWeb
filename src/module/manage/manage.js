import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueClipboard from 'vue-clipboard2'

import 'common/style'
import hView from 'components'
// 引入element插件帮助开发
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import mavonEditor from 'mavon-editor'
import VueQuillEditor from 'vue-quill-editor'
// import 'mavon-editor/dist/css/index.css'

import { fetch } from 'src/lib/fetch.js'
Object.defineProperty(Vue.prototype, '$http', {
  value: fetch
})

Vue.use(hView)
//使用element
Vue.use(ElementUI）
Vue.use(VueQuillEditor)
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: {
    App
  }
})
