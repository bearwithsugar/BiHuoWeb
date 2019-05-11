<template>
  <div id="app" class="index">
    <main-page @onLogin="openLogin" @onRegist="openRegist" @toExperience="toExperience" @loginout="doExit"></main-page>
    <modal v-show="industry.show" v-on:toggleModal="toggleIndustry">
      <div class="industry">
        <p class="t">选择你所在的行业</p>
        <p class="sub-t">精准选择更方便您使用必火的工具哦！</p>
        <ul class="">
          <li v-for="(item,index) in industry.list" :key="'industry' + index" @click="choseIndustry($event,item.id)" :class="[index==0 ? 'act' : '', (index+1)%3==0 ? '' : 'm-r']">{{item.name}}</li>
        </ul>
        <div class="sbt-box">
          <button type="button" class="next" @click="industryYes">确定</button>
          <!-- <button type="button" class="see">随便看看</button> -->
        </div>
      </div>
    </modal>
    <modal :contentType="modal.content" v-show="modal.show" v-on:toggleModal="toggleModal">
      <ul slot="register" class="slot-register clear had-mid" v-show="modal.type.reg || modal.type.login || modal.type.reg2">
        <li class="level-1">
          <div class="left-title">
            <img class="wechat-logo" src="/static/imgs/index/wechat-logo.png" alt="loading" />
            <img class="wechat-logo-text" src="/static/imgs/index/wechat-logo-text.png" alt="loading" />
          </div>
          <div class="code-box">
            <!-- <img class="wechat-code" src="/static/imgs/index/wechat-code.png" alt="loading" /> -->
            <div class="wechatLogin" id="loginQrcode"></div>
            <div class="code-sweep">
              <img class="img1" src="/static/imgs/index/code-sweep.png" alt="loading" />
              <img class="img2" src="/static/imgs/index/code-sweep-text.png" alt="loading" />
            </div>
          </div>
        </li>
        <li class="level-1">
          <div class="right-title">
            <span :class="modal.type.reg||modal.type.reg2?'active':''" @click="toggleReg">注册</span>
            <span :class="modal.type.login?'active':''" @click="openLogin">登录</span>
          </div>
          <div class="register-nav">
            <ul v-show="modal.type.reg||modal.type.reg2">
              <li class="nav-list">
                <span :class="modal.type.reg ? 'active' : ''">1用户信息 -</span>
              </li>
              <li class="nav-list">
                <span :class="modal.type.reg2 ? 'active' : ''">2机构信息 -</span>
              </li>
              <li class="nav-list">
                <span>3注册成功</span>
              </li>
            </ul>
          </div>
          <div class="params-box reg" v-show="modal.type.reg">
            <ul class="inputs">
              <li class="userName"><input type="text" placeholder="请输入用户名" v-model="register.userName" :style="styleObject" @keyup.enter="doRegister" @focus="inputFocus($event)" @blur="inputBlur($event)" @input="registerKeyUp($event,4)" />
                <div class="nameAccept" v-show="nameInputRight"></div>
                <div class="nameWrong" v-show="nameInputWrong"></div>
              </li>
              <p class="warn">{{registerName.warn}}</p>
              <li class="name"><input type="text" placeholder="请输入手机号码" v-model="register.phone" :style="styleObject2" @keyup.enter="doRegister" @focus="inputFocus($event)" @blur="inputBlur3($event)" @input="registerKeyUp($event,1)" />
                <div class="phoneAccept" v-show="phoneInputRight"></div>
                <div class="phoneWrong" v-show="phoneInputWrong"></div>
              </li>
              <p class="warn">{{register.warn}}</p>
              <li class="code"><input type="text" placeholder="请输入验证码" v-model="register.code" ref="codeInput" @keyup.enter="doRegister" @focus="inputFocus($event)" @blur="inputBlur5($event)" @input="registerKeyUp($event,2)" />
                <button type="button" @click="GetCode(register)" class="code-btn">{{register.codeText}}</button>
              </li>
              <p class="warn">{{register.vCodeWarn}}</p>
              <li class="psd"><input type="password" placeholder="请设置6到20位之间的登录密码" v-model="register.psd" :style="styleObject3" @keyup.enter="doRegister" @focus="inputFocus($event)" @blur="inputBlur4($event)" @input="registerKeyUp($event,3)" />
                <div class="pswAccept" v-show="pswInputRight"></div>
                <div class="pswWrong" v-show="pswInputWrong"></div>
              </li>
              <p class="warn">{{register.pswWarn}}</p>
            </ul>
            <div class="register-button">
              <button type="button" class="next-button" @click="goStep2">下一步</button>
              <button type="button" class="submit-button">注册</button>
            </div>
            <div class="accept">
              <span class="checkbox" :class="register.agree?'act':''" @click="toggleAgreeReg">
                <i class="el-icon-check" style="color: #fff"></i>
              </span>我已阅读并接受
              <a href="#">注册协议</a>
            </div>
            <p class="warn">{{register.agreeWarn}}</p>
          </div>
          <div class="params-box reg2" v-show="modal.type.reg2">
            <ul class="inputs">
              <li class="industryName"><input type="text" placeholder="请输入机构名称" v-model="registerIndu.name" @keyup.enter="doRegister" :style="styleObject4" @focus="inputFocus($event)" @blur="inputBlur10($event)" @input="registerKeyUp($event,4)" />
                <div class="inNameAccept" v-show="inNameInputRight"></div>
              <div class="inNameWrong" v-show="inNameInputWrong"></div>
              </li>
              <p class="warn">{{registerIndu.nameWarn}}</p>
              <li class="industryAdr">
                <el-cascader :options="city" :props="cascaderCityConf"
              v-model="selectedAdr" class="cascader" @change="cascaderCityChange"
              style="width: 100%;margin-top: 15px" placeholder="请选择机构地址" @blur="inputBlur11">
              </el-cascader>
              </li>
              <p class="warn">{{registerIndu.addrWarn}}</p>
              <li class="industryType">
                <el-select  v-model="registerIndu.type" placeholder="请选择所属行业" style="width: 100%;margin-top: 15px;height: 45px" class="induType" @blur="inputBlur12">
                <el-option
                v-for="item in industry.list"
                :key="item.value"
                :label="item.name"
                :value="item.id">
                </el-option>
              </el-select>
              </li>
              <p class="warn">{{registerIndu.typeWarn}}</p>
            </ul>
            <div class="register-button">
              <button type="button" class="next-button" @click="goBack">上一步</button>
              <button type="button" class="submit-button2" @click="doRegister">注册</button>
            </div>
            
            
            
          </div>
          <div class="params-box login" v-show="modal.type.login">
            <ul class="inputs">
              <li class="user"><input type="text" placeholder="请输入注册手机号" v-model="login.phone" ref="loginInput" :style="styleObject2" @keyup.enter="doLogin" @focus="inputFocus($event)" @blur="inputBlur2($event)" @input="loginKeyUp($event,1)" />
                <div class="phoneAccept" v-show="phoneInputRight"></div>
                <div class="phoneWrong" v-show="phoneInputWrong"></div>
              </li>
              <p class="warn">{{login.warn}}</p>
              <li class="psd"><input type="password" placeholder="请输入登录密码" v-model="login.psd" @keyup.enter="doLogin" @focus="inputFocus($event)" @blur="inputBlur6($event)" @input="loginKeyUp($event,3)" /></li>
              <p class="warn">{{login.pswWarn}}</p>
            </ul>

            <button type="button" class="login-button" @click="doLogin">登录</button>
            <div class="forget-psd">
              <a @click="turnForget">忘记密码</a>
            </div>
            <div class="use-other">
              <div class="p">
                <span></span>
                <p>使用其他账号登录</p>
                <span></span>
              </div>
              <ul class="ways">
                <li class="qq"></li>
                <li class="vx"></li>
                <li class="weibo"></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <div slot="reset" class="slot-reset slot-register" v-show="modal.type.forget">
        <transition name="fade">
          <div class="send-code-suc" v-show="reset.sendSuc">验证码发送成功</div>
        </transition>
        <span class="title">忘记密码</span>
        <div class="params-box set">
          <ul class="inputs">
            <li class="name"><input type="text" placeholder="请输入手机号码" v-model="reset.phone" :style="styleObject2" @keyup.enter="doReset" @focus="inputFocus($event)" @blur="inputBlur7($event)" @input="forgetKeyUp($event,1)" />
              <div class="phoneAccept" v-show="phoneInputRight"></div>
              <div class="phoneWrong" v-show="phoneInputWrong"></div>
            </li>
            <p class="warn">{{register.warn}}</p>
            <li class="code"><input type="text" placeholder="请输入验证码" v-model="reset.code" @keyup.enter="doReset" @focus="inputFocus($event)" @blur="inputBlur8($event)" @input="forgetKeyUp($event,2)" />
              <button type="button" @click="GetCode(reset)" class="code-btn">{{reset.codeText}}</button>
            </li>
            <p class="warn">{{register.vCodeWarn}}</p>
            <li class="psd"><input type="password" placeholder="请设置6到20位之间的新密码" v-model="reset.psd" :style="styleObject3" @keyup.enter="doReset" @focus="inputFocus($event)" @blur="inputBlur9($event)" @input="forgetKeyUp($event,3)" />
              <div class="pswAccept" v-show="pswInputRight"></div>
              <div class="pswWrong" v-show="pswInputWrong"></div>
            </li>
            <p class="warn">{{register.pswWarn}}</p>
          </ul>
          <!-- <p class="warn">{{reset.warn}}</p> -->
          <button type="button" class="submit-button" @click="doReset">确定</button>
          <div class="turn">
            <a class="turn-login" @click="turnLogin">返回登录</a>
            <a @click="turnRegister">还没有账号?</a>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import CITY from 'src/lib/city.js'
import Server from 'src/server'
import utils from 'src/lib/utils'
import User from 'src/server/user.js'
import { Loading, Message } from 'element-ui'
import MainPage from './pages/main'
/* import WxLogin from 'static/js/wxLogin.js' */
export default {
  name: 'app',
  data () {
    return {
      selectedAdr: [],
      appid: null,
      redirect_uri: null,
      styleObject: {
        // 用户名的边框样式
        borderColor: ''
      },
      styleObject2: {
        // 手机号的边框样式
        borderColor: ''
      },
      styleObject3: {
        // 密码框的边框样式
        borderColor: ''
      },
      styleObject4: {
        borderColor: ''
      },
      city: CITY,
      cascaderCityConf: {
        // 级联筛选的字段配置
        value: 'name',
        label: 'name',
        children: 'sub'
      },
      modal: {
        show: false,
        content: 'register', // modal内容类型
        type: {
          reg: false,
          reg2: false,
          login: false,
          forget: false
        }
      },
      nameInputRight: false,
      nameInputWrong: false,
      phoneInputRight: false,
      phoneInputWrong: false,
      pswInputRight: false,
      pswInputWrong: false,
      inNameInputRight: false,
      inNameInputWrong: false,
      temp: 0, // 计数器
      industry: {
        show: false,
        list: [],
        id: 100027
      },
      register: {
        // 注册
        userName: '',
        phone: '',
        code: '',
        psd: '',
        warn: '',
        vCodeWarn: '',
        pswWarn: '',
        agreeWarn: '',
        codeText: '获取验证码',
        codeClick: true,
        agree: true
      },
      registerIndu: {
        // 注册机构信息
        name: '',
        addr: '',
        type: '',
        nameWarn: '',
        addrWarn: '',
        typeWarn: ''
      },
      registerName: {
        warn: ''
      },
      login: {
        phone: '',
        psd: '',
        warn: '',
        pswWarn: ''
      },
      reset: {
        phone: '',
        code: '',
        psd: '',
        warn: '',
        codeText: '获取验证码',
        codeClick: true,
        sendSuc: false
      }
    }
  },
  components: {
    MainPage,
    wx: {
      render (createElement) {
        return createElement('script', {
          attrs: {
            type: 'text/javascript',
            src: 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
          }
        })
      }
    }
  },
  methods: {
    cascaderCityChange (val) {
      // 城市级联选择
      if (!val) {
        val = val + ''
        this.selectedAdr = val.split(',')
      }
      console.log(this.selectedAdr)
    },
    getType () {
      // 获取行业列表信息
      Server.industry().then(res => {
        this.industry.list = res.rs
        this.industry.id = res.rs[0].id
      })
    },
    chooseType () {
      /*      this.modal.type = {
        reg2: false,

      } */
      let loadingInstance = Loading.service({
        background: 'rgba(255,255,255,.6)',
        spinner: 'el-icon-loading'
      })
      Server.industry()
        .then(res => {
          if (!res.suc) {
            Message({ type: 'error', message: '获取行业列表失败！' })
          } else {
            this.industry.list = res.rs
            this.industry.id = res.rs[0].id
            this.toggleModal()
            this.industry.show = true
          }
        })
        .catch(err => {
          console.log(err)
          Message({ type: 'error', message: '获取行业列表失败！' })
        })
        .finally(() => {
          loadingInstance.close()
        })
    },
    goBack () {
      this.modal.type.reg = true
      this.modal.type.reg2 = false
    },
    goStep2 () {
      // 注册页面点击下一步
      this.modal.type.reg = false
      this.modal.type.reg2 = true
    },
    qrcodeLogin () {
      console.log('qrcodeLogin: ' + this.appid)
    },
    openLogin () {
      this.clearWarn()
      this.clearInput()
      this.modal.show = true
      this.modal.content = 'register'
      this.modal.type = {
        reg: false,
        login: true,
        forget: false
      }
    },
    openRegist (phone) {
      this.clearWarn()
      this.clearInput()
      if (phone) {
        this.login.phone = phone
        this.register.phone = phone
      }
      this.modal.show = true
      this.modal.type = {
        reg: true,
        login: false,
        forget: false
      }
      this.getType()
    },
    // 体验
    toExperience (phone) {
      if (utils.checkPhone(phone)) {
        this.openRegist(phone)
      } else {
        this.$message.error('请输入正确的手机号！')
      }
    },

    openReset () {
      this.toggleModal()
      this.modal.content = 'reset'
      this.modal.type = {
        reg: false,
        login: false,
        forget: true
      }
    },

    toggleModal () {
      this.clearWarn()
      this.clearInput()
      this.modal.show = !this.modal.show
    },
    clearWarn () {
      // 重置警告信息
      this.registerName.warn = this.register.warn = this.login.warn = this.login.pswWarn = this.register.pswWarn = this.register.vCodeWarn = this.register.agreeWarn = this.registerIndu.nameWarn = this.registerIndu.typeWarn = this.registerIndu.addrWarn =
        ''
      this.nameInputRight = this.nameInputWrong = this.phoneInputRight = this.phoneInputWrong = this.pswInputRight = this.pswInputWrong = this.inNameInputRight = this.inNameInputWrong = false
    },
    clearInput () {
      // 清空输入信息
      this.register.userName = this.register.code = this.register.phone = this.register.psd = this.login.phone = this.login.psd = this.reset.code = this.reset.phone = this.reset.psd =
        ''
      this.register.agree = true
      this.temp = 0
      this.styleObject2.borderColor = this.styleObject.borderColor = this.styleObject3.borderColor = this.styleObject4.borderColor =
        ''
      this.selectedAdr = []
      this.registerIndu.type = ''
    },
    toggleIndustry () {
      this.toggleModal()
      this.industry.show = false
    },

    inputFocus (e) {
      let target = e.target.parentNode
      utils.addClass(target, 'focus')
    },
    inputBlur12 (e) {
      if (!this.registerIndu.type) {
        this.registerIndu.typeWarn = '请选择所属行业'
      } else {
        this.registerIndu.typeWarn = ''
      }
    },
    inputBlur11 (e) {
      if (!this.selectedAdr || this.selectedAdr === '') {
        this.registerIndu.addrWarn = '请选择机构地址'
      } else {
        this.registerIndu.addrWarn = ''
        console.log('this.selectedAdr:' + this.selectedAdr)
      }
    },
    inputBlur10 (e) {
      if (!this.registerIndu.name) {
        this.registerIndu.nameWarn = '请输入机构名称'
        this.styleObject4.borderColor = '#f56c6c'
        this.inNameInputRight = false
        this.inNameInputWrong = true
      } else {
        this.registerIndu.nameWarn = ''
        this.styleObject4.borderColor = '#67c23a'
        this.inNameInputRight = true
        this.inNameInputWrong = false
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur8 (e) {
      // 重置界面的验证码是否为空判断
      if (this.temp === 0) {
        this.register.vCodeWarn = '请先获取验证码'
      }
      if (this.reset.code === '') {
        this.register.vCodeWarn = '请输入验证码'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur9 (e) {
      // 重置界面的密码设置判断
      if (!utils.checkPsw(this.reset.psd)) {
        this.register.pswWarn = '请设置6到20位之间的登录密码'
        this.pswInputRight = false
        this.pswInputWrong = true
        this.styleObject3.borderColor = '#f56c6c'
      } else {
        this.pswInputRight = true
        this.pswInputWrong = false
        this.styleObject3.borderColor = '#67c23a'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur7 (e) {
      // 重置界面的手机号判断
      if (!utils.checkPhone(this.reset.phone)) {
        this.register.warn = '请输入正确的手机号'
        this.phoneInputRight = false
        this.phoneInputWrong = true
        this.styleObject2.borderColor = '#f56c6c'
      } else {
        this.phoneInputRight = true
        this.phoneInputWrong = false
        this.styleObject2.borderColor = '#67c23a'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur6 (e) {
      // 登录界面的密码是否为空
      if (this.login.psd === '') {
        this.login.pswWarn = '请输入登录密码'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur5 (e) {
      // 注册界面的验证码判断

      if (this.temp === 0) {
        this.register.vCodeWarn = '请先获取验证码'
      }

      if (this.register.code === '' && this.temp !== 0) {
        this.register.vCodeWarn = '请输入验证码'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur4 (e) {
      // 注册界面的密码设置判断
      if (!utils.checkPsw(this.register.psd)) {
        this.register.pswWarn = '请设置6到20位之间的登录密码'
        this.pswInputRight = false
        this.pswInputWrong = true
        this.styleObject3.borderColor = '#f56c6c'
      } else {
        this.pswInputRight = true
        this.pswInputWrong = false
        this.styleObject3.borderColor = '#67c23a'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur3 (e) {
      // 注册界面的手机号判断
      if (!utils.checkPhone(this.register.phone)) {
        this.register.warn = '请输入正确的手机号'
        this.phoneInputRight = false
        this.phoneInputWrong = true
        this.styleObject2.borderColor = '#f56c6c'
      } else {
        this.phoneInputRight = true
        this.phoneInputWrong = false
        this.styleObject2.borderColor = '#67c23a'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur2 (e) {
      // 登录界面的手机号判断
      if (!utils.checkPhone(this.login.phone)) {
        this.login.warn = '请输入正确的手机号'
        this.phoneInputRight = false
        this.phoneInputWrong = true
        this.styleObject2.borderColor = '#f56c6c'
      } else {
        this.phoneInputRight = true
        this.phoneInputWrong = false
        this.styleObject2.borderColor = '#67c23a'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },
    inputBlur (e) {
      // 注册界面的判断
      if (!utils.checkName(this.register.userName)) {
        this.registerName.warn = '请输入6到20位之间的用户名'
        this.nameInputRight = false
        this.nameInputWrong = true
        this.styleObject.borderColor = '#f56c6c'
      } else {
        this.nameInputRight = true
        this.nameInputWrong = false
        this.styleObject.borderColor = '#67c23a'
      }
      let target = e.target.parentNode
      utils.removeClass(target, 'focus')
    },

    toggleAgreeReg () {
      this.register.agree = !this.register.agree
    },

    toggleReg () {
      // 切换注册和登录
      if (this.modal.type.reg) {
        this.modal.type = {
          reg: true,
          login: false
        }
      } else {
        this.modal.type = {
          reg: true,
          login: false
        }
        this.clearWarn()
        this.clearInput()
      }
    },

    choseIndustry (e, id) {
      let target = e.target
      let act = document.querySelector('.industry ul li.act')
      utils.removeClass(act, 'act')
      utils.addClass(target, 'act')
      this.industry.id = id
      console.log('choseIndustry:' + this.industry.id)
    },

    industryYes () {
      this.toggleModal()
      this.industry.show = false
      this.modal.type.reg2 = true
      this.modal.type.login = false
    },

    doRegister () {
      let params = {
        userName: this.register.userName,
        phone: this.register.phone,
        password: this.register.psd,
        vCode: this.register.code,
        industry: this.registerIndu.type,
        brandName: this.registerIndu.name,
        province: this.selectedAdr[0],
        city: this.selectedAdr[1],
        area: this.selectedAdr[2]
      }
      if (!this.register.agree) {
        this.register.agreeWarn = '请先接受相关协议'
        return
      }
      if (!utils.checkName(this.register.userName) || !this.register.userName) {
        this.registerName.warn = '请输入6到20位之间的用户名'
        this.nameInputWrong = true
        this.nameInputRight = false
        this.styleObject.borderColor = '#f56c6c'
        return
      }
      if (!utils.checkPhone(this.register.phone)) {
        this.register.warn = '请输入正确的手机号'
        this.phoneInputWrong = true
        this.phoneInputRight = false
        this.styleObject2.borderColor = '#f56c6c'
        return
      }
      if (this.temp === 0 && this.register.codeClick) {
        this.register.vCodeWarn = '请先获取验证码'
        return
      }
      if (!this.register.code) {
        this.register.vCodeWarn = '请输入验证码'
        return
      }
      if (!utils.checkPsw(this.register.psd)) {
        this.register.pswWarn = '请设置6到20位之间的登录密码'
        this.pswInputWrong = true
        this.pswInputRight = false
        this.styleObject3.borderColor = '#f56c6c'
        return
      }
      if (!this.registerIndu.name) {
        this.registerIndu.nameWarn = '请输入机构名称'
        this.styleObject4.borderColor = '#f56c6c'
        this.inNameInputRight = false
        this.inNameInputWrong = true
        return
      }
      if (!this.registerIndu.type || this.selectedAdr === '') {
        return
      }
      let loadingInstance = Loading.service({
        background: 'rgba(255,255,255,.6)',
        spinner: 'el-icon-loading'
      })
      Server.register(params)
        .then(res => {
          if (!res.suc) {
            this.register.warn = res.msg
          } else {
            Message({ type: 'success', message: '注册成功，正在跳转！' })
            Server.login({
              phone: params.phone,
              password: params.password
            }).then(res => {
              if (!res.suc) {
                this.login.warn = res.msg
              } else {
                // 登录成功操作。。。
                localStorage.BHTOKEN = res.rs.accessToken
                location.href = 'manage.html'
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
          Message({ type: 'error', message: '注册失败，请稍后重试!' })
        })
        .finally(() => {
          loadingInstance.close()
        })
    },

    // register
    registerKeyUp (e, type) {
      let val = e.target.value
      if (type === 1) {
        if (utils.checkPhone(val)) this.register.warn = ''
      } else if (type === 2) {
        if (val) this.register.vCodeWarn = ''
      } else if (type === 4) {
        if (utils.checkName(val)) this.registerName.warn = ''
      } else if (type === 3) {
        if (utils.checkPsw(val)) this.register.pswWarn = ''
      }
    },
    // 退出登录
    doExit () {
      let loadingInstance = Loading.service({
        background: 'rgba(255,255,255,.6)',
        spinner: 'el-icon-loading'
      })
      Server.outLogin({})
        .then(res => {
          if (!res.suc) {
            Message({ type: 'error', message: '退出失败！' })
          } else {
            localStorage.BHTOKEN = ''
            Message({ type: 'success', message: '退出成功！' })
            location.reload(true)
          }
        })
        .catch(err => {
          console.log(err)
          Message({ type: 'error', message: '退出失败！' })
        })
        .finally(() => {
          loadingInstance.close()
        })
    },

    // login
    doLogin () {
      let params = {
        phone: this.login.phone,
        password: this.login.psd
      }
      if (!utils.checkPhone(params.phone) || !params.phone) {
        this.login.warn = '请输入正确的手机号'
        this.phoneInputWrong = true
        this.phoneInputRight = false
        this.styleObject2.borderColor = '#f56c6c'
        return
      } else if (!params.password) {
        this.login.pswWarn = '请输入登录密码'
        return
      }
      let loadingInstance = Loading.service({
        background: 'rgba(255,255,255,.6)',
        spinner: 'el-icon-loading'
      })
      Server.login(params)
        .then(res => {
          if (!res.suc) {
            this.login.warn = res.msg
          } else {
            // 登录成功操作。。。
            localStorage.BHTOKEN = res.rs.accessToken
            Message({ type: 'success', message: '成功登录！' })
            location.href = 'manage.html'
          }
        })
        .catch(err => {
          console.log(err)
          Message({ type: 'error', message: '登录失败,请稍后再试！' })
        })
        .finally(() => {
          loadingInstance.close()
        })
    },

    loginKeyUp (e, type) {
      let val = e.target.value
      if (type === 1) {
        if (utils.checkPhone(val)) this.login.warn = ''
      } else if (type === 2) {
        if (val) {
          this.login.warn = ''
        }
      } else if (type === 3) {
        if (val) {
          this.login.pswWarn = ''
        }
      }
    },

    // reset  // 后面全大写就是局部公共 函数
    GetCode (obj) {
      if (!obj.codeClick) {
        return
      }

      /* this.$refs.codeInput.focus() */
      let params = {
        phone: obj.phone
      }
      console.log(params.phone)
      if (!params.phone) {
        this.register.warn = '请先输入手机号'
        return
      }
      if (!utils.checkPhone(params.phone)) {
        this.register.warn = '请输入正确的手机号'
        return
      }

      let loadingInstance = Loading.service()
      let fun = res => {
        obj.codeText = '60s'
        obj.codeClick = false
        let count = 60
        this.temp++
        let time = setInterval(() => {
          count--
          if (count <= 0) {
            obj.codeClick = true
            obj.codeText = '获取验证码'
            clearInterval(time)
          } else {
            obj.codeText = count + 's'
          }
        }, 1000)
        loadingInstance.close()
        if (res.suc) {
          obj.code = ''
          obj.warn = ''
          this.phoneInputRight = true
          this.phoneInputWrong = false
          this.styleObject2.borderColor = '#67c23a'
          this.register.vCodeWarn = ''
          Message({ type: 'success', message: '短信发送成功，请注意查收！' })
        } else {
          Message({ type: 'error', message: '短信发送失败！' })
        }
      }
      if (obj === this.reset) {
        Server.forgetGetCode(params)
          .then(res => {
            setTimeout(() => {
              this.reset.sendSuc = false
            }, 2000)
            if (res.suc) {
              // 顶部红色
              /* obj.code = ''
            obj.vCodeWarn = '' */
              this.reset.sendSuc = true
              fun(res, obj)
            } else {
              this.phoneInputRight = false
              this.phoneInputWrong = true
              this.register.warn = '该用户不存在'
              this.styleObject2.borderColor = '#f56c6c'
              loadingInstance.close()
            }
          })
          .catch(err => {
            console.log(err)
            Message({ type: 'error', message: '获取验证码失败' })
          })
          .finally(() => {
            loadingInstance.close()
          })
      } else if (obj === this.register) {
        Server.regGetCode(params)
          .then(res => {
            if (res.suc) {
              fun(res, obj)
            } else {
              this.phoneInputRight = false
              this.phoneInputWrong = true
              obj.warn = '该手机号已注册'
              this.styleObject2.borderColor = '#f56c6c'
              loadingInstance.close()
            }
          })
          .catch(err => {
            console.log(err)
            Message({ type: 'error', message: '获取验证码失败' })
          })
          .finally(() => {
            loadingInstance.close()
          })
      }
    },

    forgetKeyUp (e, type) {
      let val = e.target.value
      if (type === 1) {
        if (utils.checkPhone(val)) this.register.warn = ''
      } else if (type === 2) {
        if (val) this.register.vCodeWarn = ''
      } else if (type === 4) {
        if (utils.checkName(val)) this.registerName.warn = ''
      } else if (type === 3) {
        if (utils.checkPsw(val)) this.register.pswWarn = ''
      }
    },

    doReset () {
      let params = {
        phone: this.reset.phone,
        password: this.reset.psd,
        vCode: this.reset.code
      }
      /* if (!utils.checkName(params.userName)) {
        this.registerName.warn = '请输入6到20位之间的用户名'
        this.nameInputWrong = true
        this.nameInputRight = false
        this.styleObject2.borderColor = '#f56c6c'
        return
      } */
      if (!utils.checkPhone(params.phone)) {
        this.register.warn = '请输入正确的手机号'
        this.phoneInputWrong = true
        this.phoneInputRight = false
        this.styleObject2.borderColor = '#f56c6c'
        return
      }
      if (this.temp === 0 && this.reset.codeClick) {
        this.register.vCodeWarn = '请先获取验证码'
        return
      }
      if (!params.vCode) {
        this.register.vCodeWarn = '请输入验证码'
        return
      }
      if (!utils.checkPsw(params.password)) {
        this.register.pswWarn = '请设置6到20位之间的登录密码'
        this.pswInputWrong = true
        this.pswInputRight = false
        this.styleObject3.borderColor = '#f56c6c'
        return
      }
      let loadingInstance = Loading.service({
        background: 'rgba(255,255,255,.6)',
        spinner: 'el-icon-loading'
      })
      Server.forget(params)
        .then(res => {
          if (!res.suc) {
            this.reset.warn = res.msg
          } else {
            Message({ type: 'success', message: '修改成功,正在跳转！' })
            Server.login({
              phone: params.phone,
              password: params.password
            }).then(res => {
              if (!res.suc) {
                this.login.warn = res.msg
              } else {
                // 登录成功操作。。。
                localStorage.BHTOKEN = res.rs.accessToken
                location.href = 'manage.html'
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          loadingInstance.close()
        })
    },

    turnLogin () {
      this.clearWarn()
      this.clearInput()
      this.modal.content = 'register'
      this.modal.type = {
        reg: false,
        login: true,
        forget: false
      }
    },
    turnRegister () {
      this.clearWarn()
      this.clearInput()
      this.modal.content = 'register'
      this.modal.type = {
        reg: true,
        login: false,
        forget: false
      }
    },
    turnForget () {
      this.clearWarn()
      this.clearInput()
      this.modal.content = 'reset'
      this.modal.type = {
        reg: false,
        login: false,
        forget: true
      }
    },

    edit () {
      // location.href='detail.html'
      location.href = 'edit2.html'
    },

    template (n) {
      location.href = 'template.html?type=1'
    },

    doOut () {
      let loadingInstance = Loading.service({
        background: 'rgba(255,255,255,.6)',
        spinner: 'el-icon-loading'
      })
      Server.outLogin({})
        .then(res => {
          loadingInstance.close()
          if (!res.suc) {
            Message({ type: 'error', message: '退出失败！' })
          } else {
            localStorage.BHTOKEN = ''
            Message({ type: 'success', message: '退出成功！' })
            location.reload(true)
          }
        })
        .catch(err => {
          console.log(err)
          Message({ type: 'error', message: '退出失败！' })
        })
        .finally(() => {
          loadingInstance.close()
        })
    }
  },
  mounted () {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
    document.body.appendChild(s)
    s.onload = function () {
      new WxLogin({
        self_redirect: false,
        id: 'loginQrcode',
        appid: 'wx78a78e73225c7fbf',
        scope: 'snsapi_login',
        redirect_uri: 'https://www.okbihuo.com/pi/callback/auth/wx',
        state: encodeURI('/manage.html'),
        style: 'black',
        href: encodeURIComponent('https://www.okbihuo.com/static/css/wxqrcode.css')
      })
    }
    User.wxLogin().then(res => {
      this.appid = res.rs.appid
      this.redirect_uri = res.rs.redirect_uri
      if (res.rs.appid && res.rs.redirect_uri) {
        s.onload = function () {
          new WxLogin({
            self_redirect: false,
            id: 'loginQrcode',
            appid: res.rs.appid,
            scope: 'snsapi_login',
            redirect_uri: res.rs.redirect_uri,
            state: encodeURI('/manage.html'),
            style: 'black',
            href: encodeURIComponent('https://www.okbihuo.com/static/css/wxqrcode.css')
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  created () {
    if (!localStorage.BHTOKEN) {
      this.turnLogin()
    }
  }
}
</script>

<style lang="scss" scoped src="common/style/module/index.scss"></style>
<style lang="scss">
#loginQrcode iframe {
  width: 220px !important;
  height: 260px !important;
}
.el-input__inner:focus {
  border-color: #e94c46;
}
.el-input__inner {
  padding-left: 28px;
}
.el-cascader__label {
  padding-left: 28px;
}
.el-icon-arrow-down {
  color: #c0c4cc;
}
.el-select {
  .is-focus {
    .el-input__inner {
      border-color: #fc4a46;
    }
  }
  .el-input__inner {
    /* border-color: #FC4A46 */
  }
  .el-input__inner:focus {
    border-color: #fc4a46;
  }
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #fc4a46;
}
.el-select-dropdown__item.selected {
  color: #fc4a46;
}
</style>
<style lang="scss" scoped>
#app {
  min-width: 1200px;
  overflow: auto;
}

.wechat-logo {
  width: 32px;
  height: 24px;
}
.wechat-logo-text {
  width: 108px;
  height: 17px;
}

.wechat-code {
  width: 100%;
  height: 100%;
}
</style>

