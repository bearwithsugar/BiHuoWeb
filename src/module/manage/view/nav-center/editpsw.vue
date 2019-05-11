<template>
  <el-form class="editpsw-wrap" :model="formData" status-icon :rules="rules" ref="ruleForm" label-width="100px">
    <el-form-item label="输入新密码" prop="pass">
      <el-input type="password" v-model="formData.pass" placeholder="键入6-20位密码"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="checkPass">
      <el-input type="password" v-model="formData.checkPass" placeholder="再次输入密码"></el-input>
    </el-form-item>
    <el-form-item label="手机验证" prop="phone">
      <el-input v-model="formData.vcode" placeholder="输入验证码">
        <template slot="append">
          <el-button @click="getPhoneCode" :disabled="countdownState">{{countdownState ? countdownCounter + 's' : '获取验证码'}}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="small" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import User from 'src/server/user'
import utils from 'src/lib/utils'

let _self
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!utils.checkPsw(value)) {
        callback(new Error('请输入符合格式的密码!'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      countdownCounter: 59, // 获取验证码倒计时
      countdownState: false, // 获取验证码按钮的状态
      formData: {
        pass: '',
        checkPass: '',
        phone: '',
        vcode: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
        /* phone: [
          {
            required: true,
            pattern: /^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/,
            message: '请填写正确的手机格式',
            trigger: 'blur'
          }
        ] */
      }
    }
  },
  mounted () {
    _self = this
  },
  methods: {
    submitForm (formName) {
      let params = {
        vCode: _self.formData.vcode,
        password: _self.formData.pass
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          User.resetPsw({
            data: params
          }).then(res => {
            if (res.suc) {
              this.$message({ type: 'success', message: '修改成功！' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getPhoneCode () {
      let _self = this
      let params = {
        phone: _self.formData.phone
      }
      // 获取手机验证码操作
      if (this.countdownState) {
        return
      }
      /* if (!utils.checkPhone(_self.formData.phone)) {
        this.$message.error('请输入正确的手机号码!')
        return
      } */
      _self.countdownState = true
      User.resetGetCode({
        data: params
      }).then(res => {
        if (res.suc) {
          this.$message({
            type: 'success',
            message: '短信发送成功，请注意查收！'
          })
          _self.countdownCounter = 59
          let timer = setInterval(function () {
            if (_self.countdownCounter > 0) {
              _self.countdownCounter--
            }
            if (_self.countdownCounter <= 0) {
              clearInterval(timer)
              _self.countdownState = false
            }
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editpsw-wrap {
  margin-top: 20px;

  .el-button--default {
    color: #fff;
    background-color: #fc4a46;
    border-color: #fc4a46;
  }
  .el-button--text {
    color: #fc4a46;
  }
  .el-input {
    width: 60%;
  }
}
</style>