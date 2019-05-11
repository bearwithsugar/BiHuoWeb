<template>
  <div class="box">
      <div class="add1">
            <img :src="userImgUrl" style="width: 90px;height: 90px;margin-top: 10px;margin-left: 10px">
            <input type="file" @change="fileUserImg">
      </div>
    <div class="detail-box user-manage-wrap">
      <el-form :model="userInfo" :rules="rules" label-position="left">
        <el-form-item label="用户名称" :label-width="labelWidth" prop="name">
          <el-col :span="16">
            <el-input :class="{'editState': editState.nameState == false}" v-model="userInfo.userName" :placeholder="editState.nameState ? '未填写' : '最多20字'" :disabled="editState.nameState"></el-input>
            <el-button v-show="editState.nameState" type="text" @click.prevent="editState.nameState = false">修改</el-button>
            <el-button v-show="!editState.nameState" size="mini" @click.prevent="edituserName">确定</el-button>
          </el-col>
          <el-col :span="8">
            <div class="el-form_item-tip">用户名称将用于发送分享时使用</div>
          </el-col>
        </el-form-item>
      </el-form>
      <el-form :model="userInfo" :rules="rules" label-position="left">
        <el-form-item label="绑定手机" :label-width="labelWidth" prop="phone">
          <el-col :span="16">

            <el-input :class="{'editState': editState.phoneState == false}" v-model="userPhone" :placeholder="editState.phoneState ? '未填写' : '请输入手机号码'" :disabled="editState.phoneState"></el-input>
            <el-button v-show="editState.phoneState" type="text" @click.prevent="phoneChange">更换手机号</el-button>

            <el-button v-show="!editState.phoneState" size="mini" @click.prevent="edituserPhone">确定</el-button>
          </el-col>
          <el-col :span="8">
            <div class="el-form_item-tip">账户更安全</div>
          </el-col>
        </el-form-item>
      </el-form>
      <div v-show="changePhone">
        <!-- <el-form-item label="手机验证" prop="phone">
              <el-input v-model="formData.vcode" placeholder="输入验证码">
        <template slot="append">
          <el-button @click="getPhoneCode" :disabled="countdownState">{{countdownState ? countdownCounter + 's' : '获取验证码'}}</el-button>
        </template>
              </el-input>
            </el-form-item> -->
      </div>
      <el-form :model="userInfo" label-position="left">
        <el-form-item label="身份标签" :label-width="labelWidth" prop="phone">
          <el-col :span="16">
            <div class="item-val">
              <div class="button-box">
                <span class="free" :style="userLevel.color[vipInfo.vipType || 0]" >
                  <img v-if="vipInfo.vipType" :src="userLevel.icon[vipInfo.vipType || 0]" style="width: 16px;height: 16px" class="icon-level" />
                  <span>{{ userLevel.text[vipInfo.vipType || 0] }}</span>
                </span>
                <router-link to="/nav-vip">
                  <el-button type="danger" plain size="medium" class="upgrade">{{userLevel.action[vipInfo.vipType || 0]}}</el-button>
                </router-link>
              </div>
              <p class="use-time">有效期：{{userInfo.startTime}} 至 {{userInfo.expireTime}}</p>
              <p class="warn-text" v-if="vipInfo.validDescription">{{vipInfo.validDescription}}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="el-form_item-tip">升级付费会员享更多特权</div>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="更换手机" :visible.sync="phoneChangeShow">
      <div>
        <el-form size="medium" label-width="90px">
          <el-form-item label="手机绑定：">
            <el-input style="width: 258px" v-model="userInfo.phone" placeholder="请输入新绑定的手机号"
             @change="phoneCheck" :disabled="phoneState.oldPhoneShow"></el-input>
            <p style="color: #FC4A46" v-show="phoneState.phoneFlag">请填写正确的手机格式</p>
          </el-form-item>

          <el-form-item>
            <el-input style="width: 258px" placeholder="输入验证码" 
            :class="{doCode: phoneState.codeClick}"
            v-model="phoneState.codeVal">
              <template slot="append">
                <p @click="doCode">{{phoneState.codeText}}</p>
              </template>
            </el-input>
            <p style="color: #FC4A46" v-show="phoneState.codeFlag">验证码错误</p>
          </el-form-item>

          <el-form-item style="padding-top: 60px">
            <el-button style="width: 120px" @click="phoneChangeShow = false">取消</el-button>
            <el-button style="width: 120px" @click="codeCheck">{{phoneState.nextText}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import User from 'src/server/user.js'

import fileUpload from 'src/server/fileUpload'

import VDialog from 'src/components/dialog'
import Utils from 'src/lib/utils.js'
import { domainConfig } from 'src/lib/config-axios.js'

import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
export default {
  components: {
    VDialog
  },
  data () {
    return {
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
      vipInfo: {},
      userImgUrl: null,
      changePhone: false,
      userPhone: '',
      labelWidth: '100px', // label-width宽度
      phoneChangeShow: false,
      editState: {
        // true为显示状态，false为编辑状态
        nameState: true,
        phoneState: true
      },
      user: {
        userName: '悟空编程', // 名称
        phone: '' // 电话
      },
      phoneState: {
        oldPhoneShow: false,
        codeText: '发送验证码',
        nextText: '下一步',
        phoneFlag: false,
        phoneDisabled: false,  // 手机号是否可写
        codeFlag: false,       // 验证码是否输入正确
        codeVal: '',          // 验证码的值
        codeClick: false,     // 验证码是否点击
        codeTime: null

      },
      rules: {
        // 表单验证规则
        name: [
          {
            type: 'string',
            min: 0,
            max: 20,
            message: '最长20个汉字',
            trigger: 'change'
          }
        ],
        phone: [
          {
            pattern: /^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/,
            message: '请填写正确的手机格式',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo'
    })
  },
  mounted () {
    User.self().then(res => {
      if (!res.rs.headUrl) {
        this.userImgUrl = '/static/imgs/manage/index/add-head-img.png'
        console.log(this.userImgUrl)
      } else if (res.rs.headUrl) {
        this.userImgUrl = res.rs.headUrl
        console.log(this.userImgUrl)
      }
      if (!res.suc) {
        this.$message({ type: 'error', message: '获取信息失败' })
        location.href = 'index.html'
      } else {
        this.vipInfo = res.rs.userVip
        this.userInfo.startTime = Utils.formatDate(new Date(this.userInfo.userVip.startTime))
        this.userInfo.expireTime = Utils.formatDate(new Date(this.userInfo.userVip.expireTime))
      }
    })

    User.self().then(res => {
      console.log(res)
      console.log(res.rs.userName)
      this.userPhone = this.userInfo.phone
      if (!this.userInfo.phone) {
        this.phoneState.nextText = '确认保存'
      }
      this.$store.commit('user/UPDATE_USERINFO', res.rs)
    })
  },
  methods: {
    changePhoneNuber () {
      this.changePhone = true
    },
    fileUserImg (e) {
      let file = e.target.files[0]
      let formData = new FormData()
      formData.append('imgType', 'user_icon')
      formData.append('file', file)
      console.log({ imgType: file.type, file: file })
      let params = {
        data: formData,
        methods: 'post',
        baseURL: domainConfig.url
      }
      fileUpload.imgUpload(params).then(res => {
        console.log(res)
        if (res.suc) {
          this.userImgUrl = res.rs
          let temp = {
            headUrl: this.userImgUrl
          }
          User.update({
            data: temp
          })
          console.log(res.rs)
        } else {
          console.log(res.msg)
        }
      })
    },
    edituserName () {
      // 用户名字的修改
      this.editState.nameState = true
      // 执行修改的响应api操作
      User.update({
        data: {
          userName: this.userInfo.userName
        }
      }).then(res => {
        if (res.suc) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('user/UPDATE_USERINFO', {
            userName: this.userInfo.userName
          })
        }
      })
    },
    phoneCheck () {
      console.log(this.userInfo.phone)
      console.log(!!Utils.checkPhone(this.userInfo.phone))
    },
    phoneChange () {
      this.phoneChangeShow = true
      if (this.userInfo.phone) {   // 判断是否有手机号
        this.phoneState.oldPhoneShow = true
      }
    },
    codeTime () {
      let count = 60
      this.phoneState.codeClick = true
      this.phoneState.codeText = count + 's'
      this.phoneState.codeTime = setInterval(() => {
        count--
        if (count <= 0) {
          this.phoneState.codeText = '发送验证码'
          clearInterval(this.phoneState.codeTime)
        } else {
          this.phoneState.codeClick = true
          this.phoneState.codeText = count + 's'
        }
      }, 1000)
    },
    // 发送验证码
    doCode () {
      if (!!this.userInfo.phone && this.phoneState.nextText === '下一步') {
        // 第一次发送
        User.identity().then(res => {
          this.codeTime()
        }).then(res => {
          if (res.suc) {
            Message({type: 'success', message: '发送成功'})
          }
        })
      } else {
      // 第二次发送
        User.smsBindPhone({
          data: {
            phone: this.userInfo.phone
          }
        }).then(res => {
          this.codeTime()
          if (res.suc) {
            Message({type: 'success', message: '发送成功'})
          }
        })
      }
    },
    // 验证验证码
    codeCheck () {
      if (this.phoneState.nextText === '下一步') {
      // 第一次验证
        User.identityVerify({
          data: {
            vCode: this.phoneState.codeVal
          }
        }).then(res => {
          console.log(res)
          if (res.suc) {
            console.log('111成功')
            this.userInfo.phone = ''
            this.phoneState.codeVal = ''
            this.phoneState.nextText = '确认保存'
            this.phoneState.codeClick = false
            this.phoneState.phoneFlag = true
            this.phoneState.oldPhoneShow = false
            this.phoneState.codeFlag = false
            this.phoneState.codeText = '发送验证码'
            clearInterval(this.phoneState.codeTime)
          } else {
            this.phoneState.codeFlag = true
          }
        })

        // 第二次验证
      } else {
        User.bizuserBindPhone({
          data: {
            phone: this.userInfo.phone,
            vCode: this.phoneState.codeVal
          }
        }).then(res => {
          if (res.suc) {
            Message({type: 'success', message: '绑定成功'})
            clearInterval(this.phoneState.codeTime)
            this.phoneChangeShow = false
          }
        })
      }
    },
    edituserPhone () {
      // 用户手机的修改
      this.editState.phoneState = true
      // 执行修改的响应api操作
      User.improve({
        data: {
          phone: this.userInfo.phone
        }
      }).then(res => {
        if (res.suc) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('user/UPDATE_USERINFO', {
            phone: this.userInfo.phone
          })
        }
      })
    }
  }
}
</script>

<style type="text/css" src="common/style/module/manage/new-editor.scss" scoped></style>
<style lang="scss">
.box {
  .el-dialog {
    border-radius: 6px;
    margin: auto;
    width: 480px;
  }
  .el-input-group__append {
    padding: 0;
    background: #E6E6E6 !important;
    color: #979797 !important;
    font-size: 13px;
    width: 86px;
    transition: 0.5s;
    p{
      padding: 8px 10px;
      margin: 0;
      text-align: center;
    }
  }
  .doCode .el-input-group__append{
    background: #fc4a46 !important;
    color: #fff !important;
    border-color: #fc4a46;
  }
}

.el-input__inner:focus {
  border-color: #fc4a46;
}
.box {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  margin-top: 16px;
  margin-bottom: 20px;
  padding-bottom: 166px;
  .add1 {
    display: inline-block;
    position: relative;
    width: 110px;
    height: 110px;
    margin-top: 3px;
    margin-bottom: 71px;
    left: 46%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    /* background: url(/static/imgs/manage/index/add-head-img.png) no-repeat center; */
    input {
      cursor: pointer;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      left: 0;
          top: 0;
    }
  }
  .add1:hover {
        /* background: url(/static/imgs/manage/index/add-head-img2.png)
          no-repeat center; */
      }
}
.user-manage-wrap {

  .el-form_item-tip {
    text-align: right;
    color: #979797;
  }
  .el-form-item__content {
    border-bottom: 1px solid #999;
  }
  .el-input {
    display: inline-block;
    width: initial;
  }
  .el-input__inner {
    border: 1px solid #999;
    height: 1.8em;
  }
  .el-input.is-disabled .el-input__inner {
    background: transparent !important;
    border: none;
    cursor: text;
  }

  .el-button--default {
    color: #fff;
    background-color: #fc4a46;
    border-color: #fc4a46;
  }
  .el-button--text {
    color: #fc4a46;
  }
  .item-val {
    font-size: 14px;
    position: relative;
    .user-name {
      color: #5a5a5a;
    }
    .can-operate {
      color: #fc4a46;
      cursor: pointer;
    }
    .bind-phone {
      color: #cfcfcf;
    }
    .user-name,
    .bind-phone {
      display: inline-block;
      width: 124px;
    }
    .button-box {
      button {
        height: 33px;
        border: 1px solid #d2d2d2;
        border-radius: 6px;
        vertical-align: middle;
      }
      .free {
        width: 113px;
        height: 33px;
        display: inline-block;
        background: rgba(57, 175, 111, 1);
        opacity: 0.9;
        border-radius: 6px;
        padding-left: 3px;
        vertical-align: middle;
        text-align: center;
        cursor: pointer;
        .icon-level {
          background: transparent;
          width: 20px;
          height: 20px;
          float: left;
          margin:9px 7px 0 0;
        }
        span {
          color: #ffffff;
          font-size: 14px;
          line-height: 33px;
          width: 87px;
          height: 100%;
          float: left;
        }
      }
      .upgrade {
        width: 85px;
        color: #FC4A46;
        background: #FEF0F0;
        margin-left: 9px;
        &:hover{
          color:#FEF0F0;
          background: #FC4A46;
        }
      }
    }
    .use-time {
      font-size: 12px;
      color: #979797;
      margin-top: 13px;
    }
    .warn-text {
      background: #fff4e9;
      color: #fc4a46;
      font-size: 12px;
      display: inline-block;
      padding: 2px 6px;
      margin-top: 9px;
      line-height: 1.2;
    }
  }
}
</style>

