<template>
  <div id="app" :class="app.show?'':'full'">
    <!--左侧标题栏，最开始出现，后面控件控制出现消失-->
    <div class="main-left" ref="left" :class="app.show?'':'hideState'">


      <!--加载必火互动和下面小字-->
      <div class="left-title" v-if="app.show" @click="goIndex">
        <img src="/static/imgs/manage/title-main.png" alt="" class="title-main" /><br />
        <img src="/static/imgs/manage/title-sub.png" alt="" />
      </div>

      <!--但左侧标题栏收起来之后必火互动图标缩小为下面的图片，点击后回到主页-->
      <div class="left-title" v-else @click="goIndex">
        <img src="/static/imgs/manage/title-main-col.png" alt="" class="title-main" />
      </div>


      <ul class="left-nav">
        <!--加载左侧标题栏的各个标题内容-->
        <li v-for="(item,index) in left.data" :key="index" :class="['nav-item', index == left.act ? 'act' : '', item.cls]">
          <div class="a-box">
            <!--显示标题名字-->
            <a class="nav-name" @click="toggleLeftAct(item,index)">{{app.show ? item.name : ''}}</a>
          </div>
          <!--点击新建活动后出现的小标题栏-->
          <ul class="a-child" v-show = "navChildShow">
            <!-- <ul class="a-child" v-if='item.child && item.child.length && index==left.act'> -->
            <li class="a-child_item" v-for="(subItem,subIndex) in item.child" :key="'item' + subIndex">
              <a class="v-icon a-child1" href="#">{{subItem.name}}</a>
            </li>
          </ul>
        </li>
      </ul>

    </div>

    <div class="main-right">
      <div class="header flexBox" :class="app.show ? '' : 'full'">
        <div class="toggle-left">
          <!--点击控制出现消失-->
          <span class="icon icon-toggle" @click="toggleLeft"></span>
        </div>

        <!--上方菜单栏-->
        <div class="header-con flex1">
          <!--下面这一行显示屏幕左上角小铃铛-->
          <span class="icon iocn-new-info"></span>
          <span class="info-text">您有一份礼品未领取!</span>
          <a class="info-btn" href="#">马上领取 ></a>

          <div class="header-con-right">

            <!--搜索？貌似没用-->
            <div class="search-box">
              <transition name="fade">
                <input type="text" v-show="search.show" v-model="search.val" />
              </transition>
              <span class="icon icon-search" @click="toggleSearch"></span>
            </div>

            <!--显示用户名和下拉菜单-->
            <div class="user-menu" @mouseleave="toggleUsermenuFalse" @mouseenter="toggleUsermenu">
              <img v-if="replenish.vipType" :src="userLevel.icon[replenish.vipType]" style="width: 20px;height: 20px" class="icon-vip" />
              <span class="user-name">{{userInfo.userName}}</span>
              <span class="icon icon-down" ></span>
              <transition name="fade">
                <ul class="menu-lists" v-show="userMenu.show">
                  <router-link tag="li" :to="{path: '/nav-center'}" replace>个人中心</router-link>
                  <router-link tag="li" :to="{path: '/nav-replenish'}">充值中心</router-link>
                  <!-- <router-link tag="li" :to="{path: '/nav-my'}">数据管理</router-link> -->
                  <router-link tag="li" :to="{path: '/nav-center/editpsw'}" replace>修改密码</router-link>
                </ul>
              </transition>
            </div>

            <a href="#" class="help-center same-style">帮助中心</a>
            <div class="exit same-style" @click="doExit">退出
              <span class="icon icon-exit"></span>
            </div>
          </div>

        </div>
      </div>

      <!--空出来的路由界面，用于加载整个界面-->
      <router-view id="scrollWrap" class="right-content" @leftAct="init" ref="rightContent" :replenish="replenish" />

    </div>



    <!--始终在屏幕右下角的两个小图标-->
    <div class="server-returnTop" id="server-returnTop">
      <div class="server-ser">
        <img src="/static/imgs/manage/nav/icon-service.png">
      </div>
      <div class="return-rer" @click="toTop">
        <img src="/static/imgs/manage/nav/icon-return.png">
      </div>
    </div>
  </div>
</template>

<script>
import Server from 'src/server'
import User from 'src/server/user'
import { Message, Loading } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      app: {
        show: true
      },
      left: {
        act: 0,
        data: [
          { name: '首页', cls: 'nav-home', to: '/' },

          {
            name: '新建活动',
            cls: 'nav-new',
            to: '/nav-new',
            child: [
              { name: '必火活动', to: '' },
              { name: '微海报', to: '' },
              { name: '现场互动', to: '' },
              { name: 'H5小游戏', to: '' }
            ]
          },

          { name: '我的活动', cls: 'nav-my', to: '/nav-my' },

          {
            name: '账户中心',
            cls: 'nav-account',
            to: '/nav-center/info/personal'
          },
          { name: '充值中心', cls: 'nav-recharge', to: '/nav-replenish' },
          { name: '管理子账户', cls: 'nav-manage-son', to: '' },
          { name: '操作手册', cls: 'nav-help', to: '' }
        ]
      },
      navChildShow: false,
      search: {
        show: false,
        val: ''
      },
      userMenu: {
        show: false
      },
      replenish: { vipType: 0 },
      userLevel: {
        icon: {
          '0': '',
          '1': '/static/imgs/manage/vipIcon/vip-1.png',
          '2': '/static/imgs/manage/vipIcon/vip-2.png',
          '3': '/static/imgs/manage/vipIcon/vip-3.png',
          '4': '/static/imgs/manage/vipIcon/vip-4.png'
        }
      }
    }
  },
  methods: {
    goIndex () {
      // 回到首页
      location.href = 'index.html'
    },
    toTop () {
      let scrollWrap = document.getElementById('scrollWrap')
      let top = scrollWrap.scrollTop / 30
      requestAnimationFrame(totopStep)
      function totopStep () {
        scrollWrap.scrollTop -= top
        if (scrollWrap.scrollTop > 0) {
          requestAnimationFrame(totopStep)
        }
      }
    },
    init (index) {
      this.left.act = index
    },
    toggleLeft () {
      this.app.show = !this.app.show
    },

    toggleSearch () {
      this.search = { show: true, val: '' }
    },

    toggleUsermenu () {
      this.userMenu.show = !this.userMenu.show
    },
    toggleUsermenuFalse () {
      this.userMenu.show = false
    },

    //控制左侧标题栏点击路由跳转
    toggleLeftAct (item, index) {
//        下面用于控制点击时class样式的变化
      this.left.act = index
      if (index === 1) {
        this.navChildShow = !this.navChildShow
      }
//      当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。
//      console.log('aaaa'+item)
      this.$router.push({ path: item.to })
    },

    doExit () {
      let loadingInstance = Loading.service({
        background: 'rgba(255,255,255,.6)',
        spinner: 'el-icon-loading'
      })
      Server.outLogin({}).then(res => {
        loadingInstance.close()
        if (!res.suc) {
          Message({ type: 'error', message: '退出失败！' })
        } else {
          localStorage.BHTOKEN = ''
          Message({ type: 'success', message: '退出成功！' })
          location.href = 'index.html'
        }
      })
    }
  },
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo'
    })
  },
  mounted () {
    this.userInfo.id ||
      User.self().then(res => {
        if (!res.suc) {
          this.$message({ type: 'error', message: '获取信息失败' })
          location.href = 'index.html'
        } else {
          this.replenish = res.rs.userVip
          this.$store.commit('user/UPDATE_USERINFO', res.rs)
        }
      })
    //    let obj=this.$refs.left;
    //    let style;
    //    if(window.getComputedStyle) {
    //      style=window.getComputedStyle(obj, null);
    //    }else {
    //      style=obj.currentStyle;
    //    }
    //    let leftWidth=style.width.slice(0,-2);
    //    this.app.val="padding-left:"+leftWidth+"px;";
    //    this.app.style=this.app.val;
  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/manage.scss"></style>
