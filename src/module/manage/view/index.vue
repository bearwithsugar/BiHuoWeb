<template>
  <div class="box">
    <div class="banner-box"><img src="/static/imgs/manage/index/banner.png" alt="loading" style="width: 100%" /></div>
    <div class="content">
      <div class="user-box border-d9 shadow">
        <div class="user-head-img">
          <div class="add">
            <img :src="userImgUrl" style="width: 90px;height: 90px;">
            <input type="file" @change="fileUserImg">
          </div>
          <div class="img-show"></div>
          <div class="user-name">
            <p class="name">{{userInfo.brandName}}</p>
            <p class="say-hello">Hi
              <span>{{userInfo.userName}}</span>, 早上好!</p>
            <p class="time">
              <span class="useful">有效期：{{userInfo.startTime}} 至 {{userInfo.expireTime}}</span>
              <span class="warn" v-if="vipInfo.validDescription">{{vipInfo.validDescription}}</span>
            </p>
            <div class="btn">
              <div class="btn-left" :style="userLevel.color[vipInfo.vipType || 0]">
                <img v-if="vipInfo.vipType" :src="userLevel.icon[vipInfo.vipType || 0]" style="width: 16px;height: 16px" class="icon-level" />
                <span>{{ userLevel.text[vipInfo.vipType || 0] }}</span>
              </div>
              <router-link to="/nav-vip">
                <el-button type="danger" plain size="medium" class="up-grade" v-show="vipInfo.level != 4">{{userLevel.action[vipInfo.vipType || 0]}}</el-button>
              </router-link>
              
              <!--<a class="lv lv1">月付费会员</a>-->
              <!--<a class="lv lv2">年付费会员</a>-->
            </div>
          </div>
        </div>
        <ul class="extra adviser">
          <li class="t">我的必火管家：</li>
          <li class="li who">Ruby 为您服务</li>
          <li class="li contact">
            186 7486 8812
            <div class="icon-wx" @mouseover="togglewxShow" @mouseout="togglewxClose">
              <div class="wx" v-show="contact.wxShow">
                <img src="/static/imgs/temp/图层 16@2x.png" alt="" />
                <p>扫我加技术顾问微信</p>
              </div>
              <input type="text" class="none" ref="icon_wx_input" @blur="togglewxShow" />
            </div>
          </li>
        </ul>
        <ul class="extra">
          <div class="extra-li">
            <li class="t">增值服务：</li>
            <li class="li">
              <a href="#">短信包
                <span>5000条</span>
              </a>
              <a href="#">广告位</a>
              <a href="#">流量主</a>
              <a href="#">营销培训</a>
              <a href="#">更多></a>
            </li>
          </div>
        </ul>
      </div>

      <ul class="operate flexBox">
        <li class="border-d9 b1" @click="toNew">
          <div class="contain">
            <span class="icon2 icon-create"></span>
            <p class="t">创建活动</p>
            <p class="text">快来创建一个活动吧</p>
          </div>
        </li>
        <li class="border-d9 b2">
          <div class="contain">
            <span class="icon2 icon-share"></span>
            <p class="t">分享有礼</p>
            <p class="text">分享我的活动给朋友</p>
          </div>
        </li>
        <li class="border-d9 b3" @click="toPay">
          <div class="contain">
            <span class="icon2 icon-spend"></span>
            <p class="t">进入充值</p>
            <p class="text">目前余额：
              <span class="c-main arial ">{{replenish.coins}}</span> 元</p>
          </div>
        </li>
      </ul>

      <div class="my-activities border-d9 shadow">
        <p class="title">我的活动
          <router-link :to="{path: '/nav-my'}" class="more">查看更多</router-link>
        </p>
        <div class="con" v-if="myActivity.id">
          <div class="con-background"></div>
          <div class="left-time">
            <span>{{myActivity.surplusDate.day || 0}}天后结束</span>
            <img :src="myActivity.mainImg" alt="" class="last-img" />
          </div>
          <div class="params-box">
            <div>
              <span class="port-center">砍价</span>
              <span class="port-title">{{myActivity.activityName}}</span>
            </div>
            <p class="port-time">起始时间：{{myActivity.beginTime}} 至 {{myActivity.endTime}}</p>
            <ul class="port-con flexBox">
              <li class="act"><router-link :to="{name: 'collect', params: {id: myActivity.id}}">活动编辑</router-link></li>
              <li class="act2">数据核销</li>
              <!--
              <li class="act3">群发短信</li>
              -->
              <li class="act4" @click="modal.show = true">渠道链接</li>
              <li class="act5">我要推广</li>
            </ul>
            <ul class="port-data flexBox">
              <li>
                <p>浏览量</p>
                <span class="c-main">{{myActivity.wxVisitors || 0}}</span>
              </li>
              <li>
                <p>参与人数</p>
                <span class="">{{myActivity.joinUserNum || 0}}</span>
              </li>
              <li>
                <p>完成人数</p>
                <span class="">{{myActivity.awadUserNum || 0}}</span>
              </li>
              <li>
                <p>转化率</p>
                <span class="">{{myActivity.convertRatio || 0}}%</span>
              </li>
            </ul>
          </div>
          <ul class="action flexBox">
            <li class="copy-link" @click="previewAct">
              <!-- <span></span> -->
              <el-tooltip placement="top">
                <div slot="content">预览活动</div>
                <span></span>
              </el-tooltip>
            </li>
            <li class="copy-port" @click="copyAct">
              <el-tooltip placement="top">
                <div slot="content">复制活动</div>
                <span></span>
              </el-tooltip>
            </li>
            <li class="delete-port" @click="alert = true">
              <el-tooltip placement="top">
                <div slot="content">删除活动</div>
                <span></span>
              </el-tooltip>
            </li>
          </ul>
        </div>
        <div v-else style="padding: 30px;margin-top: -40px;margin-bottom: 30px"> 
          <p class="text-center font-small" style=" font-size: 24px;color: #fc4a46;cursor: pointer;" @click="toNew">还没有任何活动，马上去创建一个吧</p>
        </div>
      </div>

      <div class="recommend-activities border-d9 shadow">
        <p class="title">推荐活动
          <router-link :to="{path: '/nav-new'}" class="more">查看更多</router-link>
        </p>
        <act-list class="bottom-list" :activities="recommendActs" type="all"></act-list>
        <div class="recommend-activities_tip">
          <p class="loading-text" v-show="requestLoading"><i class="el-icon-loading"></i>必火君玩命加载中...</p>
          <p class="requestStateTip" v-show="!requestLoading && recommendActs.length === 0">没有找到相关的数据哟!</p>   
        </div>
      </div>

    </div>

    <el-dialog title="账号信息完善" :visible.sync="infoCompletion" :show-close="false"
    :close-on-click-modal="false" :close-on-press-escape="false">
      <div style="width: 340px;margin:auto;">
        <p class="font-small text-center" style="margin-bottom: 20px">为了您的使用方便和账号安全，请完善以下重要信息</p>
        <el-form size="medium" label-width="90px">

          <el-form-item label="用户名称：">
            <el-input placeholder="请输入用户名" v-model="userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机绑定:">
            <el-input placeholder="请输入手机号码" v-model="completionData.phone"></el-input>
          </el-form-item>

          <el-form-item label="手机验证：">
            <el-input v-model="completionData.vCode" placeholder="请输入验证码">
              <template slot="append" :class="{doCode: completionData.codeClick}">
                <p @click="doCode">{{completionData.codeText}}</p>
              </template>
            </el-input>
          </el-form-item>
          
          <el-form-item label="登录密码：">
            <el-input v-model="completionData.password" placeholder="请输入密码(6-20位非空格字符)"></el-input>
          </el-form-item>
          

          <div class="dashed"></div>
          <p class="text-center" style="margin-bottom: 20px;font-size:16px;">我的机构信息</p>
          <el-form-item label="机构名称：" >
            <el-input v-model="completionData.brandName" placeholder="请输入机构名称"></el-input>
          </el-form-item>
          
          <el-form-item label="所在城市：">
            <el-cascader style="width: 250px" v-model="sAddress" :options="city" :props="cascaderCityConf" change-on-select></el-cascader>
          </el-form-item>

          <el-form-item label="行业：">
            <el-cascader style="width: 250px" :options="industry.val" v-model="industry.code" change-on-select></el-cascader>
          </el-form-item>
          
          <el-form-item>
            <el-button style="float: right;" @click="furnishData">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="alert"
      width="500px">
      <span>删除后数据不可恢复，请谨慎操作</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alert = false">取 消</el-button>
        <el-button @click="deleteAct">继 续</el-button>
      </span>
    </el-dialog>

     <channel 
      v-if="modal.show" 
      :actid="myActivity.id" 
      :indexAct="myActivity" 
      :modal="modal" 
      :curModalTab="curModalTab"></channel>
  </div>
</template>

<script>
import User from 'src/server/user'
import Activity from 'src/server/activity'
import CITY from 'src/lib/city.js'
import Utils from 'src/lib/utils.js'
import fileUpload from 'src/server/fileUpload'
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import ActList from 'src/components/act-list'
import channel from '../dialog/channel.vue'

export default {
  data () {
    return {
      /* userImgChange: {
        background:
      }, */
      userImgUrl: null,
      // modal: {
      //   show: false,
      //   content: 'bind-phone'
      // },
      curModalTab: 'preview',
      infoCompletion: false,
      city: CITY, // 省市区三级js数据
      cascaderCityConf: {
        // 级联筛选的字段配置
        value: 'name',
        label: 'name',
        children: 'sub'
      },
      sAddress: [],
      // 行业数据
      industry: {
        arr: [],
        val: [],
        code: []
      },
      modal: {
        show: false,
        content: 'my-activities'
      },
      // 完善信息数据
      completionData: {
        brandName: '',
        userName: '',
        phone: '',
        vCode: '',
        password: '',
        industry: '',
        province: '',
        city: '',
        area: '',
        codeText: '发送验证码',
        codeClick: false
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
      vipInfo: {},
      recommendActs: [], // 推荐活动
      // 我的活动数据
      myActivity: {
        surplusDate: {}
      },
      myActs: {}, // 我的活动
      alert: false,    // 删除警告
      contact: {
        // 技术顾问
        wxShow: false
      },
      requestLoading: false, // 是否正在请求数据
      sourcesShow: false

    }
  },

  components: {
    ActList,
    channel
  },
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo'
    })
  },
  created () {
    // 获取推荐活动
    this.recommend()
  },
  mounted () {
    // 获取我的活动
    Activity.myActs({
      data: {
        status: 0,
        innerType: 1
      }
    }).then(data => {
      this.myActs = data.rs.pageList
    }).catch(err => {
      console.log(err)
    })

    // 同步用户信息
    User.self().then(res => {
      if (!res.rs.headUrl) {
        this.userImgUrl = '/static/imgs/manage/index/add-head-img.png'
      } else if (res.rs.headUrl) {
        this.userImgUrl = res.rs.headUrl
      }
      if (!res.suc) {
        this.$message({ type: 'error', message: '获取信息失败' })
        location.href = 'index.html'
      } else {
        this.vipInfo = res.rs.userVip
        this.userInfo.startTime = Utils.formatDate(new Date(res.rs.userVip.startTime))
        this.userInfo.expireTime = Utils.formatDate(new Date(res.rs.userVip.expireTime))

        this.$store.commit('user/UPDATE_USERINFO', res.rs)

        if (res.rs.step === 1) {   // 信息未完善
          this.infoCompletion = true

          User.industry().then(res => {
            if (res.suc) {
              res.rs.forEach(item => {
                this.industry.val.push({
                  value: item.id,
                  label: item.name
                })
              })
            }
          })
        }
      }
    })
  },
  methods: {
    toNew () {
      // 跳转到新建活动页面
      this.$router.push({
        path: '/nav-new'
      })
    },
    toVip () {
      // 跳转到购买会员页面
      this.$router.push({
        path: '/nav-vip'
      })
    },
    toPay () {
      // 跳转到充值页面
      this.$router.push({
        path: '/nav-replenish'
      })
    },
    togglewxShow () {
      this.contact.wxShow = true
    },
    togglewxClose () {
      this.contact.wxShow = false
    },
    toggleModal () {
      this.modal.show = !this.modal.show
    },
    // 获取我的活动和推荐活动
    recommend () {
      this.requestLoading = true
      Activity.recommend().then(data => {
        if (data.suc) {
          this.recommendActs = data.rs.recommendActivityList
          this.myActivity = data.rs.myActivity || {}
          if (this.myActivity.beginTime && this.myActivity.endTime) {
            // 结束时间计算
            this.myActivity.surplusDate = Utils.DateCalculate(this.myActivity.beginTime, this.myActivity.endTime)
            // 时间转换
            this.myActivity.beginTime = Utils.formatDate(new Date(this.myActivity.beginTime))
            this.myActivity.endTime = Utils.formatDate(new Date(this.myActivity.endTime))
          }
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.requestLoading = false
      })
    },
    // 预览活动
    previewAct () {
      this.modal.show = true
      this.curModalTab = 'preview'
    },
    // 复制活动
    copyAct () {
      Activity.copy({
        data: {
          id: this.myActivity.id
        }
      }).then(res => {
        if (res.suc) {
          Message({ type: 'success', message: '活动复制成功' })
          this.recommend()
        }
      })
    },
    // 删除活动
    deleteAct () {
      this.alert = false
      Activity.delete({
        data: {
          id: this.myActivity.id
        }
      }).then(res => {
        if (res.suc) {
          Message({ type: 'success', message: '活动删除成功' })
          this.recommend()
        }
      })
    },
    closeSources () {

    },
    // 发送验证码
    doCode () {
      let count = 60
      let time = setInterval(() => {
        count--
        if (count <= 0) {
          this.completionData.codeText = '发送验证码'
          clearInterval(time)
        } else {
          this.completionData.codeClick = true
          this.completionData.codeText = count + 's'
        }
      }, 1000)

      User.smsBindPhone({
        data: {
          phone: this.completionData.phone
        }
      }).then(res => {
        if (res.suc) {
        } else {
          clearInterval(time)
        }
      })
    },
    // 完善信息提交
    furnishData () {
      let province = this.sAddress[0]
      let city = this.sAddress[1]
      let area = this.sAddress[2]
      let industry = this.industry.code[0]

      let params = {
        province,
        city,
        area,
        industry,
        brandName: this.completionData.brandName,
        phone: this.completionData.phone,
        vCode: this.completionData.vCode,
        password: this.completionData.password,
        userName: this.userInfo.userName
      }

      User.improve({
        data: params
      }).then(res => {
        if (res.suc) {
          Message({type: 'success', message: '数据更新成功'})
          this.infoCompletion = false
        }
      })
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
        ContentType: 'multipart/form-data'
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
    }
  },
  props: {
    replenish: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/index.scss"></style>
<style lang="scss">
.recommend-activities {
  .act-wrap .lists-box {
    padding: 0 30px;
  }
}
.box {
  .el-dialog {
    border-radius: 6px;
    margin: auto;
    width: 480px;
  }
  .el-button--default {
    color: #fff;
    background-color: #fc4a46;
    border-color: #fc4a46;
  }
  .el-input-group__append {
    padding: 0;
    background: #E6E6E6;
    color: #979797;
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
    background: #fc4a46;
    color: #fff;
    border-color: #fc4a46;
  }
}
.doCode .el-input-group__append{
  background: #fc4a46;
  color: #fff;
  border-color: #fc4a46;
}
</style>
