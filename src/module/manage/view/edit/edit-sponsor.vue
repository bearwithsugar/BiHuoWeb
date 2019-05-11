<template>
  <div class="box">
    <el-form size="medium" label-width="92px">
      <el-form-item label="*机构标志：">
        <div class="logo-img">
          <img :src="industry.industryLogo">
          <label for="industryLogo"></label>
          <input type="file" id="industryLogo" @change="imgUpload($event,'user_icon')" style="visibility: hidden;">
        </div>

      </el-form-item>
      <div class="dashed"></div>
      <el-form-item label="*机构名称：">
        <el-input :disabled="true" v-model="industry.industryName"></el-input>
      </el-form-item>

      <el-form-item label="*机构电话：">
        <el-input :disabled="true" v-model="industry.industryPhone"></el-input>
      </el-form-item>

      <el-form-item label="*机构地址：">
        <el-cascader :disabled="true" @change="addressChange" v-model="sAddress" :options="city" :props="cascaderCityConf" style="width: 180px;" change-on-select></el-cascader>
        <el-input v-model="industry.industryStreet" style="width: 200px;" class="editState"></el-input>

      </el-form-item>

      <el-form-item label="*机构简介：">
        <quill-editor v-model="industry.industryDesc" style="height: 190px" ref="myQuillEditor" :options="editorOption" @change="onEditorChange">
        </quill-editor>
      </el-form-item>

      <el-form-item label="二维码：" style="margin-top: 86px">
        <img :src="industry.industryUrl" width="90" height="90" style="float: left;">
        <div style="float: left;margin:10px 0 0 20px;">
          <label class="label-button" for="qrcodeImg">修改</label>
          <p class="font-small mar-t-15">建议最佳尺寸：300*300.jpg/.png/.gif,小于1M。</p>
          <input type="file" id="qrcodeImg" @change="imgUpload($event,'user_qrcode')" style="visibility: hidden;">
        </div>
      </el-form-item>

      <el-form-item label="其他门店：" style="padding: 15px;">
        <div class="other mar-t-15" v-for="(item,index) in activityShopList" :key="'activityShopList' + index">
          <div class="other-head" @click="showDetails(index)">
            <el-checkbox label="" v-model="item.confirm"></el-checkbox>
            <span class="mar-10" v-show="!item.shopShow">{{item.shopName}}</span>
            <el-input size="mini" v-model="item.shopName" v-show="item.shopShow" style="width: 180px"></el-input>
            <div class="remove" @click="removeShop(index)"><i class="v-icon v-icon-wrong"></i></div>
          </div>

          <div class="portais" v-show="item.shopShow">
            <div class="portais-text">
              <p class="font-small">联系电话：</p>
              <p class="font-small">联系人：</p>
              <p class="font-small">地址：</p>
            </div>
            <div class="portais-input">
              <el-input size="mini" v-model="item.shopPhone"></el-input>
              <el-input size="mini" v-model="item.contacts"></el-input>
              <el-input size="mini" v-model="item.shopAddress"></el-input>
            </div>
            <el-button @click="doPortai(index)" size="mini" style="float: right;margin:8px 24px 10px 0px">确定</el-button>
            <div style="clear: both;"></div>
          </div>
        </div>
        <el-button size="small" @click="addShop">添加门店</el-button>
      </el-form-item>
    </el-form>

    <div class="next">
      <router-link :to="{name:'shareEdit', params: { id: $route.params.id} }">
        <img src="static/imgs/manage/editor/next.png">
        <span>下一步</span>
      </router-link>
    </div>
  </div>
</template>

<script type="text/javascript">
import CITY from 'src/lib/city.js'
import fileUpload from 'src/server/fileUpload'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  props: {
    industry: {
      type: Object
    },
    activityShopList: {
      type: Array
    },
    preview: {
      type: Object
    },
    phoneMain: {
    }
  },
  data () {
    return {
      name: '',
      portaisShow: true,
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
      city: CITY, // 省市区三级js数据
      cascaderCityConf: {
        // 级联筛选的字段配置
        value: 'name',
        label: 'name',
        children: 'sub'
      },
      sAddress: [],
      addressFlag: 0
    }
  },
  methods: {
    imgUpload (e, type) {
      let ele = event.target || event.srcElement
      let file = ele.files[0]
      let formData = new FormData()
      formData.append('imgType', type)
      formData.append('file', file)
      console.log({ imgType: file.type, file: file })
      let params = {
        data: formData,
        methods: 'post',
        ContentType: 'multipart/form-data'
       // baseURL: 'http://1655w941f1.51mypc.cn:18888'
      }

      fileUpload.imgUpload(params).then(res => {
        console.log(res)
        if (res.suc) {
          console.log(res.rs)
          type === 'user_qrcode'
            ? (this.industry.industryUrl = res.rs)
            : (this.industry.industryLogo = res.rs)
          console.log(this.industry.industryLogo)
        } else {
          console.log(res.msg)
        }
      })
    },
    // 展开门店信息
    showDetails (index) {
      let item = this.activityShopList[index]
      item.shopShow = true
      this.$set(this.activityShopList, index, item)
    },
    addressChange () {
      console.log(this.sAddress)
      this.industry.industryProvince = this.sAddress[0]
      this.industry.industryCity = this.sAddress[1]
      this.industry.industryArea = this.sAddress[2]
    },
    onEditorChange ({ quill, html, text }) {
      this.$emit('sponsorChange', html)
    },
    // 收回门店信息
    doPortai (index) {
      let item = this.activityShopList[index]
      item.shopShow = false
      this.$set(this.activityShopList, index, item)
    },
    // 添加门店
    addShop () {
      this.activityShopList.push({
        activityId: '',
        contacts: '',
        shopName: '',
        id: '',
        shopAddress: '',
        shopPhone: ''
      })
    },
    // 删除门店
    removeShop (index) {
      this.activityShopList.splice(index, 1)
    }
  },
  watch: {
    // 监听地址变化
    'industry.industryCity': function (val) {
      this.addressFlag++
    },
    'industry.industryProvince': function (val) {
      this.addressFlag++
    },
    'industry.industryArea': function (val) {
      this.addressFlag++
    },
    'addressFlag': function (val) {
      if (val === 3) {
        this.sAddress = []
        this.sAddress.push(this.industry.industryProvince)
        this.sAddress.push(this.industry.industryCity)
        this.sAddress.push(this.industry.industryArea)
      }
    }
  },
  created () {
    this.activityShopList.forEach(function (item) {
      item.shopShow = false
      item.confirm = true
    })
  },
  mounted () {
    this.sAddress = []
    this.sAddress.push(this.industry.industryProvince)
    this.sAddress.push(this.industry.industryCity)
    this.sAddress.push(this.industry.industryArea)
    this.preview.type = 1
    setTimeout(() => {
      this.phoneMain.scrollTop = 1200
    }, 60)

    console.log(this.sAddress)
  },
  beforeDestroy () {
    this.preview.type = 2
  }
}
</script>

<style type="text/css" src="common/style/module/manage/new-editor.scss" scoped></style>
<style lang="scss" scoped>
.w-220 {
  width: 220px;
}

.portais {
  padding: 10px;
  .portais-text {
    width: 80px;
    float: left;
    margin-top: 6px;
    p {
      margin: 0 0 27px 0;
    }
  }

  .portais-input {
    width: 200px;
    float: left;
  }
}
.logo-img {
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: block;
  margin: auto;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
.other {
  border: 1px solid #d9d9d9;
  padding: 0 15px;
  overflow: hidden;
  .other-head {
    position: relative;

    .remove {
      position: absolute;
      top: 0;
      right: 0;
      width: 15px;
      height: 15px;
      font-size: 20px;
      cursor: pointer;
      color: #fc4a46;
    }

    img {
      float: right;
    }
  }
}
</style>