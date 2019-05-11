<template>
  <div id="app">
    <div class="view">

      <div class="draggable">
        YYY
        <div class="handel">OOO</div>
      </div>

      <div class="draggable ">
        XXX
      </div>

      <br />
      <img src="./images/logo.png" ref="img">
      <ul id="items">
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>

    </div>
    <button>预览</button>
    <div class="preview">
      <div class="s-draggable">
        YYY
        <div class="handel">OOO</div>
      </div>

      <div class="s-draggable" :style="style">
        XXX
      </div>

      <br />
      <img src="./images/logo.png" ref="img">
      <ul id="items">
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>

    </div>
    <div class="edit">
      <p>编辑</p>
      <div>{{style}}</div>
      <div>{{text}}</div>
    </div>

  </div>
</template>

<script>
// import utils from 'src/lib/utils'
import Sortable from 'sortablejs'
import Draggabilly from 'draggabilly'
export default {
  name: 'app',
  data () {
    return {
      style: '',
      text: ''
    }
  },
  methods: {},
  mounted () {
    // console.log(this.$refs.img.getComputedStyle());
    var el = document.getElementById('items')
    var sortable = Sortable.create(el)
    console.log(sortable)
    // https://draggabilly.desandro.com/

    //    var elem = document.querySelector('.draggable');
    //    var draggie = new Draggabilly( elem, {
    //      // options...
    //    });

    //    var draggie = new Draggabilly( '.draggable', {
    //      // options...
    //      containment: true,
    //    });

    var draggableElems = document.querySelectorAll('.draggable')
    // array of Draggabillies
    var draggies = []
    // init Draggabillies
    for (var i = 0, len = draggableElems.length; i < len; i++) {
      var draggableElem = draggableElems[i]
      var draggie = new Draggabilly(draggableElem, {
        // options...
        axis: 'y', // 移动方向，默认上下都可
        containment: true // 如果true，容器将是父元素。
        // grid: [ 20, 50 ], // 网格移动
        // handle: '.handel',   // 拖动父不移动，指定的才移动
      })
      draggies.push(draggie)
    }

    var the = this
    // 原生JS
    function listener (event, pointer, moveVector) {
      // /* 参数 */
      // console.log( event, this.position.x, this.position.y );
      the.text = event.type + ' ' + this.position.x + ' ' + this.position.y
      // console.log(moveVector);
      // console.log(pointer.pageY);//鼠标位置
      // draggie.destroy()
      // draggie.disable();draggie.enable()；
      the.style =
        'position: relative; left: ' +
        this.position.x +
        'px; top: ' +
        this.position.y +
        'px;'
    }
    // 绑定事件监听
    // pointerDown  pointerMove  pointerUp   staticClick // 按在目标上时触发
    draggie.on('dragStart', listener) //  dragStart
    //    // 移除事件监听
    //    draggie.off( 'eventName', listener );
    //    // 只触发一次事件监听。注意是once不是one或者on
    //    draggie.once( 'eventName', function() {
    //      console.log('eventName happened just once');
    //    });
    draggie.on('dragMove', listener)
    // draggie.on( 'dragEnd', listener );
  },
  created () {}
}
</script>

<style lang="scss" scoped src="common/style/module/edit2.scss"></style>
