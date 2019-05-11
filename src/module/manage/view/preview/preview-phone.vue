<template>
  <div>
     <div class="preview">
     <!--
      <div class="phone-top"></div>
      -->
      <div class="phone-main">
        
        <div class="phone-head">
          <div class="phone-show"></div>
          <div class="phone-title">
            <p>{{form.activityName}}</p>
          </div>
        </div>
        
        <div class="phone-content">
          <div class="phone-t1">98人查看 88人报名 11人分享</div>
          <div class="phone-mainImg">
            <img src="static/imgs/manage/editor/mainImg1.png">
            
          </div>
          <div class="haggle">
            <div>
              <p class="activityName">{{form.activityName}}</p>
              <div class="t2">
                <div class="t2-content">
                  <p>砍价目标：
                    <span>{{activityHaggle.formalPrice}}</span>元</p>
                  <p>商品原价：
                    <span>{{activityHaggle.afterPrice}}</span>元</p>
                  <p>支持人数：
                    <span>{{activityHaggle.limitPerson}}</span>人</p>
                </div>
                <img src="static/imgs/manage/editor/t2.png">
              </div>
              <div class="t3">
                <img src="static/imgs/manage/editor/t3.png">
              </div>
              <div class="t4 mar-t-15">
                <span class="t4-t">{{((surplusDate.day / 10 ) | 0) || 0}}</span>
                <span class="t4-t">{{surplusDate.day%10 || 0}}</span>
                <span class="t4-tt">天</span>
                <span class="t4-t">{{((surplusDate.hours/10)|0) || 0}}</span>
                <span class="t4-t">{{surplusDate.hours%10 || 0}}</span>
                <span class="t4-tt">时</span>
                <span class="t4-t">{{((surplusDate.minutes/10)|0) || 0}}</span>
                <span class="t4-t">{{surplusDate.minutes%10 || 0}}</span>
                <span class="t4-tt">分</span>
                <span class="t4-t">{{((surplusDate.t/10)|0) || 0}}</span>
                <span class="t4-t">{{surplusDate.t%10 || 0}}</span>
                <span class="t4-tt">秒</span>
              </div>

              <div class="t5">
                <div class="haggle-button">我要参加</div>
              </div>
              <div class="t6">
                <img src="static/imgs/manage/editor/t6.png">
              </div>
              <div class="haggle-title">
                活动描述
              </div>
              <div class="haggle-box" id="goodsDesciption">{{form.description}}</div>

              <div class="haggle-title">
                更多惊喜
              </div>
              <div class="haggle-box" id="elSurprised">{{form.surprise}}</div>
              <div class="haggle-title">
                活动规则
              </div>
              <div class="haggle-box">{{form.rule}}</div>

              <div class="haggle-title">
                活动主办方
              </div>
              <div class="haggle-box">
                <div id="industryDesc"></div>
                <div class="dashed" style="border-color: #C3C3C3"></div>
                <div class="industry-title">
                  <img :src="industry.industryLogo">
                  <p class="mar-t-15 t-center">{{form.industryName}}</p>
                </div>
                <div style="display: flex;justify-content: space-around;">
                  <div>
                    <p>一键拨号：</p>
                    <div class="haggle-button sponsor-phone">
                      <i style="position: absolute;left: 18px;" class="el-icon-phone icon icon-left"></i>
                      {{form.industryPhone}}</div>
                    <p class="font-small">
                      {{form.industryProvince}}{{form.industryCity}}{{form.industryArea}}{{form.industryStreet}}
                    </p>
                  </div>
                  <div>
                    <img :src="industry.industryUrl" style="width: 80px;height: 80px">
                  </div>
                </div>

              </div>
              <div style="height: 2px;background: #ffdde2;"></div>
              <div class="sponsor-shop" v-for="(item, index) in activityShopList" :key="'sponsor-shop' + index">
                <div>
                  <span></span>
                </div>
                <div class="sponsor-shop-content">
                  <p>{{item.shopName}}</p>
                  <p class="font-small">{{item.shopAddress}}</p>
                  <p class="font-small">{{item.contacts}} {{item.shopPhone}} </p>
                </div>
                <div class="sponsor-do-phone">
                  一键拨号
                </div>

                <div class="dashed"
                  v-if="index!=activityShopList.length-1" 
                  style="border-color: #C3C3C3;width: 100%;margin: 20px 0 0 0"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-foot" v-show="form.skilShow">技术支持：必火互动</div>
      </div>
      <!--
      <div class="phone-footer"></div>
      -->
    </div>
  </div>
</template>

<script type="text/javascript">
import Utils from 'src/lib/utils.js'
import Activity from 'src/server/activity.js'
export default {
  props: {
    userActivityId: {
      type: Number
    }
  },
  data () {
    return {
      form: {},
      activityHaggle: {},
      industry: {},
      surplusDate: {},
      activityShopList: []
    }
  },
  methods: {

  },
  mounted () {
    console.log(this.userActivityId)
    Activity.haggle({
      data: { userActivityId: this.userActivityId }
    }).then(res => {
      if (res.suc) {
        this.form = res.rs
        this.activityHaggle = res.rs.activityHaggle
        this.activityShopList = res.rs.activityShopList
        let date = Utils.DateCalculate(this.form.beginTime, this.form.endTime)
        this.surplusDate = date
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.preview {
    width: 340px;
    height: 655px;
    margin-right: 70px;
    top: -10px;
    box-sizing: content-box;
    position: relative;
    left: 40px;
    transform: scale(0.86);

    .phone-main {
      width: 339px;
      height: 550px;
      margin-left: 1px;
      border-left: 3px solid #f2f3f3;
      border-right: 3px solid #f2f3f3;
      position: relative;

      .phone-head {
        background: #1a1a1f;
        height: 62px;
        width: 100%;

        .phone-show {
          height: 22px;
          width: 100%;
          position: relative;
          top: 3px;
          background: url(/static/imgs/manage/editor/phone-title1.png);
        }

        .phone-title {
          height: 24px;
          margin-top: 8px;
          width: 100%;
          display: flex;
          justify-content: center;
          color: #fff;
          background: url(/static/imgs/manage/editor/phone-title2.png);
          font-size: 14px;

          p{
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            text-overflow: ellipsis;
          }
        }
      }

      .phone-content {
        height: 486px;
        overflow: auto;
        background: #fc4d69;
        font-size: 14px;
        img {
          width: 100%;
        }

        .music-bar {
          width: 33px;
          height: 108px;
          background: url(/static/imgs/manage/editor/music-bar.png);
          position: absolute;
          top: 90px;
          right: 20px;
        }
        .phone-t1 {
          width: 100%;
          height: 20xp;
          text-align: center;
          background: rgba(255, 255, 255, 0.4);
          font-size: 12px;
          position: absolute;
          z-index: 50;
        }
        .phone-mainImg {
          height: 216px;
          width: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        
        .t-time {
          background: rgb(182, 182, 182);
          color: #fff;
          padding: 4px 8px;
          margin: 15px auto;
          width: 50px;
        }

        .haggle {
          width: 304px;
          background: #fff;
          margin: auto;
          position: relative;
          left: 0.8px;

          .activityName {
            text-align: center;
            font-size: 16px;
            padding: 15px 0;
          }
          .haggle-title {
            padding: 25px 0;
            text-align: center;
            font-size: 16px;
            color: #fff;
            background: #fc4d69;
          }
          .haggle-box {
            padding: 20px 5px;
            min-height: 150px;

            .industry-title {
              img {
                width: 60px;
                height: 60px;
                display: block;
                margin: auto;
                border-radius: 50%;
              }
            }
          }

          .title {
            //font-size: .34rem;
            color: #313131;
            text-align: center;
            font-size: 16px;
          }
          .haggle-button {
            width: 120px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            border-radius: 8px;
            color: #fff;
            //margin:20px auto;
            background: linear-gradient(to right, #ffae00, #fc4a46);
          }
          .haggle-input {
            width: 200px;
            height: 36px;
            border: 1px solid #e94c46;
            border-radius: 36px;
            margin: 10px auto;
            line-height: 36px;
            color: #979797;
            padding-left: 20px;
          }
          .haggle-collect {
            padding-bottom: 10px;
            width: 304px;
            background: #fff;
            position: relative;

            .b1 {
              width: 200px;
              height: 36px;
              border-radius: 36px;
              margin: auto;
            }
          }

          .t2 {
            width: 100%;
            height: 150px;
            position: relative;
            background: url(/static/imgs/manage/editor/t2.png);
            .t2-content {
              position: absolute;
              top: 10px;
              right: 20px;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          .t3 {
            width: 103%;
            height: 12px;
            position: relative;
            left: -5px;

            img {
              width: 100%;
              height: 100%;
            }
          }
          .t4 {
            display: flex;
            width: 100%;
            height: 45px;
            justify-content: center;
            line-height: 34px;

            .t4-t {
              background: #000;
              color: #fff;
              height: 34px;
              padding: 0 4px;
              margin: 0 4px;

              border: 1px solid #fff;
              border-radius: 6px;
            }
          }
          .t5 {
            display: flex;
            justify-content: center;
            height: 50px;
          }
          .t6 {
            width: 100%;
            height: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .sponsor-logo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: block;
            margin: auto;
          }
          .sponsor-phone {
            width: 150px;
            height: 30px;
            border-radius: 36px;
            line-height: 30px;
            position: relative;
            margin: 10px 0;
          }
          .sponsor-shop {
            display: flex;
            background: #fff6f7;
            padding: 10px;
            justify-content: space-between;
            flex-wrap: wrap;

            span {
              width: 15px;
              height: 15px;
              display: inline-block;
              border-radius: 100%;
              background: linear-gradient(to right, #ffae00, #fc4a46);
              margin-top: 5px;
            }
          }
          .sponsor-shop-content {
            width: 60%;

            .font-small {
              margin: 2px 0;
            }
          }
          .sponsor-do-phone {
            width: 56px;
            height: 56px;
            padding: 8px;
            color: #fc4f43;
            text-align: center;
            border: 1px solid #fc4f43;
            border-radius: 6px;
          }
        }
        
      }

      .s2 {
        background: #e0e1e1;
        padding: 40px 15px 0 15px;
      }

      .s3 {
        display: flex;

        .share-box{
          width: 200px;
          min-height: 45px;
          border-radius: 5px;
          padding: 15px;
        }
        div {
          background: #fff;
        }
      }

      .share-bottom{
        width: 100%;
        height: 56px;
        background: url(/static/imgs/manage/editor/share-bottom.png);
        background-size: 100%;
      }

    }
    .content-foot {
      width: 100%;
      height: 20px;
      text-align: center;
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.4);
      font-size: 12px;
    }

    .phone-top {
      width: 100%;
      height: 47px;
      background: url(/static/imgs/manage/editor/phone-top.png);
    }

    .phone-footer {
      width: 100%;
      height: 59px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: url(/static/imgs/manage/editor/phone-footer.png);
    }

    img {
    }
  }

</style>
<style lang="scss" src="common/style/module/manage/new-setting.scss" scoped></style>