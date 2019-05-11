<template>
  <div class="main">
    <preview-bargain v-if="false"></preview-bargain>
    <preview-cardscollect v-if="false"></preview-cardscollect>
    <div class="header" style="border-bottom-color:#DCDCDC">
      <header class="w1200 header-wrap">
        <p>更多同行在用的线上营销服务部</p>
        <div>
          <span>一键保存到本地</span>
          <span class="col-line"></span>
          <span style="color:#333333;font-weight: bold;">
            <i class="v-icon v-icon-consult m-icon-left"></i>400-8900-9999</span>
        </div>
      </header>
    </div>

    <div class="nav">
      <div class="w1200 nav-wrap">
        <div class="nav-lt">
          <img class="logo" src="/static/imgs/index/logo.png" alt="logo">
        </div>
        <div class="nav-bd">
          <ul>
            <li class="nav-list" v-for="(nav, index) in navs" :key="'nav' + index">
              <a :class="index === 0 ? 'active' : ''">{{nav.text}}</a>
            </li>
          </ul>
        </div>
        <div class="nav-rt" v-if="!userInfo.id">
          <el-button type="danger" @click="login" style="background-color: #FC4A46">登录</el-button>
          <el-button type="danger" plain @click="regist">注册</el-button>
        </div>
        <div class="nav-rt" v-else>
          <div class="userInfo">
            <div class="userInfo-con">
              <img class="userImg" :src="userInfo.headUrl || '/static/imgs/index/showperson.png'" alt="用户头像">
              <span class="userName" v-if="userInfo.userName">{{userInfo.userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </div>
            <ul class="user-handle">
              <li class="user-handle_item" @click="toManage">进入后台</li>
              <li class="user-handle_item" @click="loginout">退出登录</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(bannerItem, index) in banner" :key="'banner' + index">
          <img v-if="bannerItem.cover" class="bannerImg" :src="bannerItem.cover" :alt="bannerItem.alt" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="w1200 banner-con">
        <p class="banner-con_title">95%的优秀企业，都在用必火互动！</p>
        <p class="banner-con_subtitle">线上引流、吸粉、老带新、互动，一步到位</p>
        <div class="phone-ipt">
          <input type="text" placeholder="输入手机号" v-model="userPhone">
          <span class="btn-experience" @click="toExperience">马上体验</span>
        </div>
      </div>
    </div>
    <div class="onlineService hide" id="onlineService">
      <div class="onlineService-icon"><img src="/static/imgs/index/online.png" style="width: 24px;height: 27px;"></div>
      <div class="onlineService-text">
        <p>在线客服</p>
      </div>
    </div>
    <div class="part1">
      <div class="w1200 part1-wrap">
        <p class="main-title">必火互动，全面解决营销与传播的痛点</p>
        <p class="sub-title">必火互动传播工具，运用12年互联网营销实战经验</p>
        <p class="sub-title">致力于帮助实体企业解决客流量少，品牌传播难、促销活动没效果、客户互动性差、客户口碑弱等营销难题</p>
        <p class="sub-title">提供引流效果好，传播势能强，转化率高的线上h5互动营销工具</p>
        <ul class="part1-des">
          <li class="part1-des_list">
            <img src="/static/imgs/index/advantage1.png" alt="">
            <p class="advantage-label">轻松获客</p>
            <p>轻巧获得精准客户</p>
            <p>告别盲目的宣传推广</p>
          </li>
          <li class="part1-des_list">
            <img src="/static/imgs/index/advantage2.png" alt="">
            <p class="advantage-label">促进转换</p>
            <p>转化率高</p>
            <p>业绩显著提</p>
          </li>
          <li class="part1-des_list">
            <img src="/static/imgs/index/advantage3.png" alt="">
            <p class="advantage-label">品牌传播</p>
            <p>体验感强，互动性高</p>
            <p>品牌传播范围广</p>
          </li>
          <li class="part1-des_list">
            <img src="/static/imgs/index/advantage4.png" alt="">
            <p class="advantage-label">门店引流</p>
            <p>促销引流立杆见影</p>
            <p>促销活动场面火爆</p>
          </li>
          <li class="part1-des_list">
            <img src="/static/imgs/index/advantage5.png" alt="">
            <p class="advantage-label">老客户激活</p>
            <p>促进老客户二次消费</p>
            <p>引导客户转介绍</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="part2" v-if="categoryActs.length > 0">
      <div class="w1200">
        <p class="main-title">海量模版 傻瓜式创建 </p>
        <p class="sub-title">10年以上专业营销经验+精美活动模板，打造互动性好、体验感强、传播效果佳的必火互动营销工具</p>
        <p class="sub-title">支持电脑、手机同步编辑管理活动，轻轻松松搞定！</p>
        <ul class="part2-nav">
          <li
            v-for="(item, index) in categoryActs" 
            :key="'categoryActsTitle' + index"
            :class="['part2-rest', {'part2-active': curPart2Nav === index}]" 
            @click="curPart2Nav = index">
            <label :for="'actSwiper' + (index + 1)">
              <a>{{item.categoryName}}</a>
            </label>
          </li>
        </ul>
        <swiper :options="swiperAct">
          <swiper-slide v-for="(item, idx) in categoryActs" :key="'act' + idx">
            <act-list v-if="item.activityList.length > 0" class="part2-nav_con" :activities="item.activityList.slice(0, 4)" type="show"></act-list>
            <div class="empty-nav_con" v-else>还没有与此相关的活动哦</div>
          </swiper-slide>
          <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
        </swiper>
        <div class="btn-create">立即创建</div>
      </div>
    </div>
    <div class="part3">
      <div class="w1200">
        <p class="main-title">优秀的企业都在用必火互动</p>
        <ul class="related-users">
          <li class="related-users_list">
            <img src="/static/imgs/index/related-user1.png" alt="related">
            <div class="related-users_con">
              <h4>老家味正宗湘菜</h4>
              <p>“我们也试过自己找团队开发，结果一次促销，就把 系统冲垮了。后来决定用必火互动，专业的事交给专 业的人，传播还得用必火。”</p>
            </div>
          </li>
          <li class="related-users_list">
            <img src="/static/imgs/index/related-user2.png" alt="related">
            <div class="related-users_con">
              <h4>老家味正宗湘菜</h4>
              <p>“我们也试过自己找团队开发，结果一次促销，就把 系统冲垮了。后来决定用必火互动，专业的事交给专 业的人，传播还得用必火。”</p>
            </div>
          </li>
          <li class="related-users_list">
            <img src="/static/imgs/index/related-user3.png" alt="related">
            <div class="related-users_con">
              <h4>老家味正宗湘菜</h4>
              <p>“我们也试过自己找团队开发，结果一次促销，就把 系统冲垮了。后来决定用必火互动，专业的事交给专 业的人，传播还得用必火。”</p>
            </div>
          </li>
        </ul>
        <ul class="parters">
          <li><img src="/static/imgs/index/part1.png" alt="part"></li>
          <li><img src="/static/imgs/index/part2.png" alt="part"></li>
          <li><img src="/static/imgs/index/part3.png" alt="part"></li>
          <li><img src="/static/imgs/index/part4.png" alt="part"></li>
          <li><img src="/static/imgs/index/part5.png" alt="part"></li>
          <li><img src="/static/imgs/index/part6.png" alt="part"></li>
          <li><img src="/static/imgs/index/part7.png" alt="part"></li>
          <li><img src="/static/imgs/index/part8.png" alt="part"></li>
          <li><img src="/static/imgs/index/part9.png" alt="part"></li>
          <li><img src="/static/imgs/index/part10.png" alt="part"></li>
          <li><img src="/static/imgs/index/part11.png" alt="part"></li>
        </ul>
      </div>
    </div>
    <div class="part4">
      <div class="w1200">
        <p class="main-title">不仅仅是营销工具</p>
        <p class="sub-title">近50位行业营销专家倾力打造高效营销解决方案</p>
        <div class="part4-list">
          <ul class="part4-row">
            <li class="item-imgtext">
              <img src="/static/imgs/index/showperson.png" alt="">
              <p>营销达人</p>
            </li>
            <li class="item-imgtext">
              <img src="/static/imgs/index/showperson.png" alt="">
              <p>营销达人</p>
            </li>
            <li class="item-text flex2">
              <div class="text-des">
                <p>教育培训</p>
                <p>汽车驾培</p>
              </div>
              <div class="text-des">
                <p>美容美妆</p>
                <p>运动健身</p>
              </div>
            </li>
            <li class="item-imgtext">
              <img src="/static/imgs/index/showperson.png" alt="">
              <p>营销达人</p>
            </li>
            <li class="item-text">
              <div class="text-des">
                <p>美容美妆</p>
                <p>运动健身</p>
              </div>
            </li>
            <li class="item-imgtext">
              <img src="/static/imgs/index/showperson.png" alt="">
              <p>营销达人</p>
            </li>
          </ul>
          <div class="second-row">
            <div class="second-row_col1">
              <div class="item-text">
                <div class="text-des">
                  <p>教育培训</p>
                  <p>汽车驾培</p>
                </div>
                <div class="text-des">
                  <p>美容美妆</p>
                  <p>运动健身</p>
                </div>
              </div>
              <div class="part4-row">
                <div class="item-imgtext">
                  <img src="/static/imgs/index/showperson.png" alt="">
                  <p>营销达人</p>
                </div>
                <div class="item-text">
                  <div class="text-des">
                    <p>美容美妆</p>
                    <p>运动健身</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="second-row_col2">
              <div class="item-text">
                <p class="second-row_col2-label">营销达人</p>
                <div>“优惠券、满减送、签到有礼...有赞的营销 工具给良品铺子微信1000多万粉丝提供了多 元化的活动玩法，增强了品牌及粉丝的用户粘性，有你，有喜！</div>
              </div>
            </div>
            <div class="second-row_col3">
              <div class="item-imgtext">
                <img src="/static/imgs/index/showperson.png" alt="">
                <p>营销达人</p>
                <div>“优惠券、满减送、签到有礼...有赞的营销 工具给良品铺子微信1000多万粉丝提供了多 元化的活动玩法，增强了品牌及粉丝的用户粘性，有你，有喜！</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="part5">
      <ul class="w1200">
        <li>
          <p class="label">11年</p>
          <p>11年一线互联网</p>
          <p>实战营销经验</p>
        </li>
        <li>
          <p class="label">1对1</p>
          <p>一对一营销指导</p>
          <p>确保活动实战落地</p>
        </li>
        <li>
          <p class="label">10倍</p>
          <p>同等投入提升5-10倍</p>
          <p>的宣传效果</p>
        </li>
        <li>
          <p class="label">30+</p>
          <p>30多家主流媒体报导</p>
          <p>实力见证！</p>
        </li>
      </ul>
    </div>
    <div class="part6">
      <div class="w1200">
        <p class="main-title">现在，开始开启你的必火传播</p>
        <div class="phone-ipt">
          <input type="text" placeholder="输入手机号" v-model="userPhone">
          <span class="btn-experience" @click="toExperience">马上体验</span>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ActList from 'src/components/act-list'
import PageFooter from './page-footer'
import USER from 'src/server/user'
import ACTIVITY from 'src/server/activity'

import PreviewBargain from 'src/components/preview/bargain.vue'
import PreviewCardscollect from 'src/components/preview/cards-collect.vue'

export default {
  data () {
    return {
      userPhone: '', // 用户手机号
      curPart2Nav: 1, // 当前part2Nav的值
      userInfo: {}, // 用户信息
      navs: [
        {
          id: 'nav-01',
          text: '首页',
          href: '#'
        },
        {
          id: 'nav-02',
          text: '产品',
          href: '#'
        },
        {
          id: 'nav-03',
          text: '案例',
          href: '#'
        },
        {
          id: 'nav-04',
          text: '营销学院',
          href: '#'
        },
        {
          id: 'nav-05',
          text: '合作加盟',
          href: '#'
        },
        {
          id: 'nav-06',
          text: '关于',
          href: '#'
        }
      ],
      banner: [
        {
          id: 1,
          cover: '/static/imgs/index/banner@2x.png',
          alt: 'banner1'
        },
        {
          id: 2,
          cover: '/static/imgs/index/banner@2x.png',
          alt: 'banner2'
        }
      ],
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperAct: {
        autoplay: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet (index, className) {
            return `<button class="${className} swiper-pagination-bullet-custom" id='actSwiper${index +
              1}'>${index + 1}</button>`
          }
        }
      },
      categoryActs: [],
      customerService: false, // 是否显示客服
      debounceTimer: null
    }
  },
  components: {
    swiper,
    swiperSlide,
    ActList,
    PageFooter,
    PreviewBargain,
    PreviewCardscollect
  },
  methods: {
    openLogin () {
      this.$emit('showLogin', true)
    },
    loginout () {
      this.userInfo = {}
      this.$emit('loginout')
    },
    login () {
      this.$emit('onLogin')
    },
    regist () {
      this.$emit('onRegist')
    },
    toExperience () {
      this.$emit('toExperience', this.userPhone)
    },
    togglePart2Nav (curNav) {
      this.curPart2Nav = curNav
    },
    // 进入后台
    toManage () {
      location.href = './manage.html'
    }
  },
  mounted () {
    // 页面滚动
    let _self = this
    /* let bodyEle = document.querySelector('body')
    let availHeight = document.body.clientHeight
    bodyEle.addEventListener('scroll', function (e) {
      _self.debounceTimer && clearTimeout(_self.debounceTimer)
      _self.debounceTimer = setTimeout(() => {
        if (bodyEle.scrollTop > availHeight) {
          _self.customerService = true
          document.querySelector('#onlineService').classList.remove('hide')
        } else {
          _self.customerService = false
          document.querySelector('#onlineService').classList.add('hide')
        }
      }, 200)
    })
    _self.swiper.slideTo(0, 1000, false) */
    USER.isLogin({
      showErr: false
    }).then(res => {
      _self.userInfo = res.rs || {}
    })
    ACTIVITY.category().then((res) => {
      if (res.suc) {
        this.categoryActs = res.rs
      }
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="scss">
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.swiper-slide{
  overflow: hidden;
}
.main {
  color: red;
  .part2 {
    .act-wrap .lists-box {
      justify-content: space-between;
      margin-right: 0;

      li {
        width: 226px;
      }
    }
    .swiper-container {
      position: static !important;
    }
    .swiper-button-prev,
    .swiper-button-next,
    .swiper-pagination {
      top: initial;
      left: initial;
      right: initial;
      bottom: initial;
      margin-top: -200px;
    }
    .swiper-button-prev {
      margin-left: -64px;
    }
    .swiper-button-next {
      margin-left: 1220px;
    }
    .swiper-pagination {
      visibility: hidden;
    }
  }
}
</style>


<style lang="scss" scoped>
.col-line {
  display: inline-block;
  width: 1px;
  height: 1em;
  background: currentColor;
}
.main-title {
  color: #484e5a;
  text-align: center;
  font-size: 32px;
  line-height: 88px;
}
.sub-title {
  color: #a6a6a6;
  text-align: center;
  font-size: 14px;
  line-height: 25px;
}
.main {
  font-size: 14px;
  color: #a6a6a6;
}
.w1200 {
  width: 1200px;
  margin: 0 auto;
}
.header {
  background: #fff;
  border-bottom: 1px solid #a6a6a6;

  .col-line {
    margin: 0 2em;
  }
}
.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3em;
}
.nav {
  background: #fff;
  position: relative;
  z-index: 2;
}
.nav-wrap {
  display: flex;
  height: 80px;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 114px;
    height: 26px;
  }

  .nav-bd {
    flex: 1;
    font-size: 16px;
    color: #2c3a45;
    ul {
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
      position: relative;
    }
    ul a:hover,
    ul a.active {
      color: #fc4a46;
      padding-bottom: 1.8em;
      border-bottom: 4px solid currentColor;
    }
    .nav-list:not(:last-child) {
      margin-right: 4em;
    }
  }
  .nav-rt {
    margin-left: 82px;
    display: flex;

    .userInfo {
      position: relative;

      .userInfo-con {
        display: flex;
        align-items: center;
        padding: 10px 20px 20px;
        border: 1px solid transparent;
        border-bottom: none;
        box-sizing: content-box;
      }

      &:hover {
        .userInfo-con {
          border-color: #ccc;
        }        
        .user-handle {
          display: inline-block;
        }
      }

      .userImg {
        width: 36px;
        height: 36px;
        border-radius: 36px;
        margin-right: 20px;
      }

      .user-handle {
        position: absolute;
        display: none;
        width: 100%;
        top: 100%;
        left: -1px;
        text-align: center;
        border: 1px solid #ccc;
        border-top: none;
        box-sizing: content-box;
        background: #fff;

        &_item {
          color: currentColor;
          line-height: 36px;
          cursor: point;
        }
        &_item:hover {
          color: #fff;
          background-color: $c-red;
        }
      }
    }
  }
}
.banner {
  position: relative;
  min-width: 1200px;
  overflow: hidden;
  background: #fff;

  .bannerImg {
    min-width: 1920px;
    height: 455px;
  }
  .banner-con {
    position: absolute;
    color: #fff;
    top: 25%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, 0);

    &_title {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &_subtitle {
      font-size: 16px;
    }

    .phone-ipt {
      width: 360px;
      margin-top: 49px;
      border-radius: 21px;
      background: #fff;

      input {
        width: calc(100% - 120px);
        border: none;
        line-height: 42px;
        text-indent: 1em;
      }
      .btn-experience {
        float: right;
        width: 114px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        border-radius: 20px;
        margin-top: 1px;
        margin-right: 2px;
        background: #fc4a46;
      }
    }
  }
}
.onlineService {
  cursor: pointer;
  width: 45px;
  bottom: 20%;
  right: 10%;
  position: fixed;
  z-index: 10;
  .onlineService-icon {
    width: 45px;
    height: 45px;
    background: #fc4a46;
    text-align: center;
    img {
      margin-top: 7px;
    }
  }
  .onlineService-text {
    width: 45px;
    padding: 11px 0 19px 0;
    border-width: 1px solid #e5e5e5;
    border-top: none;
    background: #fff;
    p {
      text-align: center;
      color: #666666;
      font-size: 16px;
      width: 15px;
      line-height: 20px;
      margin: 0 auto;
    }
  }
}
.part1 {
  background: #fff;
  padding: 54px 0 71px 0;

  .part1-des {
    margin-top: 90px;
    display: flex;
    justify-content: space-around;

    .part1-des_list {
      img {
        width: 130px;
        height: 130px;
        border-radius: 100%;
        overflow: hidden;
      }
      p {
        text-align: center;
        font-size: 14px;
        color: #a6a6a6;
        line-height: 2;
      }
      .advantage-label {
        color: #333;
        font-size: 20px;
      }
    }
  }
}
.part2 {
  background: #f7f7f7;
  padding: 54px 0 62px 0;

  .part2-nav {
    display: flex;
    font-size: 16px;
    margin-top: 60px;
    justify-content: space-around;
    cursor: pointer;

    .part2-rest {
      width: 156px;
      line-height: 50px;
      color: #f15f5c;
      margin: 10px;
      text-align: center;
      border-radius: 5px;
      background: #fcd7d7;

      label {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }

    .part2-active,
    .part2-rest:hover {
      color: #ffffff;
      background: #fc4a46;
    }
  }
  .part2-nav_con {
    background: #f7f7f7;
  }
  .empty-nav_con{
    text-align: center;
    margin-top: 150px;
  }
  .btn-create {
    cursor: pointer;
    margin: 67px auto 0;
    color: #fff;
    width: 230px;
    font-size: 16px;
    text-align: center;
    line-height: 45px;
    border-radius: 45px;
    background: #fc4a46;
  }
}
.part3 {
  background: #fff;
  padding: 57px 0;

  .related-users {
    margin-top: 57px;
    display: flex;
    justify-content: space-around;

    &_list {
      width: 300px;
      line-height: 2;
      box-shadow: 1px 0px 10px rgba(215, 215, 215, 0.64);

      img {
        width: 100%;
        height: 151px;
      }
      .related-users_con {
        padding: 1em;
      }
      h4 {
        color: #484e5a;
        font-size: 16px;
      }
    }
  }
  .parters {
    margin-top: 57px;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;

    li {
      border: none;
      width: 175px;
      margin: 0 3px 3px 0;
      &:nth-of-type(8) {
        width: 353px;
      }
    }

    img {
      width: 100%;
      height: 90px;
    }
  }
}
.part4 {
  padding: 104px 0 131px 0;
  background: #f7f7f7;

  .part4-row {
    margin-top: 10px;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
  }

  .second-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    margin-top: 10px;
    overflow: hidden;

    .item-text {
      margin-right: 0;
    }

    .second-row_col1 {
      flex: 2;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      margin-right: 10px;
    }
    .second-row_col2 {
      flex: 3;
      align-self: stretch;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .item-text {
        height: 100%;
        padding: 0 110px;
        box-sizing: border-box;
      }
      &-label {
        font-size: 22px;
        margin-bottom: 20px;
      }
    }
    .second-row_col3 {
      flex: 2;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .item-imgtext {
        margin: 0;
        padding: 0 30px;
      }
    }
  }

  .item-imgtext,
  .item-text {
    flex: 1;
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #484e5a;
    line-height: 2;
    height: 160px;
    align-self: center;
    background: #fff;
    box-sizing: border-box;
    margin-right: 10px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 100%;
      overflow: hidden;
    }

    &:hover {
      color: #ffffff;
      background: #fc4a46;

      .text-des {
        color: #fff;
      }
      img {
        box-shadow: 0 0 5px #fc4a46;
      }
    }
  }

  .flex2 {
    flex: 2 !important;
  }
  .text-des {
    display: inline-block;
    text-align: center;
    color: #fc4a46;
    font-size: 22px;
  }
}
.part5 {
  background: white;
  ul {
    display: flex;
    justify-content: space-between;
    padding: 56px 0 68px 0;

    li {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 180px;
      text-align: center;
      line-height: 1.5;
      border: 1px solid #fc4a46;
      border-radius: 100%;

      .label {
        color: #fc4a46;
        font-size: 55px;
        line-height: 1.2;
      }
    }
  }
}
.part6 {
  height: 280px;
  background: #fc4a46;

  .main-title {
    color: #fff;
    padding-top: 35px;
  }
  .phone-ipt {
    width: 460px;
    margin: 35px auto 0;
    border-radius: 21px;
    background: #fff;
    overflow: hidden;

    input {
      width: calc(100% - 120px);
      border: none;
      line-height: 42px;
      text-indent: 1em;
    }
    .btn-experience {
      float: right;
      width: 114px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      border-radius: 20px;
      margin-top: 1px;
      margin-right: 1px;
      background: #fc4a46;
    }
  }
}
</style>

