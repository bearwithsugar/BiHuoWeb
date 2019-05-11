<template>
  <div class="wrap nav-center-stores">
    <div class="box">
      <div class="add">
            <img :src="userImgUrl" style="width: 90px;height: 90px;margin-top: 10px;margin-left: 10px">
            <input type="file" @change="fileUserImg">
      </div>
      <div class="box-detail stores-manage-wrap">
        <el-form :model="organization">
          <el-form-item label="机构名称" :label-width="labelWidth" prop="name">
            <el-col :span="16">
              <el-input :class="{'editState': editState.nameState == false}" v-model="organization.name" :placeholder="editState.nameState ? '未填写' : '最多20字'" :disabled="editState.nameState"></el-input>
              <!-- <el-button v-show="editState.nameState" type="text" @click.prevent="editState.nameState = false">修改</el-button>
              <el-button v-show="!editState.nameState" size="mini" @click.prevent="editOrganizationName">确定</el-button> -->
            </el-col>
            <el-col :span="8">
              <div class="el-form_item-tip">机构名称在机构信息模块展示</div>
            </el-col>
          </el-form-item>
        </el-form>
        <el-form :model="organization">
          <el-form-item label="机构电话" :label-width="labelWidth" prop="phone">
            <el-col :span="16">
              <el-input :class="{'editState': editState.phoneState == false}" v-model="organization.phone" :placeholder="editState.phoneState ? '未填写' : '请输入手机号码'" :disabled="editState.phoneState"></el-input>
              <el-button v-show="editState.phoneState" type="text" @click.prevent="editState.phoneState = false">修改</el-button>
              <el-button v-show="!editState.phoneState" size="mini" @click.prevent="editOrganizationPhone">确定</el-button>
            </el-col>
            <el-col :span="8">
              <div class="el-form_item-tip">机构电话在机构信息模块展示</div>
            </el-col>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="机构类型" :label-width="labelWidth">
            <el-col :span="16">
              <!-- <el-select v-model="organization.types[0].text" placeholder="请选择">
                <el-option v-for="item in organization.types" :key="item.id" :label="item.text" :value="item.text">
                </el-option>
              </el-select> -->
              <span style="font-size: 14px;color: #5A5A5A;margin-left: 6px">{{listData.industryName}}</span>
              <div class="select-type">
                <el-button v-for="(type, index) in selectedOrganizationType" size="small" :key="index">{{type}}
                  <i v-show="!editState.typeState" class="el-icon-circle-close el-icon--right" @click="deleteOrganizationType(index)"></i>
                </el-button>
              </div>
              <el-button v-if="selectedOrganizationType.length < childNumber" size='mini' border @click.prevent="addOrganizationType">添加</el-button>
              <el-button v-show="selectedOrganizationType.length > 0 && editState.typeState" type="text" @click.prevent="editState.typeState = false">修改</el-button>
              <el-button v-show="selectedOrganizationType.length > 0 && !editState.typeState" type="text" @click.prevent="editOrganizationType">完成</el-button>
            </el-col>
            <!-- <el-col :span="2">
              <el-button v-show="editState.typeState" type="text" @click.prevent="editState.typeState = false">修改</el-button>
              <el-button v-show="!editState.typeState" @click.prevent="editState.typeState = true">完成</el-button>
            </el-col> -->
            <el-col :span="8">
              <div class="el-form_item-tip">机构类型在机构信息模块展示</div>
            </el-col>
          </el-form-item>
        </el-form>

        <el-form>
          <el-form-item label="机构地址" :label-width="labelWidth" class="organAdr">
            <el-col :span="16">
              <el-cascader
                :options="city"
                :props="cascaderCityConf"
                v-model="selectedAdr"
                @change="cascaderCityChange" disabled = "true">

              </el-cascader>
              <el-input v-show="!editState.addrState" class="editState" v-model="organization.addr"></el-input>
              <el-input v-show="editState.addrState" v-model="organization.addr" :disabled="true"></el-input>

              <el-button v-show="editState.addrState" type="text" @click.prevent="editState.addrState = false">修改</el-button>
              <el-button v-show="!editState.addrState" size="mini" @click.prevent="editOrganizationAddr">完成</el-button>
            </el-col>
            <el-col :span="8">
              <div class="el-form_item-tip">机构地址将在显示模块展示</div>
            </el-col>
          </el-form-item>
        </el-form>


        <el-form>
          <el-form-item label="机构简介" :label-width="labelWidth">
            <el-col :span="16">
              <el-input :class="{'editState': editState.descriptState == false}" v-model="organization.descript" type="textarea" :rows="3" resize="none" :disabled="editState.descriptState"></el-input>
              <el-button v-show="editState.descriptState" type="text" @click.prevent="editState.descriptState = false" style="vertical-align: top;">修改</el-button>
              <div v-show="!editState.descriptState">
                <el-button size="mini" @click.prevent="editOrganizationDescript">完成</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="el-form_item-tip">机构简介将在显示模块展示</div>
            </el-col>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="二维码" :label-width="labelWidth">
            <el-col :span="16">
              <div class="qrcodeAdd">
              <img :src="qrcodeUrl" style="width: 80px;height: 80px">
              <input type="file" @change="qrcodeImg">
              </div>
              <el-button v-show="!editState.qrcodeState" size="mini" @click.prevent="editState.qrcodeState = true">完成</el-button>
            </el-col>
            <el-col :span="8">
              <div class="el-form_item-tip">公众号或个人微信，不添加则不显示</div>
            </el-col>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="门店管理" :label-width="labelWidth">
            <el-col :span="16">
              <el-input v-show="organization.stores.length == 0" placeholder="未填写" :disabled="true"></el-input>
              <el-card v-show="organization.stores.length > 0" class="store-card" v-for="(storeItem, index) in organization.stores" :key="storeItem.id">
                <div slot="header" class="clearfix">
                  <!-- <span class="card-store-name">{{storeItem.name}}</span> -->
                  <i v-show="!editState.storesState" class="el-icon-close btn-remove-store" @click="removeStore(index)"></i>
                </div>
                <el-form :label-width="labelWidth" :rules="rules">
                  <el-form-item label="名称">
                    <span>{{storeItem.name}}</span>
                  </el-form-item>
                  <el-form-item label="电话" prop="phone">
                    <span>{{storeItem.phone}}</span>
                  </el-form-item>
                  <el-form-item label="联系人">
                    <span>{{storeItem.linkMan}}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{storeItem.addr}}</span>
                  </el-form-item>
                </el-form>
              </el-card>
              <div>
                <el-button type="text" v-show="organization.stores.length >= 0&&organization.stores.length < 5 " @click.prevent="storeAddDialog = true">添加</el-button>
                <el-button v-show="editState.storesState && organization.stores.length > 0 " type="text" @click.prevent="editState.storesState = false">修改</el-button>
                <el-button v-show="!editState.storesState && organization.stores.length > 0" size="mini" @click.prevent="editOrganizationStores">完成</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="el-form_item-tip">最多添加5个门店</div>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-modal">
        <el-dialog title="添加机构类型" :visible.sync="organizationTypeDialog">
          <div class="dialog-hd_label">机构类型可以多选</div>
          <div class="dialog-bd">
            <el-checkbox-group v-model="selectedOrganizationType" @change="changeIndustry">
              <el-checkbox-button v-for="(item) in childData" :label="item.name" round :key="item.id">{{item.name}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="confirmOrganizationType">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加门店" :visible.sync="storeAddDialog">
          <el-form :model="store" :label-width="labelWidth" :rules="rules">
            <el-form-item label="名称">
              <el-input v-model="store.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="store.phone"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="store.linkMan"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="store.addr"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="addStore">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import utils from 'src/lib/utils'
import CITY from 'src/lib/city.js'
import User from 'src/server/user'
import fileUpload from 'src/server/fileUpload'
import { domainConfig } from 'src/lib/config-axios.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      qrcodeUrl: null,
      userImgUrl: null,
      selectedAdr: [],
      selectPro: null,
      selectCity: null,
      selectArea: null,
      labelWidth: '100px', // label-width宽度
      editState: {
        // true为显示状态，false为编辑状态
        nameState: true,
        phoneState: true,
        typeState: true,
        addrState: true,
        descriptState: true,
        qrcodeState: true,
        storesState: true
      },
      listData: null,
      industryID: 100017,
      childData: null,
      childNumber: 0,
      selectedIndustry: null,
      organizationTypeDialog: false, // 添加机构类型对话框
      storeAddDialog: false, // 添加门店的对话框
      organizationType: [
        {
          id: 1,
          text: '胎教/早教'
        },
        {
          id: 2,
          text: '幼儿园'
        },
        {
          id: 3,
          text: '课外辅导'
        },
        {
          id: 4,
          text: '舞蹈艺术'
        },
        {
          id: 5,
          text: '体育培训'
        },
        {
          id: 6,
          text: '书法艺术'
        },
        {
          id: 7,
          text: '音乐艺术'
        },
        {
          id: 8,
          text: '棋类培训'
        },
        {
          id: 9,
          text: '作文培训'
        },
        {
          id: 10,
          text: '主持人口才'
        },
        {
          id: 11,
          text: '少儿英语'
        }
      ], // 机构类型
      selectedId: [],
      selectedOrganizationType: [],
      organization: {
        name: '必火', // 名称
        phone: '18210123456', // 电话
        types: [
          {
            id: 1,
            text: '教育行业'
          }
        ], // 类型
        addr: '北京西城区', // 地址
        descript: '这里是机构的描述', // 描述
        qrcode: '', // 二维码
        stores: [] // 门店
      }, // 机构
      stores: [], // 已添加的门店
      storesID: [],
      newStoreId: null,
      /* store: {
        name: '必火', // 名称
        phone: '18210123456', // 电话
        linkMan: 'vins', // 联系人
        addr: '北京西城区' // 地址
      }, // 门店 */
      store: {},
      uploadUrl: 'https://jsonplaceholder.typicode.com/posts/', // 二维码上传地址
      city: CITY, // 省市区三级js数据
      cascaderCityConf: {
        // 级联筛选的字段配置
        value: 'name',
        label: 'name',
        children: 'sub'
      },
      rules: {
        // 表单验证规则
        name: [
          {
            type: 'string',
            required: true,
            min: 0,
            max: 20,
            message: '最长20个汉字',
            trigger: 'change'
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/,
            message: '请填写正确的手机格式',
            trigger: 'blur'
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
      if (res.rs.headUrl) {
        this.userImgUrl = res.rs.industryLogo
        console.log('图片上传X: ' + res.rs.headUrl)
      }
      if (!res.rs.headUrl) {
        this.userImgUrl = '/static/imgs/manage/index/add-head-img.png'
        console.log('图片上传X: ' + res.rs.headUrl)
      }
    })
    User.self().then(res => {
      if (res.rs.brandQrUrl) {
        this.qrcodeUrl = res.rs.brandQrUrl
        console.log('图片上传2X: ' + res.rs.brandQrUrl)
      }
      if (!res.rs.brandQrUrl) {
        this.qrcodeUrl = '/static/imgs/manage/index/qrcodeAdd.png'
        console.log('图片上传2X: ' + res.rs.brandQrUrl)
      }
    })
    User.industry().then(res => {
      User.industryInfo().then(res => {
        this.listData = res.rs
        console.log(res.rs)
        this.industryID = res.rs.industry
        this.organization.stores = res.rs.bizUserShops
        this.organization.stores.forEach((item) => {
          this.storesID.push(item.id)
          item.name = item.shopName
          item.phone = item.shopPhone
          item.linkMan = item.shopContact
          item.addr = item.shopAddress
          console.log('storesId: ' + this.storesID)
        })
        console.log('门店' + this.organization.stores)
        this.organization.name = res.rs.brandName
        this.organization.phone = res.rs.brandPhone
        this.organization.descript = res.rs.industryDesc
        this.organization.addr = res.rs.street
        this.selectedAdr.push(res.rs.province)
        this.selectedAdr.push(res.rs.city)
        this.selectedAdr.push(res.rs.area)
        console.log(this.selectedAdr)
        let params = {
          id: this.industryID
        }
        console.log('父标签: ' + this.industryID)
        User.childIndustry({
          data: params
        }).then(res => {
          this.childData = res.rs
          this.childNumber = this.childData.length
          if (this.listData.subIndustry != null) {
            this.selectedIndustry = this.listData.subIndustry.split(',')
            console.log('selectedIndustry: ' + this.selectedIndustry)
            this.selectedIndustry.forEach(item => {
              if (item !== '') {
                console.log(this.childData)
                this.childData.forEach((item2) => {
                  console.log('item2:' + item2)
                  if (item2.id === item) {
                    this.selectedOrganizationType.push(item2.name)
                    this.selectedId.push(item2.id)
                    console.log('1234:' + item2)
                  }
                })
              }
            })
          }
        })
        console.log('subIndustry' + this.listData.subIndustry)
      })
    })

    // this.$store.commit("user/UPDATE_USERINFO", res.rs);
    /* this.selectedOrganizationType.forEach((item,index) => {
      this.childData.forEach((item1) => {
        if (item1.name == item.name) {
        }
      })
    }) */
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.qrcodeUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    qrcodeImg (e) {
      let file = e.target.files[0]
      let formData = new FormData()
      formData.append('imgType', 'user_qrcode')
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
          this.qrcodeUrl = res.rs
          let temp = {
            brandQrUrl: this.qrcodeUrl
          }
          User.update({
            data: temp
          })
          console.log('图片上传2:' + this.qrcodeUrl)
        } else {
          console.log(res.msg)
        }
      })
    },
    //图片上传
    fileUserImg (e) {
      //得到图片一些参数
      let file = e.target.files[0]
      //异步上传二进制文件
      let formData = new FormData()
      //将文件转换成二进制
      formData.append('imgType', 'user_qrcode')
      formData.append('file', file)
      console.log({ imgType: file.type, file: file })
      console.log(formData)
      let params = {
        data: formData,
        methods: 'post',
        //baseURL: domainConfig.url
        baseURL:'http://47.94.87.217:18888'
      }
      fileUpload.imgUpload(params).then(res => {
        //console.log(res)
        if (res.suc) {
          this.userImgUrl = res.rs
          let temp = {
            industryLogo: this.userImgUrl
          }
          User.update({
            data: temp
          })
          console.log('图片上传: ' + this.userImgUrl)
        } else {
          //console.log(res.msg)
        }
      })
    },

    changeIndustry () {
      // 机构门店按钮变化
      this.selectedId = []
      this.childData.forEach((item) => {
        this.selectedOrganizationType.forEach((item2) => {
          if (item.name === item2) {
            this.selectedId.push(item.id)
          }
        })
      })
    },
    editOrganizationName () {
      // 机构名称的修改
      this.editState.nameState = true
      // 执行修改的响应api操作
      User.update({
        data: {
          brandName: this.organization.name
        }
      }).then(res => {
        if (res.suc) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('user/UPDATE_USERINFO', {
            brandName: this.organization.name
          })
        }
      })
    },
    editOrganizationPhone () {
      // 机构电话的修改

      // 执行修改的响应api操作
      if (!utils.checkPhone(this.organization.phone)) {
        return
      }
      this.editState.phoneState = true
      User.update({
        data: {
          brandPhone: this.organization.phone
        }
      }).then(res => {
        if (res.suc) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('user/UPDATE_USERINFO', {
            brandPhone: this.organization.phone
          })
        }
      })
    },
    editOrganizationAddr () {
      // 机构地址的修改
      this.editState.addrState = true
      // 执行修改的响应api操作
      User.update({
        data: {
          province: this.selectedAdr[0],
          city: this.selectedAdr[1],
          area: this.selectedAdr[2],
          street: this.organization.addr
        }
      }).then(res => {
        if (res.suc) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('user/UPDATE_USERINFO', {
            street: this.organization.addr
          })
        }
      })
    },
    editOrganizationDescript () {
      // 机构简介的修改
      this.editState.descriptState = true
      // 执行修改的响应api操作
      User.update({
        data: {
          industryDesc: this.organization.descript
        }
      }).then(res => {
        if (res.suc) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('user/UPDATE_USERINFO', {
            industryDesc: this.organization.descript
          })
        }
      })
    },
    editOrganizationStores () {
      // 机构门店的修改
      this.editState.storesState = true
      // 执行修改的响应api操作
    },
    confirmOrganizationType () {
      // 确定机构类型
      this.organizationTypeDialog = false
      this.editOrganizationType()
      console.log(this.selectedOrganizationType)
    },
    addOrganizationType () {
      // 添加机构类型
      this.organizationTypeDialog = true
    },
    deleteOrganizationType (index) {
      // 删除机构类型
      this.selectedOrganizationType.splice(index, 1)
      this.selectedId.splice(index, 1)
      if (this.selectedOrganizationType === '') {
        this.editOrganizationType()
      }
      /* this.editOrganizationType() */
    },
    editOrganizationType () {
      // 机构类型的修改
      let tmp = ''
      this.selectedId.forEach((item, index) => {
        if (index === 0) {
          tmp = item
        } else {
          tmp = tmp + ',' + item
        }
      })
      console.log('tmp:' + tmp)
      let params = {
        subIndustry: tmp
      }
      User.update({
        data: params
      }).then(res => {
        console.log('subIndustry:' + params.subIndustry)
      })
      this.editState.typeState = true
      // 执行修改的响应api操作
    },
    addStore () {
      // 添加门店
      if (!this.store.phone) {
        return
      }
      this.storeAddDialog = false

      let params = {
        shopName: this.store.name,
        shopPhone: this.store.phone,
        shopContact: this.store.linkMan,
        shopAddress: this.store.addr
      }
      User.shopAdd({
        data: params
      }).then(res => {
         /* console.log("subIndustry:"+subIndustry) */
        this.newStoreId = res.rs.shopId
        console.log('res.rs.shopId ' + res.rs.shopId)
        this.organization.stores.push(this.store)
        this.storesID.push(this.newStoreId)
        console.log('newStoreId' + this.newStoreId)
      })
      /* this.store.name = params.shopName
      this.store.phone = params.shopPhone
      this.store.linkMan = params.shopContact
      this.store.addr = params.shopAddress */
    },
    removeStore (index) {
      // 移除门店
      this.organization.stores.splice(index, 1)
      let params = {
        id: this.storesID[index]
      }
      console.log(this.storesID)
      User.shopDel({
        data: params
      }).then(res => {
        console.log(this.organization.stores)
      })
      this.storesID.splice(index, 1)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      // 图片上传
      this.organization.qrcode = file.url
    },
    cascaderCityChange (val) {
      // 城市级联选择
      /* this.selectedAdr = val.split(',') */
      val = val + ''
      this.selectedAdr = val.split(',')
      console.log(this.selectedAdr)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  margin-top: 16px;
  margin-bottom: 20px;
  padding-bottom: 166px;
  .qrcodeAdd {
    display: inline-block;
    position: relative;
    width: 80px;
      height: 80px;
    margin-top: 0px;
    margin-bottom: 20px;
    /* background: url(/static/imgs/manage/index/add-head-img.png) no-repeat center; */
    input {
      cursor: pointer;
      position: absolute;
      width: 80px;
      height: 80px;
      opacity: 0;
      top: 0
    }
  }
  .add {
    display: inline-block;
    position: relative;
    width: 110px;
      height: 110px;
    margin-top: 45px;
    margin-bottom: 71px;
    height: 110px;
    left: 46%;
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
  .add:hover {
        /* background: url(/static/imgs/manage/index/add-head-img2.png)
          no-repeat center; */
      }
}
</style>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

.stores-manage-wrap {
  .el-form-item__content {
    border-bottom: 1px solid #999;
  }
  .el-input,
  .el-textarea {
    display: inline-block;
    width: initial;
  }
  .el-textarea {
    width: 80%;
  }
  .el-input__inner {
    border: 1px solid #999;
    height: 1.8em;
  }
  .el-form-item__label {
    text-align: left;
  }
  .el-input.is-disabled .el-input__inner,
  .el-textarea.is-disabled .el-textarea__inner {
    background: transparent !important;
    border: none;
    cursor: text;
  }
}
.store-card {
  display: inline-block;
  width: calc((100% - 40px) / 2);
  min-width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
  box-shadow: none;
  .el-form-item__content {
    border: none;
  }
  .el-input {
    display: inline-block;
  }
  .el-input.is-disabled .el-input__inner {
    background: transparent !important;
    border: none;
    cursor: text;
  }
  .el-card__header {
    padding: 0 10px;
    color: #fc4a46;
  }
  .btn-remove-store {
    float: right;
    line-height: 40px;
  }
}

.nav-center-stores {
  .el-button--default {
    color: #fff;
    background-color: #fc4a46;
    border-color: #fc4a46;
  }
  .el-button--text {
    color: #fc4a46;
  }
  .el-checkbox-button {
    width: calc((100% - 60px) / 3);
    margin-top: 20px;
    margin-right: 20px;
  }
  .el-checkbox-button__inner {
    width: 100%;
    height: 40px;
    color: #979797;
    border: 1px solid #979797 !important;
    border-radius: 20px !important;
  }
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    color: #fff;
    background-color: #fc4a46 !important;
    border: 1px solid #fc4a46 !important;
    box-shadow: none;
  }
}
.dialog-modal {
  .el-input {
    width: 80%;
  }
}
.organAdr {
  .el-input__suffix-inner {
    display: none;
  }
}
</style>

<style scoped>
.stores-manage-wrap {
  padding: 0 53px;
}
.el-form_item-tip {
  text-align: right;
  color: #979797;
}

</style>
