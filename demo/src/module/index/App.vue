<template>
  <div id="app">
    <img src="./images/logo.png" @click="click">
    <!--<hello></hello>-->
    <p>拖放排序插件Sortable.js   兼容好及功能全个人觉得比dragula.js 好的多</p>
    <p>https://www.cnblogs.com/xiangsj/p/6628003.html</p>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import Hello from 'components/Hello/Hello'

  export default {
    name: 'app',
    components: {
      Hello
    },
    methods: {
      click(){
        location.href='detail.html';
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
