<template>
  <div>
    <p class="title">template</p>
    <div class="music">音乐按钮</div>
    <header>头部-标题</header><br />
    <div class="banner">
      <img src="./images/t012354820d0df32809.jpg" alt="" />
    </div><br />
    <div class="party-introduce">
      <p class="name">活动主题</p><br />
      <div class="content">可编辑的活动内容介绍。。。。。。。可编辑的活动内容介绍。。。。。。。</div>
    </div>
    <div class="sbt">
      <button type="button">按钮1</button><br />
      <button @click="save">提交活动</button><br />
      <button @click="edit">编辑</button>
      <button @click="gett">获取活动</button>
    </div>
  </div>
</template>

<script>
import Activity from 'src/server/activity'
// import utils from 'src/lib/utils'
// import { Message, Loading } from 'element-ui'
export default {
  data () {
    return {}
  },
  methods: {
    save () {
      Activity.create({}, 100000).then(res => {
        console.log(res)
      })
    },

    edit () {
      let data1 = {
        template: 'kanjia', // 模板1名称
        userid: 1231231, // 用户标示
        edit: true, // 是否编辑过了
        animate: 'a', // 页面切换动画类型
        params: {
          // 参数
          music: 'asda', // 选择的背景音乐--存路径或者类型
          colorStyle: '12', // 色调风格
          title: 'asda', // 活动名
          banner: {}, // 滑动广告数据
          content: {
            // 活动介绍
            text: 'asda', // 文本
            color: 'asd' // 颜色
          },
          other: {} // 其他
        }
      }
      Activity.edit(data1, 100035).then(res => {
        console.log(res)
      })
    },

    gett () {
      Activity.getDetail({}, 100035).then(res => {
        console.log(res)
      })
    }
  },
  created () {
    // 用户提交编辑后的数据
    let data1 = {
      template: 'kanjia', // 模板1名称
      userid: 1231231, // 用户标示
      edit: true, // 是否编辑过了
      animate: 'a', // 页面切换动画类型
      params: {
        // 参数
        music: 'asda', // 选择的背景音乐--存路径或者类型
        colorStyle: '12', // 色调风格
        title: 'asda', // 活动名
        banner: {}, // 滑动广告数据
        content: {
          // 活动介绍
          text: 'asda', // 文本
          color: 'asd' // 颜色
        },
        other: {} // 其他
      }
    }
    console.log(data1)
    let data2 = {
      template: 'choujiang', // 模板2名称
      userid: 1231231, // 用户标示
      edit: true, // 是否编辑过了
      animate: 'a', // 页面切换动画类型
      params: {
        // 参数
        music: 'asda', // 选择的背景音乐--存路径或者类型
        colorStyle: '12', // 色调风格
        title: 'asda', // 活动名
        footer: {}, // 尾部信息
        game: {
          // 游戏参数
          count: 12, // 人数
          max_prize: 1000, // 最大奖金
          probability: 0.008 // 概率
        },
        other: {} // 其他
      }
    }
    console.log(data2)

    //    Activity.getTemplates({},10,1).then((res)=> {
    //      console.log(res);// 100000
    //    });
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
header {
  background: rgba(0, 0, 0, 0.5);
  height: 30px;
  text-align: center;
  color: #fff;
}
.music {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #000;
  background: rgba(255, 255, 255, 0.6);
}
.party-introduce {
  background: #f2f2f2;
  .name {
    text-align: center;
  }
  .content {
  }
}
.sbt {
  margin-top: 20px;
  text-align: center;
}
</style>