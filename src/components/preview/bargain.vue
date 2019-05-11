<template>
  <div class="bargain" :style="{backgroundImage: erpStyle.bgImg ? `url(${erpStyle.bgImg})` : ''}">
    <div class="head">
      <div class="swipter-box">
        <!--<swiper :options="swiperOption" ref="mySwiper">-->
          <!--<swiper-slide v-for="hotItem in hot" :key="hotItem.id">-->
            <!--<router-link v-if="hotItem.cover" to="#" tag="img" class="objectfit-cover hotImg" :src="hotItem.cover" :alt="hotItem.alt"></router-link>-->
          <!--</swiper-slide>-->
          <!--<div class="swiper-pagination" slot="pagination"></div>-->
        <!--</swiper>-->

        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="hotItem in hot" :key="hotItem.id" v-if="hotItem.cover !== undefined">
            <router-link to="#" tag="img" class="objectfit-cover hotImg" :src="hotItem.cover" :alt="hotItem.alt"></router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <p class="head-title">9800 人查看 873 人分享 690 人报名</p>
      <ul class="head-sbt">
        <li>分享</li>
        <li>投诉</li>
        <li>海报</li>
      </ul>
    </div>
    <div class="join">
      <div class="boardline"></div>
      <div class="contain">
        <div class="join-form">
          <p class="title" :style="{color: erpStyle.activityNameColor ? `#${erpStyle.activityNameColor}` : 'inhert'}">{{form.activityName ||
          '真知培优98元享价值9800元《金牌晚 自习》，权威老师全程带领'}}</p>
          <div class="kill-price">
            <div class="kill-price_person">
              <div class="kill-price_person-img" ref="kk">
                <img class="bargain-img" src="./default-img/killprice-person.jpg" alt="">
                <span class="bargain-nick">砍价达人</span>
              </div>
              <span class="kill-price_person-name">vins</span>
            </div>
            <div class="kill-price_con">
              <div>砍价目标：
                <span class="aim-price">{{activityHaggle.afterPrice || 98}}</span>元</div>
              <div class="through-line">商品原价：
                <span class="bold old-proce">{{activityHaggle.formalPrice || 998}}</span>元</div>
              <div>支持人数：
                <span class="bold">0</span>
              </div>
              <div style="color: #999;">奖品总计
                <span>1000</span>份，仅剩
                <span class="bold">123</span>份</div>
            </div>
          </div>
          <div class="act-join">
            <div class="act-join_person">
              <img src="./default-img/killprice-person.jpg" alt="" class="act-join_person-img">
              <span class="act-join_person-text">刚刚周先生帮忙看了一刀</span>
            </div>
            <div class="act-join_person">
              <img src="./default-img/killprice-person.jpg" alt="" class="act-join_person-img">
              <span class="act-join_person-text">刚刚lily参加的活动</span>
            </div>
          </div>
        </div>
        <div class="splitline"></div>
        <div class="countdown-time">
          <div class="left-time" :style="{color: erpStyle.countDown ? `#${erpStyle.countDown}` : 'inhert'}">
            <span class="number">2</span>
            <span class="number">3</span>
            <span class="text">天</span>
            <span class="number">0</span>
            <span class="number">8</span>
            <span class="text">时</span>
            <span class="number">0</span>
            <span class="number">9</span>
            <span class="text">分</span>
            <span class="number">2</span>
            <span class="number">9</span>
            <span class="text no-mr">秒</span>
          </div>
        </div>
        <div class="join-btn">
          <button type="button" class="customButton">我要参加</button>
        </div>
        <div class="sawtoothline"></div>
      </div>
    </div>
    <p class="m-card-title" :style="{backgroundImage: erpStyle.titleImg ? `url(${erpStyle.titleImg})` : ''}">活动描述</p>
    <div class="m-card m-card_shadow pro-des">
      <div class="m-card-con ql-editor" id="activityDescription" v-html="descHtml"></div>
    </div>
    <p class="m-card-title" :style="{backgroundImage: erpStyle.titleImg ? `url(${erpStyle.titleImg})` : ''}">更多惊喜</p>
    <div class="m-card m-card_shadow pro-des">
      <div class="m-card-con ql-editor" id="activitySurprise" v-html="surpriseHtml"></div>
    </div>
    <p class="m-card-title" :style="{backgroundImage: erpStyle.titleImg ? `url(${erpStyle.titleImg})` : ''}">活动规则</p>
    <div class="m-card m-card_shadow port-rule">
      <div class="m-card-con ql-editor">{{form.rule}}</div>
    </div>
    <p class="m-card-title" :style="{backgroundImage: erpStyle.titleImg ? `url(${erpStyle.titleImg})` : ''}">活动主办方</p>
    <div class="m-card port-manger">
      <div class="m-card-con">
        <span class="tag-auth"></span>
        <img class="img" src="./default-img/placeholder-activity1.jpg" alt="" />
        <p class="text">
          七年来，经过金色雨林中心“个性化教育方案”指导的孩子已近三十万人，学习能力训练有效率为96.8%，得到教育界专家、教师、家长的充分肯定。可以说，正是这种当今世界上最前沿的个性化的教育理念，帮助每一个"金色雨林训练营"。
        </p>
        <div class="contact">
          <div class="logo">
            <img :src="industry.industryLogo" alt="" />
            <p>{{industry.industryName}}</p>
          </div>
          <div class="code-img">
            <div class="phone-box">
              <p class="t">一键拨号：</p>
              <span class="phone">
                <i class="el-icon-phone icon icon-left"></i>
                <a href="tel:0759-85533306">{{industry.industryPhone}}</a>
              </span>
              <p class="adr">{{industry.industryProvince + industry.industryCity + industry.industryArea || '' + industry.industryStreet || ''}}</p>
            </div>
            <img v-if="true" class="port-qrcode" :src="industry.industryUrl" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="m-card m-card_shadow" v-if="activityShopList && activityShopList.length > 0">
      <div class="m-card-con port-stores">
        <div class="port-stores-list" v-for="item in activityShopList" :key="'shop' + item.id">
          <div class="port-stores-list_lt customButton">
            <span class="stores-dotted"></span>
          </div>
          <div class="port-stores-list_bd">
            <p class="stores-name">{{item.shopName}}</p>
            <p class="stores-addr">{{item.shopAddress}}</p>
            <p class="stores-own">
              <span>{{item.contacts}}</span>
              <span>{{item.shopPhone}}</span>
            </p>
          </div>
          <div class="port-stores-list_rt">
            <a class="fast-call" :href="'tel:' + item.shopPhone">一键拨号</a>
          </div>
        </div>
      </div>
    </div>
    <p class="m-card-title" :style="{backgroundImage: erpStyle.titleImg ? `url(${erpStyle.titleImg})` : ''}">排行榜</p>
    <div class="m-card m-card_shadow rank">
      <div class="m-card-con">
        <div class="rank-list" v-for="(item, index) in rank" :key="item.finalPrice">
          <img v-if="index < 3" class="rank-list_babel" :src="getRankImg(index)" alt="">
          <span v-else class="rank-list_babel">{{index + 1}}</span>
          <img class="rank-list_personImg" :src="item.person.src" alt="">
          <div class="rank-list_person">
            <p class="person-name">{{item.person.name}}</p>
            <p class="bargain-randomName">{{rankRandom[index] || rankRandom[rankRandom.length - 1]}}</p>
          </div>
          <div class="rank-list_bargain">已砍至
            <span class="final-price">{{item.finalPrice}}</span>元</div>
        </div>
      </div>
    </div>
    <p class="possession">活动最终解释权归机构方所有。</p>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 图片资源
import defaultPerson from './default-img/killprice-person.jpg'
import defaultBanner from './default-img/bargain/theme1/cover.png'

export default {
  name: 'PreviewBargain',
  props: {
    form: {
      type: Object
    },
    activityHaggle: {
      type: Object
    },
    industry: {
      type: Object
    },
    activityShopList: Array,
    descHtml: String,
    surpriseHtml: String,
    erpStyle: Object
  },
  data () {
    return {
      activityDescription: null,
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      hot: [
//        {
//          id: 1,
//          cover: defaultBanner,
//          alt: 'banner1'
//        },
//        {
//          id: 2,
//          cover: defaultBanner,
//          alt: 'banner2'
//        }
        {
          id: 1,
          cover: this.form.mainImg[0],
          alt: 'banner1'
        },
        {
          id: 2,
          cover: this.form.mainImg[1],
          alt: 'banner2'
        }
        ,//下面是后加的
        {
          id: 3,
          cover: this.form.mainImg[2],
          alt: 'banner3'
        },
        {
          id: 4,
          cover: this.form.mainImg[3],
          alt: 'banner4'
        },
        {
          id: 5,
          cover: this.form.mainImg[4],
          alt: 'banner5'
        }
      ],

      joinForm: {
        userName: '',
        phone: '',
        vcode: ''
      },
      rank: [
        {
          person: {
            id: 1,
            src: defaultPerson,
            name: 'RuBy'
          },
          finalPrice: 98
        },
        {
          person: {
            id: 2,
            src: defaultPerson,
            name: 'vins'
          },
          finalPrice: 458
        },
        {
          person: {
            id: 3,
            src: defaultPerson,
            name: 'lily'
          },
          finalPrice: 1235
        },
        {
          person: {
            id: 4,
            src: defaultPerson,
            name: 'comty'
          },
          finalPrice: 9869
        }
      ],
      rankRandom: [
        '至尊砍价高手',
        '哥在砍价界是个好手',
        '是兄弟的多砍两刀',
        '砍价是个技术活'
      ]
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    getRankImg (index) {
      return require(`./default-img/rank${index + 1}@2x.png`)
    }
  }
}
</script>

<style lang="css" src="./comment.css" scoped></style>
<style lang="scss" src="./bargain.scss" scoped></style>
<style lang="scss" scoped>
.bargain-page-header {
  color: #fff;
  background: #000;
}
</style>

