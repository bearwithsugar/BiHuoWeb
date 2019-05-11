import Vue from 'vue'
// import typeis from '../assets/util/typeis'

Vue.directive('focus', {
  update (el, binding) {
    binding.value ? el.focus() : el.blur()
  }
})

Vue.directive('drag', {
  bind (el, binding, vcode) {
    el.setAttribute('draggable', true)
    el.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text', this.dataset['drag_index'])
    })
    el.addEventListener('drag', function (e) {
      e.preventDefault()
      this.style.color = '#ccc'
      return false
    })
    el.addEventListener('dragend', function (e) {
      e.preventDefault()
      this.style.color = 'inherit'
      return false
    })
    el.addEventListener('dragenter', function (e) {
      e.preventDefault()
      this.style.color = '#333'
      e.dataTransfer.dropEffect = 'move'
      return false
    })
    el.addEventListener('dragover', function (e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      return false
    })
    el.addEventListener('dragleave', function (e) {
      e.preventDefault()
      this.style.color = 'inherit'
      e.dataTransfer.dropEffect = 'move'
      return false
    })
    el.addEventListener('drop', function (e) {
      e.preventDefault()
      let srcIndex = parseInt(this.dataset['drag_index'])
      let fromIndex = parseInt(e.dataTransfer.getData('text'))
      console.log(fromIndex, srcIndex)
      // if (this.dataset['del'] !== undefined) {
      //   binding.value.splice(fromIndex, 1)
      //   return false
      // }
      // let _data = binding.value[srcIndex]
      // if (typeis(_data, 'array')) {
      //   _data = [].concat(_data)
      // } else if (typeis(_data, 'object')) {
      //   _data = Object.assign({}, _data)
      // }
      typeof binding.value === 'function' && binding.value(fromIndex, srcIndex)
      // binding.value.splice(srcIndex, 1, binding.value[fromIndex])
      // binding.value.splice(fromIndex, 1, _data)
      e.stopPropagation()
      return false
    })
  }
})
