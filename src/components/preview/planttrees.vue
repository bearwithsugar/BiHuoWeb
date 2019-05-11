<template>
  <div class="card-collect">
    <div class="head">
      <div class="swipter-box">
        <img src="./default-img/planttrees/headpic.png">
      </div>
    </div>
    <div class="card-collect_con">
      <div class="border-title">
        <img  src="./default-img/planttrees/border.png" alt="">
      </div>

      <div class="contain">
        <div class="join-form">
          <div class="title" v-model="form.title" style="color: #259b24">
            {{form.activityName}}
          </div>

            <div class="restpresent">
                剩余奖品：<span style="color: red;font-size: 10px">{{activityPlant.restpresent || 100}}</span>
            </div>
            <div class="deadline">
              活动截止时间:{{form.endTime}}
            </div>
          <div class="boss-point">.......................................</div>
          <div class="join-number">活动已有78人参与</div>
          <div class="moreuser"></div>
          <div class="moreuser"></div>
          <div class="moreuser"></div>
        </div>
        <!--白色框框结束-->

        <!--活动玩法-->
        <div style="margin-top: 10px;">
          <div class="activityplay">活动玩法</div>
          <div class="play-outsidecontainer">
            <div class="play-insidecontainer">
              <div class="play-content">
                <div>
                  <img src="./default-img/planttrees/redheart.png" class="play-img">
                </div>
                <div class="play-step">
                  报名参加活动
                </div>
              </div>
            </div>
            <div class="play-insidecontainer">
              <div class="play-content">
                <div>
                  <img src="./default-img/planttrees/rabbit.png" class="play-img">
                </div>
                <div class="play-step">
                  邀好友帮忙助力
                </div>
              </div>
              </div>
            <div class="play-insidecontainer">
              <div class="play-content">
                <div>
                  <img src="./default-img/planttrees/present.png" class="play-img">
                </div>
                <div class="play-step">
                  活动完成去兑奖
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!--我要参加按钮-->
    <div class="button-container">
      <div class="join-button"><div class="join-text">我要参加</div></div>

    </div>
    <div class="active-title"><div class="title-text">活动人气团</div></div>
    <div class="white-block">
      <div class="block-title">
        浇满<span style="width: 39px;height: 29px;font-size: 15px;font-family: MicrosoftYaHei;color: #e51c23;">
        {{activityPlant.waternumber || 30}}</span>次即可种树赢取大奖
      </div>
      <div class="block-little-title">
        已完成数：<span class="title-number">0</span>距离完成目标还差<span class="title-number">{{activityPlant.waternumber || 30}}</span>
      </div>
      <div class="circle-gather">
        <div class="circle-line">
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
        </div>
        <div class="circle-line">
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
        </div>
        <div class="circle-line">
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
        </div>
        <div class="circle-line">
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
          <div class="circle-container">
            <div class="moreuser"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="active-title"><div class="title-text">活动描述</div></div>
    <div class="white-block">
      <div class="content-text ql-editor" v-html="descHtml">
        这里显示图文内容
      </div>
    </div>

    <div class="active-title"><div class="title-text">更多惊喜</div></div>
    <div class="white-block">
      <div class="content-text ql-editor" v-html="surpriseHtml">
        更多惊喜一：这里显示图文内容。
        更多惊喜二：
        更多惊喜三：
      </div>
    </div>
    <div class="active-title"><div class="title-text">活动规则</div></div>
    <div class="white-block">
      <div class="content-text ql-editor">
        <!--1、点击“我要参加”进行报名；-->
        <!--2、报名成功后，发送给好友帮忙点开即可成功助力一次；-->
        <!--3、完成任务后获得对应的活动奖品；-->
        <!--4、本期商品数量有限，赶快下手哦！-->
        {{form.rule}}
      </div>
    </div>
    <div class="active-title"><div class="title-text">活动主办方</div></div>
    <div class="white-block">
      <div class="content-text ql-editor">
        这里显示图文内容
      </div>
      <div class="boss-block">
        <div class="boss-picture">
          <img :src="industry.industryLogo" style="border-radius: 50px; width: 100px; height: 100px;"/>
        </div>
        <div class="boss-name">{{industry.industryName}}</div>
        <div class="boss-point">..........................................</div>
      </div>
      <div class="boss-msg">
        <div class="boss-left">
          <div class="boss-call-content">
            一键拨号
          </div>
          <div class="boss-call-button">
            <div class="btn-content">
              {{industry.industryPhone}}
            </div>
          </div>
          <div class="boss-add">
            这里显示详细地址，最多2排
            不超过24个字
          </div>
        </div>
        <div class="boss-ma">
          <img src="./default-img/planttrees/ma.png">

        </div>
      </div>

    </div>

    <!--机构门店-->
    <div class="store-container">
      <div class="store-content" >
        <div class="store-point"></div>
        <div>
          <div class="store-name">机构门店1</div>
          <div class="store-msg ql-editor">这里显示详细地址，最多2排张老师  13637475397</div>
        </div>
        <div class="call-button">
          <div class="call-content">一键拨号</div>
        </div>
      </div>

      <div class="store-content" >
        <div class="store-point"></div>
        <div>
          <div class="store-name">机构门店2</div>
          <div class="store-msg ql-editor">这里显示详细地址，最多2排张老师  13637475397</div>
        </div>
        <div class="call-button">
          <div class="call-content">一键拨号</div>
        </div>
      </div>

    </div>

    <div class="active-title"><div class="title-text">总排行榜</div></div>
    <div class="white-block">
      <div class="rank-line">
        <div class="rank-sample">
          <img src="./default-img/planttrees/medal.png">
        </div>
        <div class="rank-head">
          <img src="./default-img/planttrees/head.png">
        </div>
        <div class="rank-name">谁谁谁</div>
        <div class="rank-state">完成了任务</div>
      </div>
      <div class="rank-line">
        <div class="rank-sample">
          <img src="./default-img/planttrees/medal.png">
        </div>
        <div class="rank-head">
          <img src="./default-img/planttrees/head.png">
        </div>
        <div class="rank-name">谁谁谁</div>
        <div class="rank-state">完成了任务</div>
      </div>
      <div class="rank-line">
        <div class="rank-sample">
          <img src="./default-img/planttrees/medal.png">
        </div>
        <div class="rank-head">
          <img src="./default-img/planttrees/head.png">
        </div>
        <div class="rank-name">谁谁谁</div>
        <div class="rank-state">完成了任务</div>
      </div>
      <div class="rank-line">
        <div class="rank-sample">
          <img src="./default-img/planttrees/medal.png">
        </div>
        <div class="rank-head">
          <img src="./default-img/planttrees/head.png">
        </div>
        <div class="rank-name">谁谁谁</div>
        <div class="rank-state">完成了任务</div>
      </div>
    </div>
    <p class="possession">活动最终解释权归主办方所有。</p>
  </div>
</template>

<script>
//  import 'swiper/dist/css/swiper.css'
//  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  // 图片资源
  import headpic from './default-img/planttrees/headpic.png'

  export default {
    name: 'PreviewPlanttress',
    props: {
      //活动的详细信息内容
      form: {
        type: Object
      },
      // 主办方信息
      industry: {
        type: Object
      },
      //商铺信息
      activityShopList: Array,
//      descHtml: String,
//      surpriseHtml: String

      descHtml: '',
      surpriseHtml: '',
      activityPlant: {
        type: Object
      }
    },
    data () {
      return {
//        swiperOption: {
//          autoplay: true,
//          pagination: {
//            el: '.swiper-pagination'
//          }
//        }
      }
    },
    computed: {
//      swiper () {
//        return this.$refs.mySwiper.swiper
//      }
    },
    components: {
//      swiper,
//      swiperSlide
    },
    methods: {
//      getRankImg (index) {
//        return require(`./default-img/rank${index + 1}@2x.png`)
//      }
    }
  }
</script>

<style lang="css" src="./comment.css" scoped></style>
<style lang="scss" src="./bargain.scss" scoped></style>
<style lang="scss" scoped>
  .card-collect_con {
  .contain {

    margin-top:-12px;
    padding: 0 0.3rem;
  }
  }
  .card-collect {
    color: #5c5c5c;
    font-size: 0.3rem;
    line-height: 1.5;
    background-color: rgba(139, 195, 74, 1);

  }
  .title{
    width:auto;
    height: auto;
    font-size:36px;
    font-family:MicrosoftYaHei;
    line-height:25px;
    margin-bottom:10px;
  }
  .restpresent{
    top: 386px;
    width: 85px;
    height: 23px;
    line-height: 17px;
    color: rgba(195, 195, 195, 1);
    font-size: 10px;
    text-align: left;
    font-family: -apple-system;
    display: inline-block;
    float: left;


  }
  .deadline{
    left: 176px;
    top: 386px;
    width: 170px;
    height: 23px;
    line-height: 17px;
    color: rgba(195, 195, 195, 1);
    font-size: 10px;
    text-align: right;
    font-family: -apple-system;
    display: inline-block;
    float: right;

  }
  .border-title {
    left: 0px;
    top: 282px;
    width: 100%;
    height: 100%;
  }
  .join-form{
    left: 10px;
    top: 299px;
    width: 100%;
    height: 169px;
    line-height: 20px;
    border-radius: 3px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    box-shadow: 2px 5px 10px 0px rgba(125, 176, 66, 1);
    font-family: -apple-system;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .join-number{
    left: 176px;
    top: 386px;
    width: auto;
    height: 23px;
    line-height: 17px;
    color: rgba(195, 195, 195, 1);
    font-size: 10px;
    text-align: left;
    font-family: -apple-system;
    margin-top: 10px;
    float: left;
    display: inline-block;
    margin-top: 35px;
  }
  .moreuser{
    left: 253px;
    top: 426px;
    width: 30px;
    height: 30px;
    line-height: 20px;
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 1);
    border-radius: 50%;
    display: inline-block;
    margin-top: 30px;
  }
  .play-outsidecontainer{
    width: 100%;
    height: 40px;
    display: flex;

  }
  .play-insidecontainer{
    height: 80px;
    width: 100px;

  }
  .play-content{
    width: auto;
    height: 55px;
    background: white;
    border-radius: 3px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .play-img{
    width: 25px;
    height: auto;
    margin: auto;
    margin-left: 27px;
    margin-top: 5px;
  }
  .play-step{
    width: auto;
    height: auto;
    font-size: 10px;
    font-family: MicrosoftYaHei;
    color: #259b24;
    margin-left: 4px;
  }
  .activityplay{
    width: auto;
    height: 28px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #ffd500;
  }
  .button-container{
    width:100%;
    height: 70px;
    background: #BADA97;
    display: flex;
    margin-top: 30px;
  }
  .join-button{
    width: 200px;
    height: 32px;
    background: #ffd500;
    border-radius: 39px;
    box-shadow: 4px 10px 10px #8ac24a;
    text-align: center;
    margin: auto;
  }
  .join-text{
    width: auto;
    height: 37px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: #259b24;
  }
  .active-title{
    background-image: url(/static/img/titleback.f095aeb.png);
    height: 72px;
    text-align: center;
    margin-left: -20px;
    display: flex;
  }
  .title-text{
    margin: auto;
    text-align: center;
    width: 70px;
    height: 20px;
    color:rgba(255,255,255,1);
  }
  .white-block{
    width: auto;
    height: auto;
    background: white;
    border-radius: 3px;
    box-shadow: 4px 10px 20px #7db042;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: -10px;
    padding: 6px;
  }
  .block-title{
    width: 222px;
    height: auto;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: #259b24;
    margin: auto;
  }
  .block-little-title{
    margin: 0;
    padding: 0;
    width: auto;
    text-align: center;
    font-size: 12px;
  }
  .title-number{
    width: 39px;
    height: 29px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #e51c23;
  }
  .store-container{
    width: auto;
    height: auto;
    background: #ffd500;
    border-radius: 3px;
    -webkit-box-shadow: 4px 10px 20px #7db042;
    box-shadow: 4px 10px 20px #7db042;
    margin: 10px;
    padding: 10px;
  }
  .content-text{
    width: auto;
    height: auto;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #373737;
  }
  .circle-gather{
    display: table;
    padding: 5px;
    width: 100%;
  }
  .circle-container{
    display: table-cell;
  }
  .circle-line{
    display: table-row;
  }
  .store-point{
    width: 15px;
    height: 15px;
    background:rgba(255,255,255,1);
    box-shadow:4px 10px 20px rgba(255,152,1,1);
    border-radius: 100%;
  }
  .store-content{
    width: 100%;
    height: auto;
    display: flex;
    padding: 5px;
  }
  .store-name{
    width: auto;
    height: auto;
    font-size: 13px;
    font-family: MicrosoftYaHei;
    color: #373737;
    /* line-height: 0px; */
    text-align: left;
    margin-left: 10px;
  }
  .store-msg{
    font-size: 12px;
    text-align: left;
    margin-left: 10px;
    width:150px;
  }
  .call-button{
    width: 50px;
    height: 50px;
    background: #8ac24a;
    border-radius: 10px;
    margin: auto;
    padding: 3px;
  }
  .call-content{
    width: auto;
    height: auto;
    font-size: 15px;
    font-family: MicrosoftYaHei;
    color: white;
    text-align: center;
  }
  .boss-block{
    width: 100%;
    margin-top: 100px;

  }
  .boss-picture{
    width: 100px;
    margin: auto;
  }
  .boss-name{
    width: auto;
    height: 36px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    color: #373737;
    /* line-height: 0px; */
    /* margin: auto; */
    text-align: center;
  }
  .boss-point{
    width: auto;
    height: 3px;
    font-size: 27px;
    font-family: MicrosoftYaHeiLight;
    color: #afafaf;
  }
  .boss-msg{
    display: flex;
    margin-top: 40px;
    padding: 5px;
  }
  .boss-call-content{
    width: auto;
    height: auto;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #373737;
  }
  .boss-call-button{
    width: 100%;
    height: 35px;
    background: #ffd500;
    border-radius: 40px;
    -webkit-box-shadow: 4px 10px 20px #ff9801;
    box-shadow: 4px 10px 20px #ff9801;
    margin-top: 5px;
  }
  .btn-content{
    width: auto;
    text-align: center;
    padding-top: 8px;
    font-family: MicrosoftYaHei;
    color: #373737;
    font-size: 15px;
  }
  .boss-add{
    width: 100%;
    height: auto;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #afafaf;
    /* line-height: 40px; */
    margin-top: 5px;
  }
  .boss-ma{
    width: 90px;
    height: auto;
    /* text-align: center; */
    margin: auto;
  }
  .boss-left{
    width: 180px;
    padding: 5px;
  }
  .rank-line{
    display: flex;
    width: auto;
  }
  .rank-sample{
    width: auto;
    margin-top: 15px;
  }
  .rank-head{
    width: 40px;
    margin-left: 10px;
    margin-top: 15px;
  }
  .rank-name{
    text-align: center;
    /* margin: auto; */
    margin-left: 10px;
    margin-top: 25px;
  }
  .rank-state{
    width: auto;
    /* float: right; */
    padding-left: 55px;
    padding-top: 25px;
  }

</style>

