/**
 * 引入组件
 */
import Modal from './modal'

const hview = {
  Modal: Modal
}

const install = Vue => {
  Object.keys(hview).forEach(key => Vue.component(key, hview[key]))
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default Object.assign(hview, {
  install
})
