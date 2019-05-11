<template>
  <div id="scrollWrap">
    <div class="main" id="edit-con">

      <div class="title">
        <!--显示的部分好像被手机挡住了，貌似没什么用-->
        <div class="title-text">{{form.title}}</div>
        <div class="title-switch">
          <span class="font-small">显示技术支持</span>
          <!--设置那个开关-->
          <el-switch v-model="form.skilShow" active-color="#FC4A46" inactive-color="#E6E6E6"></el-switch>
        </div>
      </div>



      <div class="edit-con content">

        <!--貌似是小手机部分-->
        <div class="preview" :style="scrollT">
          <div class="phone-top"></div>
          <div class="phone-main">
            <div class="phone-head">

              <div class="phone-show"></div>

              <!--活动名称，一下整个手机组件-->
              <div class="phone-title">
                <p>{{form.activityName}}</p>
              </div>

            </div>

            <div class="phone-content" id="phone-content" >
              <!--下面这个组件目前不知道干什么用的-->
              <!--1主浏览页面-->

              <component
                v-if="phoneAlive"
                v-bind:is="curTemplate"
                :form="form"
                :activityHaggle="activityHaggle"
                :activityShopList="activityShopList"
                :activityPlant="activityPlant"
                :industry="industry"
                :shareSet="shareSet"
                :surprise-html="surpriseHtml"
                :desc-html="descHtml"
                :gather-cards="activityGatherCardList"
                :erp-style="erpStyle"
                ref="bargain">
              </component>
            </div>
            <!--在小手机屏幕下方显示绑定那个右上角按钮-->
            <div class="content-foot" v-show="form.skilShow && preview.content===1">技术支持：必火互动</div>
          </div>
          <!--手机下面那一条显示，感觉没什么用-->
          <div class="phone-footer"></div>
        </div>




        <!--基本设置更多设置-即右边编辑栏-->
        <div class="editor">
          <div class="editor-head">
            <el-button @click="editorShow(false)" type="text" :class="{'bt-active':!editorType}">基本设置</el-button>
            <span>|</span>
            <el-button @click="editorShow(true)" type="text" :class="{'bt-active':editorType}">更多设置</el-button>
          </div>
          <!--应该写在css中-->
          <hr style="margin-bottom: 30px">
          <div class="editor-main">
            <el-form size="medium" label-width="100px" status-icon ref="ruleForm"  :rules="rules">

              <el-form-item label="*活动名称：">
                <!--通过activityName来绑定小手机的标题，其中phoneJump多次出现，应该是聚焦变化css-->
                <el-input v-model="form.activityName" @focus="phoneJump(1)" style="width: 480px">
                  <!--slot一个插槽-->
                  <i slot="suffix" class="pointer el-input__icon ">
                    <img style="position: relative;top: -10px;left: -8px;" @click="activityNameListShow=true" src="static/imgs/manage/editor/huan.png">
                  </i>
                </el-input>
                <span class="font-warn" v-if="rules.title.flag"> <i class="icon-warn"></i>此项为必填信息</span>
              </el-form-item>

              <!--//activityNameListShow控制是否显示-->
              <el-dialog title="你可以使用这些标题" :visible.sync="activityNameListShow" center>
                <div>
                  <ul class="activityNameList">
                    <li class="pointer" v-for="(item,index) in activityNameList.arr" :key="'freeTitle' + index"  @click="actNameChange($event,index)">
                      {{index+1}}、{{item}}
                    </li>
                  </ul>
                </div>
                <div class="solid"></div>
                <div style="margin-top: 10px;display: flex;justify-content: flex-end;">
                  <el-button @click="hideActNameList(true)">确定</el-button>
                  <el-button @click="hideActNameList(false)"> 取消</el-button>
                </div>
              </el-dialog>

              <el-form-item label="*活动时间：">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="form.beginTime" style="width: 220px;" @focus="phoneJump(1)" @change="checkFn(1)"></el-date-picker>
                <span class="mar-10">至</span>
                <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endTime" @change="checkFn(1)" @focus="phoneJump(1)" style="width: 220px;"></el-date-picker>
                <span class="font-warn" v-if="rules.time.flag"> <i class="icon-warn"></i>此项为必填信息</span>
              </el-form-item>




              <el-form-item label="活动主图：">
                <el-radio-group v-model="activityImgShow">
                  <el-radio :label="1" @change="phoneJump(1)">默认</el-radio>
                  <el-radio :label="2" @change="phoneJump(1)">更换</el-radio>
                </el-radio-group>




                <!--点击更换后弹出的页面绑定方式为activityImgShow参数值-->
                <div class="activity-img" v-if="activityImgShow==2">
                  <div class="img-content">
                    <!--自动展示资源内所有照片-->
                    <img :src="item" v-for="(item, index) in imgContent.arr" :key="'imgContent' + index" @click="mainImgChange(item, $event)">
                  </div>

                  <div style="display: flex;margin-top: 15px;">
                    <label class="label-button" for="imgFile">上传</label>
                    <span class="font-small mar-10">建议尺寸：750*500.jpg/.pmg/.gif,<br>不超过1M，最多上传5张轮显</span>
                    <input @change="imgUpload($event,'acticity_subject')" id="imgFile" type="file" style="visibility: hidden;width: 50px">
                  </div>

                  <div class="img-button">
                    <div class="btn btn-left" @click="imgToggle(0)"></div>
                    <div class="btn btn-right" @click="imgToggle(1)"></div>
                  </div>
                </div>

              </el-form-item>






              <el-form-item label="*商品数量：">
                <el-radio-group v-model="limitShopCount">
                  <el-radio :label="false" @change="phoneJump(1)">不限</el-radio>
                  <span class="fu">付</span>
                  <el-radio :label="true" @change="phoneJump(1)" style="margin-left: 15px;">限制</el-radio>
                  <!--输入框  把10000删掉之后出现在输入框内的-->
                  <el-input v-model="form.goodsCount" class="mar-10" @focus="phoneJump(1)" placeholder="份" style="width: 124px"></el-input>
                </el-radio-group>

                <span class="font-warn" v-if="false">
                  <i class="icon-warn"></i>
                  此项为必填信息
                </span>
              </el-form-item>
              <!--以上为设置栏共有部分，下面为切换内容-->


              <!--editType=1、2设置两个页面之间的转换->集卡和砍价-->
              <!--11111111下面是砍价页面的显示-->
              <template v-if="editType == 1">
                <el-form-item label="*砍价金额：">
                  <el-input v-model="activityHaggle.formalPrice"
                    placeholder="原价：999"
                    :disabled="form.status === 1"
                    @focus="phoneJump(1)"
                    @change="checkFn(2)"
                    style="width: 100px">
                  </el-input>
                  <span class="mar-10">砍至</span>
                  <el-input v-model="activityHaggle.afterPrice"
                    :disabled="form.status === 1"
                    placeholder="低价：0"
                    @focus="phoneJump(1)"
                    @change="checkFn(2)"
                    style="width: 100px">
                  </el-input>
                  <span class="font-warn" v-if="rules.price.flag"> <i class="icon-warn"></i>此项为必填信息</span>
                </el-form-item>

                <el-form-item label="砍价设置：">
                  <span class="font-small" style="position: absolute;top:30px;left: -80px">可不设置</span>
                  <span>报名邀请</span>
                  <el-input class="mar-10" v-model="activityHaggle.limitPerson" placeholder="0人" style="width: 60px" @focus="phoneJump(1)"></el-input>
                  <span>帮忙可砍至低价。</span>
                  <span class="font-small">(参与者每次砍价数额将随机的产生)</span>

                  <!--
                    <div>
                      <span class="fu">付</span>
                      <el-checkbox class="mar-10" v-model="form.smsNotify"></el-checkbox>
                      砍价低价至通知客户
                    </div>
                    -->
                </el-form-item>

                <el-form-item label="重复砍价：">
                  <el-checkbox v-model="activityHaggle.isReHaggle"
                  :disabled="form.status === 1" @change="phoneJump(2)" >
                  </el-checkbox>
                  报名者每隔24小时可以再次给自己砍价
                </el-form-item>
              </template>


              <!--2222222222集卡部分的页面-->
              <template v-if="editType == 2">
                <el-form-item label="集卡设置：">
                  <span>参与者邀请</span>
                  <el-input class="mar-15" v-model="activityGather.approInviteNum" placeholder="0人" style="width: 60px"></el-input>
                  <span>帮忙可集齐所有卡片。</span>
                  <span class="font-small">(设置人数越多，参与者集卡难度会增加，建议根据活动进行实际情况及时调整)</span>
                </el-form-item>

                <el-form-item label="卡片设置：">
                  <div class="cards-setting">
                    <div class="cards-setting_tip">
                      <p>点击图片可以更换，尺寸：390*520，1M以内， 最少5张，最多9张，不上传则默认显示。</p>
                      <el-button @click="changeCards">
                        <i class="v-icon">&#xe660;</i>
                        换一批</el-button>
                    </div>
                      <ul class="presetCards">
                      <li class="presetCard-item"
                        v-for="(item, index) in activityGatherCardList"
                        :key="'presetCard' + index"
                        :style="item.imgBackground ? 'background-image:url(' + item.imgBackground + ')' : 'background:none'">
                        <span class="presetCard-item_text">{{item.content}}</span>
                      </li>
                      <li class="presetCard-item presetCard-add">
                        <label class="cardAddBtn" for="CardImgFile"><i class="v-icon v-icon-add1"></i></label>
                        <input
                          @change="imgUpload($event,'acticity_card')"
                          id="CardImgFile"
                          type="file"
                          style="visibility: hidden;width: 0;">
                      </li>
                    </ul>

                    <el-form-item>
                      <div>
                        <span>每天可以有</span>
                        <el-input class="mar-15" v-model="activityHaggle.limitPerson"  placeholder="0人" style="width: 60px"></el-input>
                        <span>人可以完成集卡</span>
                        <span>(此项不是必填项)</span>
                      </div>
                      <p class="font-small">(例如：商品总数为100份，设置每天20人完成集卡，商品最快5天时间 可以领完。)</p>
                    </el-form-item>

                  </div>
                </el-form-item>
              </template>
              <!--集卡专属设置部分结束-->

              <!--种树专属设置部分-->
              <template v-if="editType == 3">
                <el-form-item label="种树设置：">
                  <span>剩余奖品数：</span>
                  <el-input class="mar-15" @focus="phoneJump(5)" v-model="activityPlant.restpresent"  placeholder="0个" style="width: 60px"></el-input>
                  <span>  ，需要浇</span>
                  <el-input class="mar-15" @focus="phoneJump(6)" v-model="activityPlant.waternumber" placeholder="0" style="width: 60px"></el-input>
                  <span>次水</span>
                </el-form-item>
              </template>
              <!--种树专属设置部分结束-->




              <!--继续共有设置-->
              <div class="dashed"></div>

              <el-form-item label="*活动描述：">
                <quill-editor v-model="form.description" style="height: 190px" :content="content" ref="newEditor" :options="editorOption" @change="onActDescribeChange($event)" @focus="phoneJump(2)">
                </quill-editor>
                <span class="font-warn" v-if="false" style="position: relative;top:56px;"> <i class="icon-warn"></i>此项为必填信息</span>
              </el-form-item>

              <el-form-item label="更多惊喜：" style="margin-top: 80px">
                <p class="font-small t-center" style="position: relative;left: -80px;top:30px;width: 56px">不设置则不显示</p>
                <quill-editor style="height: 190px" v-model="form.surprise" ref="myQuillEditor" :options="editorOption" @change="onSurprisedChange($event)" @focus="phoneJump(3)">
                </quill-editor>
              </el-form-item>

              <div class="dashed" style="margin-top: 86px"></div>

              <el-form-item label="活动规则：">
                <el-input :rows="6" @focus="phoneJump(4)"  v-model="form.rule" type="textarea"></el-input>
              </el-form-item>

              <el-form-item label="兑奖信息：">
                <div>
                  <el-radio></el-radio>
                  线下兑奖
                </div>
                <el-input :rows="5" type="textarea" v-model="form.awardWays" @focus="phoneJump(2)"></el-input>
              </el-form-item>

              <el-form-item label="活动分享：">
                <el-checkbox v-model="form.share"></el-checkbox>
                <span>勾选表示同意将活动公开分享到活动商城</span>
              </el-form-item>

              <el-form-item label="背景音乐：">
                <span style="margin-left: 10px;">默认背景音乐.mp3</span>
                <img style="padding: 5px;cursor: pointer;" @click="musicPlay" src="static/imgs/manage/editor/play.png">
                <el-switch v-model="form.isPlay" active-color="#FC4A46" inactive-color="#E6E6E6" style="float: left;margin-top:10px"></el-switch>
                <div class="music-box" v-show="form.isPlay">
                  <div>
                    <el-input v-model="musicName" :disabled="true" style="width: 220px;margin:20px 0;font-size: 12px;"></el-input>
                    <label class="label-button" for="musicFile">上传</label>
                    <p class="font-small">提示：请上传mp3格式的音乐，2M以内</p>
                    <input id="musicFile" type="file" style="visibility: hidden;" @change="musicUpload($event)">
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>

          <!--虚线上面的小div，貌似没有用-->
          <div class="dashed"></div>

          <div class="editor-more">
            <div class="editor-more-content">
              <div class="more-head">
                <ul>
                  <router-link tag="li" active-class="active" :to="{name:'collectEdit' ,params: { id: userActivityId} }">客户信息收集</router-link>
                  <router-link tag="li" active-class="active" :to="{name:'sponsorEdit' ,params: { id: userActivityId} }">主办方</router-link>
                  <router-link tag="li" active-class="active" :to="{name:'shareEdit' ,params: { id: userActivityId} }">分享设置</router-link>
                  <!-- <router-link tag="li" active-class="active" :to="{path:'/nav-new/basic-setting/assistant'}">助力设置</router-link> -->
                </ul>
              </div>

              <!--用来渲染客户信息收集那三个界面的-->
              <router-view
                :activityFormList="activityFormList"
                :industry="industry"
                :shareSet="shareSet"
                :activityShopList="activityShopList"
                :preview="preview"
                :userDefinedList="userDefinedList"
                :phoneMain="phoneMain"
                :curTemplate="curTemplate"
                @enterShare="enterShare"
                @leaveShare="leaveShare"
                @sponsorChange="sponsorChange"
              >
              </router-view>
            </div>
          </div>
        </div>
      </div>
    </div>

    <channel
      v-if="modal.show"
      :actid="act.id"
      :indexAct="act"
      :modal="modal"
      :curModalTab="curModalTab">
    </channel>

    <div class="footer">
      <div class="footer-main">
        <el-button @click="publish">预览发布</el-button>
        <el-button @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>


<script type="text/javascript">

import Utils from 'src/lib/utils.js'
import Activity from 'src/server/activity.js'
import fileUpload from 'src/server/fileUpload'
import { Message } from 'element-ui'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import channel from '../../dialog/channel.vue'
import PreviewHagglecollect from 'src/components/preview/bargain.vue'
import PreviewCardscollect from 'src/components/preview/cards-collect.vue'
import PreviewPlanttrees from 'src/components/preview/planttrees.vue'
import PreviewShare from '../preview/share.vue'

// 图片资源
import defaultCardImgJi from 'src/components/preview/default-img/collectCards/theme1/card-ji.png'
import defaultCardImgKa from 'src/components/preview/default-img/collectCards/theme1/card-ka.png'
import defaultCardImgPian from 'src/components/preview/default-img/collectCards/theme1/card-pian.png'
import defaultCardImgYing from 'src/components/preview/default-img/collectCards/theme1/card-ying.png'
import defaultCardImgHao from 'src/components/preview/default-img/collectCards/theme1/card-hao.png'
import defaultCardImgLi from 'src/components/preview/default-img/collectCards/theme1/card-li.png'
import defaultBanner from 'src/components/preview/default-img/bargain/theme1/cover.png'

export default {
  components: {
    channel,
    PreviewHagglecollect,
    PreviewCardscollect,
    PreviewShare,
    PreviewPlanttrees
  },
  data () {
    return {
      curModalTab: 'manage',
      act: {},
      erpStyle: {},
      modal: {
        show: false,
        content: 'my-activities'
      },
      editType: 1,
      curTemplate: 'PreviewHagglecollect', // 当前预览模板
      userActivityId: 0,
      editorType: false,
      phoneMain: null,
      sourcesShow: false,    // 渠道弹框
      preview: {             // 预览页面类型
        type: 1,
        content: 1
      },
      mainImgType: true,     // 默认主图
      activityImgShow: 1,
      limitShopCount: true, // 商品数量是否限制
      scrollT: 0,
      activityNameListShow: false, // 标题列表弹窗
      content: '',
      surplusDate: {},
      elGoodsDesciption: null, // 预览活动描述
      elindustryDesc: null, // 预览主办方信息描述
      elSurprised: null, // 预览更多惊喜
      activityNameList: {
        index: 0,
        arr: []
      },
      descHtml: '',
      surpriseHtml: '',
      phoneAlive:true,
      editorOption: {
        // 富文本编辑器按键设置
        modules: {
          toolbar: [
            ['bold', 'blockquote', 'italic', 'underline', 'strike', 'image'],
            [
              {
                size: ['small', false, 'large', 'huge']
              }
            ],
            [
              { list: 'ordered' },
              { list: 'bullet' }
            ]
          ]
        }
      },
      //活动的详细信息内容
      form: {
        id: null,
        title: '！',
        status: 0,  // 活动状态
        activityName: '！',
        //mainImg: '', // 活动主图
        mainImg: [defaultBanner.toString()], // 活动主图
        activityTips: '', // 活动简介
        imgList: [1, 2, 3, 4, 5], // 主图列表
        skilShow: true,
        beginTime: '', // 活动时间
        endTime: '',
        smsNotify: '', // 是否短信的通知
        goodsCount: '', // 商品数量
        description: '', // 商品描述
        surprise: '', // 更多惊喜
        awardWays: '', // 兑奖方式
        share: '', // 是否分享
        musicUrl: '', // 音乐链接
        rule: '',
        isPlay: '' // 是否有背景音乐
      },
      imgContent: {
        index: 0,
        arr: [1, 2, 3, 4]
      },
      musicFlag: false, // 音乐是否可播放
      musicName: '',
      music: new Audio(),

      //集卡专属设置
      activityGather: {
          //邀请人数
        approInviteNum: 100,
        //创建时间
        createTime: 0,
        id: 2,
        status: 0,
        type: 2,
        updateTime: 0
      },
//      集卡片赢好礼6张卡的加载
      activityGatherCardList: [
        {
          imgBackground: defaultCardImgJi
        },
        {
          imgBackground: defaultCardImgKa,
          content: ''
        },
        {
          imgBackground: defaultCardImgPian,
          content: ''
        },
        {
          imgBackground: defaultCardImgYing,
          content: ''
        },
        {
          imgBackground: defaultCardImgHao,
          content: ''
        },
        {
          imgBackground: defaultCardImgLi,
          content: ''
        }
      ],

      // 客户信息收集
      activityFormList: [
        {
          id: 1,
          isNeed: true,
          name: '姓名',
          uaid: 100038
        },
        {
          id: 2,
          isNeed: true,
          name: '手机号',
          uaid: 100038
        }
      ],

      // 客户信息自定义选项
      userDefinedList: [],

      // 主办方信息
      industry: {
        industryLogo: '', // 机构标志
        industryName: '', // 机构名称
        industryPhone: '', // 机构电话
        industryAddress: '', // 机构地址
        industryProvince: '', // 机构省
        industryCity: '', // 机构市
        industryArea: '', // 机构区
        industryStreet: '', // 机构详细地址
        industryDesc: '', // 机构描述
        industryUrl: '' // 二维码
      },

      //砍价的专属信息
      activityHaggle: {
        id: '',
        limitPerson: '', // 邀请砍至低价的人数
        status: '',
        uaid: '',
        formalPrice: '', // 砍价原价
        afterPrice: '', // 砍价底价
        reHaggleHour: '', // 重复砍价时间
        isReHaggle: false
      },
      //种树专属信息
      activityPlant:{
        restpresent:'',
        waternumber:''
      },

      // 门店信息列表
      activityShopList: [],

      // 分享设置
      shareSet: {
        shareDesc: '', // 分享描述
        shareTitle: '', // 分享标题
        isShowShareName: '', // 是否显示分享人昵称
        isShowShareTimes: '', // 是否显示分享次数
        thumbnailUrl: '', // 分享的缩略图
        shareTitleList: []  // 分享标题列表
      },
      rules: {
        title: {
          flag: false,
          text: '此项为必填信息'
        },
        time: {
          falg: false,
          text: '此项为必填信息'
        },
        price: {
          flag: false,
          text: '此项为必填信息'
        },
        name: [
          {
            type: 'string',
            min: 0,
            max: 20,
            message: '最长20个汉字',
            trigger: 'change',
            required: true
          }
        ],
        phone: [
          {
            pattern: /^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/,
            message: '请填写正确的手机格式',
            trigger: 'change'
          }
        ]
      },
      params: null,
      flag: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('all is true')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 基本设置和更多设置按钮切换
    editorShow (val) {
      let ele = document.getElementById('scrollWrap')
      if (val) {
        ele.scrollTop = 1500
        this.editorType = true
      } else {
        ele.scrollTop = 0
        this.editorType = false
      }
    },

    // 标题弹框选择事件
    actNameChange (e, index) {
      var el = event.currentTarget.parentNode.childNodes
      for (var i = 0; i < el.length; i++) {
        // el[i].nodeName === '#text' ? true : el[i].classList.remove('actName')
        // el[i].nodeName === '#text' && el[i].classList.remove('actName')
        if (el[i].nodeName !== '#text') {
          el[i].classList.remove('actName')
        }
      }
      this.activityNameList.index = index
      e.currentTarget.classList.add('actName')
    },

    // 标题弹框按钮事件
    hideActNameList (type) {
      if (type) {
        this.form.activityName = this.activityNameList.arr[this.activityNameList.index]
      }
      this.activityNameListShow = false
    },

    // 改变主图
//    mainImgChange (url, e) {
//      this.mainImgType = false
//      this.form.mainImg = url
//      e = e.target || e.srcElement
//      let parent = e.parentNode
//      for (let i = 0; i < parent.childNodes.length; i++) {
//
//      }
//      e.classList.add('active')
//    },
    mainImgChange (url, e) {
      var that = this
      if (this.mainImgType) {
        this.mainImgType = false
        this.form.mainImg = [url]
      } else {
        this.form.mainImg.push(url)
        console.log(this.form.mainImg)
      }
      this.phoneAlive = false
      setTimeout(function () {
        that.phoneAlive = true
      }, 500)

      e = e.target || e.srcElement
      let parent = e.parentNode
      for (let i = 0; i < parent.childNodes.length; i++) {
        console.log(parent.childNodes[i])
        console.log(this.form)
      }
      e.classList.add('active')
    },

    // 手机预览内容跳转
    phoneJump (type) {
      if (type === 1) {
        this.preview.type = 1
        this.preview.content = 1
        this.phoneMain.scrollTop = 0
      } else if (type === 2) {
        this.preview.type = 1
        this.preview.content = 1
        this.phoneMain.scrollTop = 850
      } else if (type === 3) {
        this.preview.type = 1
        this.preview.content = 1
        this.phoneMain.scrollTop = 950
      }
      else if (type === 4) {
        this.preview.type = 1
        this.preview.content = 1
        this.phoneMain.scrollTop = 1050
      }
      else if (type === 5) {
        this.preview.type = 1
        this.preview.content = 1
        this.phoneMain.scrollTop = 200
      }
      else if (type === 6) {
        this.preview.type = 1
        this.preview.content = 1
        this.phoneMain.scrollTop = 600
      }
    },

    closeSources () {
      this.sourcesShow = false
    },
    // 监听活动描述信息改变事件
    onActDescribeChange ({ quill, html, text }) {
      this.descHtml = html
    },

    // 监听更多惊喜信息改变事件
    onSurprisedChange ({ quill, html, text }) {
      this.surpriseHtml = html
    },
    //点击分享设置
    enterShare () {
      console.log('enterShare执行'),
      this.curTemplate = 'PreviewShare'
    },
    //离开分享设置
    leaveShare () {
      console.log('leaveShare执行')
        //this.curTemplate = (this.editType==2)?'PreviewCardscollect':'PreviewHagglecollect'
      if(this.editType==2){
        this.curTemplate =PreviewCardscollect
      }else if (this.editType==1){
        this.curTemplate =PreviewHagglecollect
      }else if (this.editType==3){
        this.curTemplate =PreviewPlanttrees
      }



//      this.curTemplate =(editType==2)?'PreviewCardscollect':'PreviewHagglecollect"
//      (b == 5) ? a="true" : a="false";
//      （this.editType==2）? this.curTemplate ='PreviewCardscollect' :this.curTemplate ='PreviewHagglecollect'
    },

    // 主图列表左右的跳转
    imgToggle (val) {
      if (val) {
        if (this.imgContent.index + 4 < this.form.imgList.length) {
          this.imgContent.index++
        }

        this.imgContent.arr = this.form.imgList.slice(
          this.imgContent.index,
          this.imgContent.index + 4
        )
      } else {
        if (this.imgContent.index - 1 >= 0) {
          this.imgContent.index--
        }
        this.imgContent.arr = this.form.imgList.slice(
          this.imgContent.index,
          this.imgContent.index + 4
        )
      }
    },
    // 音乐播放
    musicPlay (event) {
      let ele = event.target || event.srcElement
      if (this.musicFlag) {
        if (this.music.paused) {
          this.music.play()
          ele.src = 'static/imgs/manage/editor/pause.png'
        } else {
          this.music.pause()
          ele.src = 'static/imgs/manage/editor/play.png'
        }
      }
    },
    // 换一批图片
    changeCards () {
      Activity.anotherCard({
        data: {
          bizUserActivityId: this.userActivityId,
          cardSetId: this.activityGatherCardList[0].cardSetId || 0
        }
      }).then(res => {
        if (res.suc) {
          this.activityGatherCardList = res.rs
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 图片上传
    imgUpload (e, type) {
      let ele = event.target || event.srcElement
      let file = ele.files[0]
      let formData = new FormData()
      formData.append('imgType', type)
      formData.append('file', file)
      let params = {
        data: formData,
        methods: 'post',
        ContentType: 'multipart/form-data'
      }

      fileUpload.imgUpload(params).then(res => {
        if (res.suc) {
          switch (type) {
          case 'acticity_subject':
            this.form.imgList.unshift(res.rs)
            break
          case 'acticity_card':
            this.activityGatherCardList.push({
              imgBackground: res.rs
            })
            break
          default:
            break
          }
        } else {
          console.log(res.msg)
        }
      })
    },


    // 音乐上传
    musicUpload (event) {
      let ele = event.target || event.srcElement
      let file = ele.files[0]
      let url = URL.createObjectURL(file)
      this.music.src = url
      this.musicName = file.name
      let formData = new FormData()
      formData.append('fileType', 'activity_music')
      formData.append('file', file)
      let params = {
        data: formData,
        methods: 'post',
        ContentType: 'multipart/form-data'
      }

      fileUpload.musicUpload(params).then(res => {
        if (res.suc) {
          this.music.src = res.rs
          this.form.musicUrl = res.rs
        } else {
          console.log(res.suc)
        }
      })
    },
    // 计算日期差
    dateCalculate () {
      let date = Utils.DateCalculate(this.form.beginTime, this.form.endTime)
      this.surplusDate = date
    },
    // 监听主办方信息描述改变事件
    sponsorChange (data) {
     // this.elindustryDesc.innerHTML = data
    },
    forIn (obj1, obj2) {
      if (Array.isArray(obj2)) {
        obj2.forEach(item => {
          obj1.push(item)
        })
      } else {
        for (let item in obj2) {
          obj1[item] = obj2[item]
        }
      }
    },
    //判断空值用的
    checkFlag (val, errmsg = '完整信息') {
      if (val === '' || !val) {
        this.flag = true
        Message({ type: 'success', message: `请填写${errmsg}` })
      }
    },
    //1是检查截止时间，2是检查前后价格
    checkFn (type) {
      if (type === 1) {
        if (!this.form.beginTime || !this.form.endTime) {
          this.rules.time.flag = true
        } else {
          this.rules.time.flag = false
        }
      } else if (type === 2) {
        if (!this.activityHaggle.afterPrice || !this.activityHaggle.formalPrice) {
          this.rules.price.flag = true
        } else {
          this.rules.price.flag = false
        }
      }
    },
    //总体检查函数
    checkMessage () {
      this.flag = false
      // 基本数据字段
      let activityJson = {}
      let formJson = []
      let shopJson = []

      // 砍价
      let haggleJson = {}

      // 集卡
      let gatherJson = {}
      let cardJson = []

      // 数据浅copy,防止修改原始数据
      this.activityFormList = [...this.activityFormList, ...this.userDefinedList]

      activityJson = {
        ...this.form,
        ...this.industry,
        ...this.shareSet
      }
      formJson = [...this.activityFormList]
      shopJson = [...this.activityShopList]

      // 砍价
      haggleJson = {
        ...this.activityHaggle
      }

      // 集卡
      cardJson = [...this.activityGatherCardList]
      gatherJson = {
        ...this.activityGather
      }

      // 检验输入的数据
      this.checkFlag(activityJson.activityName, '活动名称')
      this.checkFlag(activityJson.beginTime, '活动开始时间')
      this.checkFlag(activityJson.endTime, '活动结束时间')
      this.checkFlag(activityJson.goodsCount, '商品数量')

      if (this.editType === '1') {
        this.checkFlag(haggleJson.formalPrice, '商品原价')
        this.checkFlag(haggleJson.afterPrice, '商品低价')
      }

      this.checkFlag(activityJson.description, '商品描述')
      this.checkFlag(activityJson.industryLogo, '机构logo')
      this.checkFlag(activityJson.industryName, '机构名称')
      this.checkFlag(activityJson.industryPhone, '机构电话')
      this.checkFlag(activityJson.industryDesc, '机构描述')

      this.params = {
        //activityJson包含活动内容详情（共有设置）、主办方信息、分享设置
        activityJson: JSON.stringify(activityJson),
        //formjson包含客户信息（包括客户自定义信息）
        formJson: JSON.stringify(formJson),
        //shopJson包括门店信息
        shopJson: JSON.stringify(shopJson),
        //谁能告诉我这个operation是干嘛的！！！！！
        operation: 1
      }

      switch (this.editType) {
      case '1':
        this.params = {
          ...this.params,
          //为params加上砍价的私有设置
          haggleJson: JSON.stringify(haggleJson),
          operation: 1
        }
        break
      case '2':
        this.params = {
          ...this.params,
          //为params加上集卡的私有设置
          //gatherJson为集卡专属设置
          gatherJson: JSON.stringify(gatherJson),
          //cardJson为被收集的卡片的数组
          cardJson: JSON.stringify(cardJson),
          operation: 1
        }
        break
        //此处为种树添加专属设置内容
      case '3':
        this.params = {
          ...this.params,

          operation: 1
        }
        break
      default:
        break
      }
    },
    // 保存信息
    save () {
      this.checkMessage()

      switch (this.editType) {
      case '1':
        this.handleSave()
        break
      case '2':
        this.gatherSave()
        break
      default:
        break
      }
    },
    // 预览发布活动
    publish () {
        //前三个检查
      this.checkMessage()
      this.checkFn(1)
      this.checkFn(2)
      this.params.operation = 2

      if (this.flag) {
        return
      }
      //开始进行预览发布工作
      switch (this.editType) {
      case '1':
        this.handlePublish()
        break
      case '2':
        this.gatherPublish()
        break
      default:
        break
      }
    },
    // 砍价保存
    handleSave () {
      Activity.save({
        data: this.params,
        methods: 'post'
      }).then(res => {
        if (res.suc) {
          Message({ type: 'success', message: '保存成功' })
          this.form.id = res.rs.activityId
          this.activityFormList = res.rs.activityFormList
          this.activityShopList = res.rs.activityShopList || []
          this.activityHaggle.id = res.rs.haggleId
          this.userActivityId = res.rs.activityId
          // 活动ID变化时跳转
          if (res.rs.activityId !== this.$route.params.id) {
            this.$router.push({
              name: 'collectEdit',
              params: {
                id: res.rs.activityId
              }
            })
          }
        }
      })
    },
    // 集卡保存信息
    gatherSave () {
      Activity.gatherSave({
        data: this.params,
        methods: 'post',
        ContentType: 'application/json'
      }).then(res => {
        if (res.suc) {
          Message({ type: 'success', message: '保存成功' })
          this.form.id = res.rs.activityId
          this.activityFormList = res.rs.activityFormList
          this.activityShopList = res.rs.activityShopList || []
          this.activityGather.id = res.rs.gatherId
          this.userActivityId = res.rs.activityId
          // 活动ID变化时跳转
          if (res.rs.activityId !== this.$route.params.id) {
            this.$router.push({
              path: `/edit/${2}/${res.rs.activityId}/collect`
            })
          }
        }
      })
    },
    // 预览发布跳转的砍价发布
    handlePublish () {
      Activity.save({
        data: this.params,
        methods: 'post',
        ContentType: 'application/json'
      }).then(res => {
        if (res.suc) {
          this.form.status = 1   // 砍价金额不可修改

          // 弹窗渠道管理框
          if (res.rs.isShowChannel) {
            this.act.id = res.rs.activityId
            this.modal.show = true
          }

          this.form.id = res.rs.activityId
          this.activityFormList = res.rs.activityFormList
          this.activityShopList = res.rs.activityShopList || []
          this.activityHaggle.id = res.rs.haggleId
          this.userActivityId = res.rs.activityId
          // 活动ID变化时跳转
          if (res.rs.activityId !== this.$route.params.id) {
            this.$router.push({
              name: 'collectEdit',
              params: {
                id: res.rs.activityId
              }
            })
          }
        }
      })
    },
    // 集卡发布
    gatherPublish () {
      Activity.gatherSave({
        data: this.params,
        methods: 'post',
        ContentType: 'application/json'
      }).then(res => {
        // 弹窗渠道管理框
        if (res.rs.isShowChannel) {
          this.act.id = res.rs.activityId
          this.modal.show = true
        }

        this.form.id = res.rs.activityId
        this.act.id = res.rs.activityId
        this.activityFormList = res.rs.activityFormList
        this.activityShopList = res.rs.activityShopList || []
        this.activityGather.id = res.rs.gatherId
        this.userActivityId = res.rs.activityId

        // 活动ID变化时跳转
        if (res.rs.activityId !== this.$route.params.id) {
          this.$router.push({
            path: `/edit/${2}/${res.rs.activityId}/collect`
          })
        }
      })
    },
    //暂时没用处
    imgClick () {
      console.log('点击了')
    },
    init () {
      // 监听音乐是否加载完成
      this.music.oncanplay = () => {
        this.musicFlag = true
        this.music.volume = 0.4
      }

      this.elGoodsDesciption = document.getElementById('goodsDesciption')
      this.elindustryDesc = document.getElementById('industryDesc')
      this.elSurprised = document.getElementById('elSurprised')
      this.phoneMain = document.getElementById('phone-content')

      // this.$refs.newEditor.quill.getModule("toolbar").addHandler("image", this.imgClick)

      // 手机预览层高度固定
      let e = document.getElementById('scrollWrap')
      e.addEventListener('scroll', () => {
        if (e.scrollTop >= 180) {
          this.scrollT = `top:${e.scrollTop - 180 + 60}px`
        } else {
          this.scrollT = 'top:60px'
        }
      }, false)

      document.querySelector('html').classList.add('previewPage')
    },

    haggleDetail (id) {
      // 砍价
      Activity.haggle({
        data: { userActivityId: id }
      }).then(res => {
        if (res.suc) {
          this.act = res.rs
          // erp样式
          this.erpStyle = res.rs.bizMod || {}
          if (this.erpStyle.btnBeginColor && this.erpStyle.btnEndColor) {
            let customButtonStyle = `.customButton {background: linear-gradient(to right, #${this.erpStyle.btnBeginColor}, #${this.erpStyle.btnEndColor}) !important;}`
            Utils.addStyle(customButtonStyle, 'customButton')
          }

          for (let item in this.form) {
            this.form[item] = res.rs[item] ? res.rs[item] : this.form[item]
          }
          // 主图列表地址转为数组
          this.form.imgList = res.rs.imgList ? JSON.parse(res.rs.imgList) : []

          // 标题列表获取
          this.activityNameList.arr = (res.rs.activityNameList && JSON.parse(res.rs.activityNameList)) || this.activityNameList.arr

          // 主办方信息展示
          this.activityFormList = res.rs.activityFormList
          if (res.rs.activityHaggle) {
            for (let item in this.activityHaggle) {
              this.activityHaggle[item] = res.rs.activityHaggle[item]
                ? res.rs.activityHaggle[item]
                : ''
            }
          }

          if (res.rs.goodsCount === -1) {
            this.limitShopCount = false
          }
          this.music.src = this.form.musicUrl
          this.imgContent.arr = this.form.imgList.slice(0, 4)

          if (res.rs.activityShopList) {
            this.activityShopList = res.rs.activityShopList || []
          }

          for (let item in this.industry) {
            this.industry[item] = res.rs[item]
          }

          res.rs.shareTitleList = res.rs.shareTitleList ? JSON.parse(res.rs.shareTitleList) : []
          for (let item in this.shareSet) {
            this.shareSet[item] = res.rs[item]
          }
        } else {
          // this.$router.go(-1)
        }
      }).catch(data => {})
    },
    gatherDetail (id) {
      // 集卡
      Activity.gather({
        data: {
          bizUserActivityId: id
        }
      }).then(res => {
        if (res.suc) {
          this.act = res.rs
          // erp样式
          this.erpStyle = res.rs.bizMod || {}
          if (this.erpStyle.btnBeginColor && this.erpStyle.btnEndColor) {
            let customButtonStyle = `.customButton {background: linear-gradient(to right, #${this.erpStyle.btnBeginColor}, #${this.erpStyle.btnEndColor}) !important;}`
            Utils.addStyle(customButtonStyle, 'customButton')
          }

          for (let item in this.form) {
            this.form[item] = res.rs[item] ? res.rs[item] : this.form[item]
          }
          // 主图列表地址转为数组
          this.form.imgList = JSON.parse(this.form.imgList)

          // 标题列表获取
          this.activityNameList.arr = (res.rs.activityNameList && JSON.parse(res.rs.activityNameList)) || this.activityNameList.arr

          // 主办方信息展示
          this.activityFormList = res.rs.activityFormList
          this.activityGatherCardList = res.rs.activityGatherCardList
          // this.activityHaggle=res.rs.activityHaggle
          if (res.rs.activityHaggle) {
            for (let item in this.activityHaggle) {
              this.activityHaggle[item] = res.rs.activityHaggle[item]
                ? res.rs.activityHaggle[item]
                : ''
            }
          }

          // res.rs.goodsCount === -1 ? (this.limitShopCount = false) : true
          if (res.rs.goodsCount === -1) {
            this.limitShopCount = false
          }
          this.music.src = this.form.musicUrl
          this.imgContent.arr = this.form.imgList.slice(0, 4)

          if (res.rs.activityShopList) {
            this.activityShopList = res.rs.activityShopList || []
          }

          for (let item in this.industry) {
            this.industry[item] = res.rs[item]
          }

          res.rs.shareTitleList = res.rs.shareTitleList ? JSON.parse(res.rs.shareTitleList) : []
          for (let item in this.shareSet) {
            this.shareSet[item] = res.rs[item]
          }
        }
      })
    },
    plantDetail (id) {
      // 种树  目前没改动
      Activity.haggle({
        data: { userActivityId: id }
      }).then(res => {
        if (res.suc) {
          this.act = res.rs
          // erp样式
          this.erpStyle = res.rs.bizMod || {}
          if (this.erpStyle.btnBeginColor && this.erpStyle.btnEndColor) {
            let customButtonStyle = `.customButton {background: linear-gradient(to right, #${this.erpStyle.btnBeginColor}, #${this.erpStyle.btnEndColor}) !important;}`
            Utils.addStyle(customButtonStyle, 'customButton')
          }

          for (let item in this.form) {
            this.form[item] = res.rs[item] ? res.rs[item] : this.form[item]
          }
          // 主图列表地址转为数组
          this.form.imgList = res.rs.imgList ? JSON.parse(res.rs.imgList) : []

          // 标题列表获取
          this.activityNameList.arr = (res.rs.activityNameList && JSON.parse(res.rs.activityNameList)) || this.activityNameList.arr

          // 主办方信息展示
          this.activityFormList = res.rs.activityFormList
          if (res.rs.activityHaggle) {
            for (let item in this.activityHaggle) {
              this.activityHaggle[item] = res.rs.activityHaggle[item]
                ? res.rs.activityHaggle[item]
                : ''
            }
          }

          if (res.rs.goodsCount === -1) {
            this.limitShopCount = false
          }
          this.music.src = this.form.musicUrl
          this.imgContent.arr = this.form.imgList.slice(0, 4)

          if (res.rs.activityShopList) {
            this.activityShopList = res.rs.activityShopList || []
          }

          for (let item in this.industry) {
            this.industry[item] = res.rs[item]
          }

          res.rs.shareTitleList = res.rs.shareTitleList ? JSON.parse(res.rs.shareTitleList) : []
          for (let item in this.shareSet) {
            this.shareSet[item] = res.rs[item]
          }
        } else {
          // this.$router.go(-1)
        }
      }).catch(data => {})
    }

  },
  computed: {
    editor () {
      return this.$refs.newEditor.quill
    }
  },
  mounted () {
    this.init()

    // 获取活动ID
    let { id, type } = this.$route.params
    this.editType = type
//    console.log('啊啊啊啊啊啊'+'type是'+type+'edittype是'+this.editType)
//    console.log('this.$route.params是'+this.$route.params)
    this.userActivityId = id

    switch (type) {
    case '1':
      this.curTemplate = 'PreviewHagglecollect'
      this.haggleDetail(id)
      break
    case '2':
      this.curTemplate = 'PreviewCardscollect'
      this.gatherDetail(id)
      break
    case '3':
      this.curTemplate = 'PreviewPlanttrees'
      this.plantDetail(id)
      break
    default:
      break
    }
  },
  beforeDestroy () {
    this.music.pause()
    this.music = null

    document.querySelector('html').classList.add('previewPage')
  }
}
</script>

<style lang="scss" scoped>
/*// 集卡*/
.cards-setting {
  border: 1px solid #D9D9D9;
  padding: 18px 24px;
  .cards-setting_tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #979797;
    font-size: 13px;
  }
  .presetCards {
    display: flex;
    flex-flow: row wrap;
    margin-right: -10px;

    .presetCard-item {
      position: relative;
      width: 64px;
      height: 86px;
      margin-right: 10px;
      margin-bottom: 10px;
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
    .presetCard-add {
      border: 1px solid #666;
      box-sizing: border-box;

      .cardAddBtn {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: #333;
        cursor: pointer;
      }
    }
  }
}
</style>


<style type="text/css" src="common/style/module/manage/new-editor.scss" scoped></style>
<style lang="scss" src="common/style/module/manage/new-setting.scss" scoped></style>

<style lang="scss">
.el-dialog{
  border-radius: 6px;
  .el-dialog__header{
    background: #fc4a46;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    .el-dialog__title{
      color: #fff;
    }
  }
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #fc4a46;
  background: #fc4a46;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #fc4a46;
}
</style>
