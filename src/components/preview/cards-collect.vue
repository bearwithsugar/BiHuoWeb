<template>
  <div class="card-collect">
    <div class="head">
      <div class="swipter-box">
        <!--轮播图-->
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="hotItem in hot" :key="hotItem.id">
            <router-link v-if="hotItem.cover" to="#" tag="img" class="objectfit-cover hotImg" :src="hotItem.cover" :alt="hotItem.alt"></router-link>
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
    <div class="card-collect_con">
      <div class="border-title">
        <div class="person-withnick">
          <img class="person-withnick_img" src="./default-img/killprice-person.jpg" alt="">
          <span class="person-withnick_nick">砍价达人</span>
        </div>
      </div>
      <div class="contain">
        <div class="join-form">
          <p class="title">真知培优98元享价值9800元《金牌晚 自习》，权威老师全程带领！</p>
          <div class="kill-price cards">
            <div class="kill-price_con">
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
        <div class="countdown-time">
          <div class="left-time">
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
        <div class="splitline"></div>
        <ul class="myCards" v-if="gatherCards.length > 0">
          <li class="card-list"
            v-for="(item, index) in gatherCards"
            :key="'cardlist' + index"
            :style="item.imgBackground ? 'background-image:url(' + item.imgBackground + ')' : 'background:none'">
            <!--卡片中心显示的内容，小白圈内-->
            <span class="card-list_text">{{item.content}}</span>
            <!--用于显示每张卡片拥有数量-->
            <span class="card-num">{{item.count}}</span>
          </li>
        </ul>
        <div class="myCards-count">vins的集卡箱中有0张卡</div>
        <div class="join-btn">
          <button type="button">我要集卡</button>
        </div>
        <div class="sawtoothline"></div>
      </div>
    </div>
    <p class="m-card-title">活动描述</p>
    <div class="m-card m-card_shadow pro-des">
      <div class="m-card-con ql-editor" id="activityDescription" v-html="descHtml"></div>
    </div>
    <p class="m-card-title">更多惊喜</p>
    <div class="m-card m-card_shadow pro-des">
      <div class="m-card-con ql-editor" id="activitySurprise" v-html="surpriseHtml"></div>
    </div>
    <p class="m-card-title">活动规则</p>
    <div class="m-card m-card_shadow port-rule">
      <div class="m-card-con ql-editor">{{form.rule}}</div>
    </div>
    <p class="m-card-title">活动主办方</p>
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
    <p class="m-card-title">排行榜</p>
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

// 图片资源
import defaultPerson from './default-img/killprice-person.jpg'
import defaultBanner from './default-img/collectCards/theme1/cover.png'

export default {
  name: 'PreviewCardscollect',
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
    gatherCards: Array,
    descHtml: String,
    surpriseHtml: String
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      hot: [
        {
          id: 1,
          cover: defaultBanner,
          alt: 'banner1'
        },
        {
          id: 2,
          cover: defaultBanner,
          alt: 'banner2'
        }
      ],
      rank: [
        {
          person: {
            id: 1,
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
.person-withnick {
  position: relative;
  text-align: center;
  &_img {
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 100%;
  }
  &_nick {
    position: absolute;
    display: inline-block;
    width: 5em;
    color: #fff;
    left: 50%;
    bottom: 0;
    font-size: 0.16rem;
    padding: 0.05rem 0.08rem;
    border-radius: 0.4em;
    transform: translate(-50%, 0.12rem);
    @include gradientLR(#FFAE00,#FC4A46);
  }
}
.card-collect_con {
  .contain {
    padding: 0 0.3rem;
  }
}
.card-collect {
  color: #5c5c5c;
  font-size: 0.3rem;
  line-height: 1.5;
  background: #a7e8c3;
}
.border-title {
  @include imageset('./default-img/collectCards/theme1/title-bg.png', top center no-repeat);
  width: 100%;
  height: 1.2rem;
}
.bargain-page-header {
  color: #fff;
  background: #000;
}
.join-form .kill-price.cards {
  justify-content: center;
}
.myCards{
  display: flex;
  flex-flow: row wrap;
  padding: .2rem;
  background: #fff;

  .card-list{
    position: relative;
    width: 1.82rem;
    height: 2.44rem;
    margin: 0 .16rem .34rem;
    background-size: 100% 100%;

    &_text{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.5em;
      height: 1.5em;
      line-height: 1.5em;
      text-align: center;
      color: #000;
      font-size: .5rem;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, .6);
    }
  }
}
.myCards-count {
  font-size: 0.3rem;
  color: #ffa705;
  text-align: center;
  padding: 0.2rem 0 0.48rem;
  background: #fff;
}
  .rule{
    white-space:normal;
    word-break:break-all;
    word-wrap:break-word;

  }
</style>

