<template>
  <div>
    <p class="main-title">账户中心</p>
    <ul class="main-type flexBox">
      <li v-for="(item,index) in mainType" :key="index" :class="carTab == item.route ? 'act' : ''" @click="toggleTab(item)">
        {{item.name}}
      </li>
    </ul>
    <transition>
      <router-view></router-view>
    </transition>
    <!-- <div class="information">
      <div class="nav">
        <span class="center act">个人中心</span><span class="store">机构门店</span>
      </div>
      <div class="box">
        <div class="header-box">
          <img src="../../../../dist/static/imgs/temp/图层 10@2x.png" alt="" />
        </div>
        <div class="detail-box">
          <div class="item">
            <span class="param-name">用户名称</span>
            <div class="item-val">
              <div class="right-warn">用户名称将用于发送分享时使用</div>
              <span class="user-name">悟空编程</span><span class="can-operate">修改</span>
            </div>
          </div>
          <div class="item">
            <span class="param-name">绑定手机</span>
            <div class="item-val">
              <div class="right-warn">账户更安全</div>
              <span class="bind-phone">未填写</span><span class="can-operate">去绑定</span>
            </div>
          </div>
          <div class="item">
            <span class="param-name">身份标签</span>
            <div class="item-val">
              <div class="right-warn">升级付费会员享更多特权</div>
              <div class="button-box"><button type="button" class="free">免费体验版</button><button class="upgrade" type="button">升级</button></div>
              <p class="use-time">有效期：2017-06-02 20:41 至 2018-06-02 20:41</p>
              <p class="warn-text">您的试用期还有 7 天，马上升级！</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // carTab: 'personal',
      mainType: [
        { name: '账号信息', id: '', route: 'personal' },
        { name: '修改密码', id: '', route: 'editpsw' },
        { name: '我的订单', id: '', route: 'order' }
      ]
    }
  },
  mounted () {
    let x = document.querySelector('.right-content')
    x.scrollTop = 0
  },
  created () {
    this.$emit('leftAct', 3)
  },
  computed: {
    carTab () {
      return this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    }
  },
  // updated () {
    // let pageRoutes = this.$route.path.split('/')
    // this.carTab = pageRoutes[pageRoutes.length - 1]
    // console.log(this.carTab)
  // },
  methods: {
    toggleTab (item) {
      const self = this
      self.carTab = item.route
      if (item.route) {
        if (item.route === 'personal') {
          item.route = 'info/' + item.route
        }
        self.$router.push({ path: '/nav-center/' + item.route })
      }
    }
  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/center.scss">

</style>