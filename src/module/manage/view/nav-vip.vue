<template>
  <div ref="scroll">
    <p class="main-title">购买成为会员</p>
    <div class="container">
      <div class="money-box">
        <div class="title-info">
          <ul>
            <li class="nav-list">
            <span>您当前的版本:</span>
            </li>
            <li class="nav-list version">
              <span>{{userLevel.text[replenish.vipType]}}</span>
            </li>
            <li class="nav-list">
              <span>使用截止时间:</span>
            </li>
            <li class="nav-list leftTime">
              <span>{{expireTime}}</span>
            </li>
          </ul>
          <p style="font-size: 12px;color: #A5A5A5;margin-top: 16px">服务条款：升级会员仅限于注册账号时选择的地区和机构使用，不得将其赠与、转让、借用或者以其他方式提供给第三方机构.</p>
        </div>

        <p class="money-box-line">
        <span></span>
        </p>
        
        <div class="main-box">
          <div class="icon-vip"></div>
          <div class="payInfo">
            <p class="payInfo-title">正在升级/开通会员服务</p>
            <div class="vipType pay-box">
              <p>付费方式：</p>
              <div :class="[isSelected ? 'active' : '', 'byMonth']" :style="buyType.style[orderLists[0].spec]" @click="changeVipType">
                <span class="topBox">{{orderLists[0].skuName}}</span>
                <span class="bottomBox" :style="buyType.color[orderLists[0].spec]">{{`${orderLists[0].mallPrice}元/${orderLists[0].spec}`}}</span>
              </div>
              <div :class="[isSelected2 ? 'active' : '', 'byHalfYear']" :style="buyType.style[orderLists[1].spec]" @click="changeVipType2">
                <span class="topBox">{{orderLists[1].skuName}}</span>
                <span class="bottomBox" :style="buyType.color[orderLists[1].spec]">{{`${orderLists[1].mallPrice}元/${orderLists[1].spec}`}}</span>
              </div>
              <div :class="[isSelected3 ? 'active' : '', 'byYear']" :style="buyType.style[orderLists[2].spec]" @click="changeVipType3">
                <span class="topBox">{{orderLists[2].skuName}}</span>
                <span class="bottomBox" :style="buyType.color[orderLists[2].spec]">{{`${orderLists[2].mallPrice}元/${orderLists[2].spec}`}}</span>
              </div>
            </div>
            <div class="payTime pay-box">
              <p>开通时长：</p>
              <input v-model="payTimeInput" style="width: 50px;height: 26px;margin-right: 14px" @input="howMuch" />
              <p>{{curUnit}}</p>
            </div>
            <div class="shouldPay pay-box">
              <p>应付价格：</p>
              <div>
                <p class="shouldPayText" style="font-size: 18px;color: #FC4A46">{{haveToPay}}元</p>
              </div>
              <!-- <div>
                <p v-show="isSelected3" class="shouldPayText" style="font-size: 18px;color: #FC4A46">3500元</p>
              </div>
              <div>
                <p v-show="isSelected2" class="shouldPayText" style="font-size: 18px;color: #FC4A46">2000元</p>
              </div> -->
              <p v-show="isSelected2" style="font-size: 14px;color: #8D8D8D;margin-left: 12px">(相当于333元/月)</p>
              <p v-show="isSelected3" style="font-size: 14px;color: #8D8D8D;margin-left: 12px">(相当于290元/月)</p>
            </div>
            <div class="originalPrice pay-box" style="margin-top: 22px">
              <p>商品原价：</p>
              <del v-show="isSelected" style="font-size: 14px;color: #5A5A5A">{{`${orderLists[0].spec}付${orderLists[0].price}元`}}</del>
              <del v-show="isSelected2" style="font-size: 14px;color: #5A5A5A">{{`${orderLists[1].spec}付${orderLists[1].price}元`}}</del>
              <del v-show="isSelected3" style="font-size: 14px;color: #5A5A5A">{{`${orderLists[2].spec}付${orderLists[2].price}元`}}</del>
            </div>
            <div class="peyMethod pay-box">
              <p>支付方式：</p>
              <div class="way-box">
                <ul>
                  <li @click="togglePayWay($event, 3, 0)" class="account-pay ">
                    <span class="y"></span><img src="/static/imgs/manage/vipIcon/moneyPay.png" alt="账户扣款" /></li>
                  <li @click="togglePayWay($event, 1, 1)" class="wchat-pay act">
                    <span class="y"></span><img src="/static/imgs/manage/vipIcon/aliPay.png" alt="支付宝支付" /></li>
                  <li @click="togglePayWay($event, 2, 2)" class="ali-pay ">
                    <span class="y"></span><img src="/static/imgs/manage/vipIcon/wxPay.png" alt="微信支付" /></li>
                  <li @click="togglePayWay($event, 4, 3)" class="net-pay ">
                    <span class="y"></span><img src="/static/imgs/manage/vipIcon/netPay.png" alt="网银/转账支付" /></li>
                </ul>
              </div>
            </div>
            <div class="isInsert">
              <p class="accountMoney">账户余额：{{replenish.coins}}元</p>
              <div class="takeMyMoney" @click="goRecharge">【去充值】</div>
            </div>
            <div class="permission pay-box">
              <p>权限说明：</p>
              <p>所有必火互动模块无限制使用，去页脚广告，无限制访问量、活动商品数量等。</p>
            </div>
            <p class="money-box-line">
              <span style="margin-left: -40px"></span>
            </p>
            <el-button type="danger" @click="recharge" style="margin-bottom: 20px">立即购买</el-button>
        </div>
      </div>
      </div>

    </div>
    <modal v-show="qrcodeModal.show" v-on:toggleModal="toggleQrcodeModal" class="qrcode-box">
      <div class="head">微信扫码支付</div>
      <div class="con">
        <div id="qrcode"></div>
      </div>
    </modal>
    <modal v-show="netRecharge.show" v-on:toggleModal="toggleNetRecharge" id="netRecharge">
      <p class="title">网银/转账支付</p>
      <div class="box">
        <div class="price">
          <span class="name">支付金额</span>
          <span class="val">¥{{haveToPay}}</span>
        </div>
        <div class="carno">
          <span class="name">银行电汇／转账</span>
          <table>
            <tr class="head">
              <td>户名</td>
              <td>开户行</td>
              <td>账号</td>
            </tr>
            <tr v-for="card in cardList" :key="card.id">
              <td>{{card.backAccount}}</td>
              <td>{{card.backName}}</td>
              <td class="carno-val">{{card.backNumber}}</td>
            </tr>
          </table>
          <div class="important-tell flexBox">
            <span class="">重要信息：</span>
            <p class="flex1">1、网银转账时填写备注信息：“您的会员号＋联系方式”；2、付款后拍照或截图发给客服；3、我们与您取得联系，确认付款状态；4、充值成功。</p>
          </div>
          <div class="sbt-box">
            <button type="button">已支付，联系客服</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import utils from 'src/lib/utils'
import Personal from 'src/server/personal'
import { Message, Loading } from 'element-ui'
import QRCode from 'src/lib/qrcode'
import { domainConfig } from 'src/lib/config-axios.js'
export default {
  data () {
    return {
      qrcodeModal: {
        show: false
      },
      payTimeInput: null,
      isSelected: false,
      isSelected2: false,
      isSelected3: false,
      netRecharge: {
        // 网银充值窗口
        show: false
      },
      haveToPay: '',
      timer: '',
      orderNo: '',
      rechargeParams: {
        payType: '1',
        price: 50000 // 单位分
      },
      selfCustomVal: '',
      orderLists: [], // 订单类型
      formSubmit: '/pi/bizorder/buyvip',
      token: localStorage.BHTOKEN,
      href: location.href,
      skuNo: null,
      buyType: {
        amount: {
          '月': '500元/月',
          '半年': '1000元/半年',
          '年': '3500元/年'
        },
        color: {
          '月': 'background: #FFC020;',
          '半年': 'background: #773CFF;',
          '年': 'background: #FF6C3E;'
        },
        style: {
          '月': 'border: 1px solid #FFC020;',
          '半年': 'border: 1px solid #773CFF;',
          '年': 'border: 1px solid #FF6C3E;'
        }
      },
      userLevel: {
        text: {
          '0': '非会员',
          '1': '免费体验版',
          '2': '月度会员',
          '3': '季度会员',
          '4': '年度会员'
        },
        icon: {
          '0': '',
          '1': '/static/imgs/manage/vipIcon/vip-1.png',
          '2': '/static/imgs/manage/vipIcon/vip-2.png',
          '3': '/static/imgs/manage/vipIcon/vip-3.png',
          '4': '/static/imgs/manage/vipIcon/vip-4.png'
        },
        color: {
          '0': 'background-color: #00B77E',
          '1': 'background-color: #39AF6F',
          '2': 'background-color: #FEB822',
          '3': 'background-color: #FF5D32',
          '4': 'background-color: #986FFF'
        },
        action: {
          '0': '升级',
          '1': '升级',
          '2': '续费',
          '3': '续费',
          '4': '续费'
        }
      },
      cardList: [],
      curUnit: null
    }
  },
  props: {
    replenish: {
      type: Object
    }
  },
  computed: {
    expireTime () {
      return utils.formatDate(new Date(this.replenish.expireTime))
    }
  },
  methods: {
    goRecharge () {
      this.$router.push({
        path: '/nav-replenish'
      })
    },
    howMuch () {
      if (this.isSelected3) {
        this.haveToPay = this.payTimeInput * 3500
        console.log('payTimeInput:' + this.payTimeInput)
        console.log('haveToPay:' + this.payTimeInput)
      }
      if (this.isSelected) {
        this.haveToPay = this.payTimeInput * 500
      }
      if (this.isSelected2) {
        this.haveToPay = this.payTimeInput * 2000
      }
      if (!this.isSelected && !this.isSelected2 && !this.isSelected3) {
        this.haveToPay = ''
      }
    },
    changeVipType () {
      this.isSelected = !this.isSelected
      this.isSelected2 = this.isSelected3 = false
      if (this.isSelected) {
        this.payTimeInput = 1
        this.haveToPay = 500
        this.skuNo = this.orderLists[0].skuNo
        this.curUnit = this.orderLists[0].spec
      } else {
        this.payTimeInput = this.haveToPay = ''
      }
    },
    changeVipType2 () {
      this.isSelected2 = !this.isSelected2
      this.isSelected = this.isSelected3 = false
      if (this.isSelected2) {
        this.payTimeInput = 1
        this.haveToPay = 2000
        this.skuNo = this.orderLists[1].skuNo
        this.curUnit = this.orderLists[1].spec
      } else {
        this.payTimeInput = this.haveToPay = ''
      }
    },
    changeVipType3 () {
      this.isSelected3 = !this.isSelected3
      this.isSelected = this.isSelected2 = false
      if (this.isSelected3) {
        this.payTimeInput = 1
        this.haveToPay = 3500
        this.skuNo = this.orderLists[2].skuNo
        this.curUnit = this.orderLists[2].spec
      } else {
        this.payTimeInput = this.haveToPay = ''
      }
    },
    toggleMoney (e, item, index, type) {
      let all = document.querySelectorAll('.money-box li')
      let target = index ? all[index] : all[all.length - 1]
      let act = document.querySelector('.money-box .act')
      if (item) {
        let price = item.limitPrice
        this.rechargeParams.price = parseInt(price) * 100
      }
      utils.addClass(target, 'act')
      utils.removeClass(act, 'act')
      if (type) {
        this.$refs.selfCustom.focus()
        this.rechargeParams.price = 0
      }
    },

    togglePayWay (e, type, index) {
      this.rechargeParams.payType = type + ''
      let target = document.querySelectorAll('.way-box li')[index]
      let act = document.querySelector('.way-box .act')
      utils.removeClass(act, 'act')
      utils.addClass(target, 'act')
    },

    toTop () {
      // let obj=this.$refs.scroll;
      // console.log(obj.scrollTop());
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      let timer = setInterval(() => {
        scrollTop -= 50
        document.documentElement.scrollTop = scrollTop
        document.body.scrollTop = scrollTop
        if (scrollTop <= 0) {
          clearInterval(timer)
        }
      }, 10)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },

    recharge () {
      if (this.rechargeParams.price === 0) {
        // 自定义金额
        let price = parseFloat(this.selfCustomVal)
        if (!price || price < 500) {
          Message({ type: 'error', message: '请输入有效金额' })
          return
        } else {
          this.rechargeParams.price = price * 100
        }
      }
      let params = {
        // methods: 'post',
        data: {
          payType: parseInt(this.rechargeParams.payType),
          count: parseFloat(this.payTimeInput),
          skuNo: this.skuNo
        }
      }
      console.log(params)
      if (this.rechargeParams.payType === '1') {
        // console.log(`${this.formSubmit}?payType=${this.rechargeParams.payType}&count=${this.payTimeInput}&returnUrl=/manage.html#/nav-center/order&skuNo=${this.skuNo}`)
        window.location.href = `${this.formSubmit}?payType=${this.rechargeParams.payType}&count=${this.payTimeInput}&skuNo=${this.skuNo}&returnUrl=/manage.html#/nav-center/order`
      } else {
        let loadingInstance = Loading.service({
          background: 'rgba(255,255,255,.6)',
          spinner: 'el-icon-loading'
        })
        Personal.buyVip(params).then((res) => {
          loadingInstance.close()
          if (!res) {
            return
          }
          if (!res.suc) {
            Message({ type: 'error', message: res.msg })
          } else {
            if (this.rechargeParams.payType === '2') {
              this.qrcodeModal.show = true
              document.querySelector('#qrcode').innerHTML = ''
              let x = res.rs
              this.orderNo = res.rs.orderId
              let qrcode = new QRCode('qrcode', {
                text: x,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
              })
              console.log(qrcode)
              // let count = 0
              // let the = this
              //  this.timer = setInterval(() => {
              //    count++
              //    Personal.rechargeCheck({
              //      orderNo: the.orderNo
              //    }).then(res => {
              //      // console.log(res);
              //      if (!res.suc) {
              //        Message({ type: 'error', message: res.msg })
              //      } else if (res.rs === '1') {
              //        clearInterval(the.timer)
              //        this.qrcodeModal.show = !this.qrcodeModal.show
              //        history.go(0)
              //      }
              //    })
              //    if (count >= 20) {
              //      clearInterval(the.timer)
              //      this.qrcodeModal.show = !this.qrcodeModal.show
              //    }
              //  }, 3000)
            } else if (this.rechargeParams.payType === '3') {
              Message({ type: 'success', message: res.rs })
            } else if (this.rechargeParams.payType === '4') {
              this.cardList = res.rs
              this.toggleNetRecharge()
            }
            // console.log(res);
            // {"suc":true,"msg":"成功","rs":{"code_url":"weixin://wxpay/bizpayurl?pr=dIBRaF2","orderId":"20180302161222262001"},"code":200}
          }
        })
      }
    },

    toggleQrcodeModal () {
      this.qrcodeModal.show = !this.qrcodeModal.show
      clearInterval(this.timer)
    },
    toggleNetRecharge () {
      this.netRecharge.show = !this.netRecharge.show
    }
  },
  mounted () {
    window.onscroll = function () {
      // console.log(document.documentElement.scrollTop);
    }
  },
  created () {
    // console.log(this.replenish);// 输出无效
    Personal.getVipList().then((res) => {
      if (res.suc) {
        this.orderLists = res.rs
        this.changeVipType()
      } else {
        Message({ type: 'error', message: res.msg })
      }
    })
    this.formSubmit = domainConfig.url + this.formSubmit
  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/vip.scss">

</style>