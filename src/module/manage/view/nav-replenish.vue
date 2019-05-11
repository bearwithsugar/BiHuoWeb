<template>
  <div ref="scroll">
    <p class="main-title">充值中心</p>
    <div class="container">
      <div class="money-box">
        <p class="title">充值金额</p>
        <ul class="ul-box">
        	<li @click="toggleMoney($event,item,index)" v-for="(item,index) in orderLists.slice(0,2)" :key="'moneyItem' + index" :class="index==0?'act':''">
            <span class="pay">{{item.limitPrice}}</span>
            <span class="unit">元</span>
            <span class="red" v-if="!index==0">立送{{item.promotionPrice}}元</span>
          </li>
          <!--<li class="act" @click="toggleMoney($event,0)" data-price=500>
            <span class="pay">500</span>
            <span class="unit">元</span>
            <span class="red"></span>
          </li>
          <li @click="toggleMoney($event,1)" data-price=1000>
            <span class="pay">1000</span>
            <span class="unit">元</span>
            <span class="red">立送60元</span>
          </li>-->
        </ul>
        <ul class="ul-box">
          <!--<li @click="toggleMoney($event,2)" data-price=300>
            <span class="pay">3000</span>
            <span class="unit">元</span>
            <span class="red">立送240元</span>
          </li>
          <li @click="toggleMoney($event,3)" data-price=5000>
            <span class="pay">5000</span>
            <span class="unit">元</span>
            <span class="red">立送500元</span>
          </li>-->
          <li @click="toggleMoney($event,item,index+2)"  v-for="(item,index) in orderLists.slice(2)" :key="'gainmoney' + index">
            <span class="pay">{{item.limitPrice}}</span>
            <span class="unit">元</span>
            <span class="red">立送{{item.promotionPrice}}元</span>
          </li>
          <li @click="toggleMoney($event,'','',1)" class="custom">
            <span class="unit">自定义金额：</span><input type="text" placeholder="最低充值为500元" ref="selfCustom" v-model="selfCustomVal" /></li>
        </ul>
      </div>
      <p class="money-box-line">
        <span></span>
      </p>
      <div class="way-box">
        <p class="title">选择支付方式</p>
        <ul>
          <li @click="togglePayWay($event,0)" class="wchat-pay act">
            <span class="y"></span><img src="/static/imgs/manage/pay/ali-pay.png" alt="" /></li>
          <li @click="togglePayWay($event,1)" class="ali-pay ">
            <span class="y"></span><img src="/static/imgs/manage/pay/wx-pay.png" alt="" /></li>
          <li @click="togglePayWay($event,2)" class="net-pay ">
            <span class="y"></span>网银/转账支付</li>
        </ul>
      </div>
      <p class="way-box-line">
        <span></span>
      </p>
      <div class="sbt-box">
        <span class="total">合计：</span>
        <span class="total-val">{{`￥${sumAmount}`}}</span>
        <span class="cur-val">当前余额：
          <span>{{replenish.coins}}</span> 元</span>
        <button type="button" @click="recharge" v-show="rechargeParams.payType!=1">立即支付</button>
        <form :action="formSubmit">
        	<input type='hidden' name="payType" value="1"/>
        	<input type='hidden' name="amount" :value="rechargeParams.price"/>
        	<input type='hidden' name="pi-businesstkn" :value="token"/>
        	<input type='hidden' name="returnUrl" :value="href"/>
        	<button type="submit" v-show="rechargeParams.payType==1">立即支付</button>
        </form>
        
      </div>
      <div class="help">
        <div class="help-con">
          <p class="t">充值须知</p>
          <ul>
            <li>
              <span class="cirle"></span>
              <span>账户充值余额可用于必火互动平台所有项目消费使用。</span>
            </li>
            <li>
              <span class="cirle"></span>账户充值金额将永久保留在当前充值账户，如无特殊情况，不能转出或提现。</li>
            <li>
              <span class="cirle"></span>无论是版本赠送或者是充值余额，用户均须遵守全部中国法律、法规和规章，不得发布非法、歧视、恐吓、诽谤、色情、淫秽、赌博等违反中国法律的内容，不得上传或者发布垃圾邮件、计算机病毒程序或者恶意代码等，否则必火互动平台将有权立即终止服务，并不予返还账号充值费用，详细条款请
              <a href="#">点击这里</a>进行阅读</li>
          </ul>
        </div>
      </div>


    </div>
    <modal v-show="qrcodeModal.show" v-on:toggleModal="toggleQrcodeModal" class="qrcode-box">
      <div class="head">微信扫码支付</div>
      <div class="con">
        <div id="qrcode"></div>
      </div>
      <router-link to="/nav-center/order">
        <el-button @click="toggleQrcodeModal" type="danger" style="margin-bottom:10px;">完成支付</el-button>
      </router-link>
    </modal>
    <modal v-show="netRecharge.show" v-on:toggleModal="toggleNetRecharge" id="netRecharge">
      <p class="title">网银/转账支付</p>
      <div class="box">
        <div class="price">
          <span class="name">支付金额</span>
          <span class="val">¥{{rechargeParams.price}}</span>
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
      netRecharge: {
        // 网银充值窗口
        show: false
      },
      timer: '',
      orderNo: '',
      rechargeParams: {
        payType: '1',
        price: 500 // 单位分
      },
      selfCustomVal: '',
      orderLists: [], // 订单类型
      formSubmit: '/pi/bizorder/recharge',
      token: localStorage.BHTOKEN,
      href: location.href,
      cardList: []
    }
  },
  computed: {
    sumAmount () {
      return this.rechargeParams.price
    }
  },
  watch: {
    selfCustomVal (val) {
      if (val > 0) {
        this.rechargeParams.price = parseFloat(val)
      }
    }
  },
  props: {
    replenish: {
      type: Object
    }
  },
  methods: {
    toggleMoney (e, item, index, type) {
      let all = document.querySelectorAll('.money-box li')
      let target = (index !== '') ? all[index] : all[all.length - 1]
      let act = document.querySelector('.money-box .act')
      if (item) {
        let price = item.limitPrice
        this.rechargeParams.price = parseInt(price)
      }
      utils.addClass(target, 'act')
      utils.removeClass(act, 'act')
      if (type) {
        this.$refs.selfCustom.focus()
        this.rechargeParams.price = 0
      }
//    let target = document.querySelectorAll('.money-box li')[index]
//    let act = document.querySelector('.money-box .act')
//    let price = target.getAttribute('data-price')
//    this.rechargeParams.price = parseInt(price) * 100
//    utils.addClass(target, 'act')
//    utils.removeClass(act, 'act')
//    if (type) {
//      this.$refs.selfCustom.focus()
//      this.rechargeParams.price = 0
//    }
      console.log(this.rechargeParams.price)
    },

    togglePayWay (e, index) {
      this.rechargeParams.payType = index + 1 + ''
      let target = document.querySelectorAll('.way-box li')[index]
      let act = document.querySelector('.way-box .act')
      utils.addClass(target, 'act')
      utils.removeClass(act, 'act')
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
          this.rechargeParams.price = price
        }
      }
      let params = {
        // methods: 'post',
        data: {
          payType: this.rechargeParams.payType,
          bankCode: '',
          amount: this.rechargeParams.price,
          // jump: '0', // 1跳转 0返回数据
          returnUrl: location.href
        }
      }
//    let params = {
//    	payType: this.rechargeParams.payType,
//	      bankCode: '',
//	      amount: this.rechargeParams.price,
//    }
      if (this.rechargeParams.payType === '3') {
        params = {
          data: {
            payType: '4',
            bankCode: '',
            amount: this.rechargeParams.price,
            returnUrl: location.href
          }
        }
        Personal.recharge(params).then((res) => {
          if (!res) {
            return
          }
          if (!res.suc) {
            Message({ type: 'error', message: res.msg })
          } else {
            this.cardList = res.rs
          }
        })
        this.toggleNetRecharge()
        return
      }
      let loadingInstance = Loading.service({
        background: 'rgba(255,255,255,.6)',
        spinner: 'el-icon-loading'
      })
      Personal.recharge(params).then((res) => {
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
          } else if (this.rechargeParams.payType === '1') {
            // 手动关闭窗口了咋整？当前打开就好了
            // this.orderNo = res.rs.orderId
            console.log(res.rs)
            // location.href = res.rs
            // window.open(res.rs.code_url);
            //            let count=0;
            //            let the=this;
            //            this.timer=setInterval(()=> {
            //              count++;
            //              Personal.rechargeCheck({},the.orderNo).then((res)=> {
            //                if(!res.suc) {
            //                  Message({type: 'error',message: res.msg});
            //                }else if(res.rs=='1') {
            //                  clearInterval(the.timer);
            //                  history.go(0);
            //                }
            //              });
            //              if(count>=600){
            //                clearInterval(the.timer);
            //              }
            //            },3000);
          }
          // console.log(res);
          // {"suc":true,"msg":"成功","rs":{"code_url":"weixin://wxpay/bizpayurl?pr=dIBRaF2","orderId":"20180302161222262001"},"code":200}
        }
      })
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
    this.$emit('leftAct', 4)
    // console.log(this.replenish); // 输出无效
    Personal.getOrderSKU().then((res) => {
      if (res.suc) {
        this.orderLists = res.rs
      } else {
        Message({ type: 'error', message: res.msg })
      }
    })
    this.formSubmit = domainConfig.url + this.formSubmit
  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/replenish.scss">
</style>