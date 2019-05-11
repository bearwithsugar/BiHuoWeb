<template>
  <div>
  	<modal :contentType="modal.content"
      v-if="modal.show"
      v-on:toggleModal="toggleModal"
      class="perviewModal"
      style="z-index: 100">
      <div class="m-nav">
        <span :class="{'act': curTab == 'preview'}" @click="curTab = 'preview'">活动预览</span>
        <span :class="{'act': curTab == 'manage'}" @click="curTab = 'manage'">渠道管理</span>
      </div>
      <div class="m-content">
        <!--活动预览内容-->
        <div v-show="curTab == 'preview'" class="preview flexBox">
          <div style="width: 310px; height: 500px;margin:10px 30px;">
            <iframe :src="link.previewUrl" style="width: 100%;height: 100%"></iframe>
          </div>
          <!--右侧分享区域-->
          <!--右侧分享区域标题-->
          <div class="preview-data">
            <div class="img-box flexBox">
              <img :src="indexAct.img" alt="" />
              <div class="flex1">
                <div class="title">
                  <span class="title-tag">砍价</span>
                  <span class="title-text">{{indexAct.activityName}}</span>
                </div>
                <p class="des" v-html="indexAct.description"></p>
                <div class="time">
                  <span class="val">
                    <i class="el-icon-time"></i>创建时间：{{formatTime(indexAct.createTime)}}</span>
                  <span class="edit" @click="toEdit">去编辑
                    <span class="el-icon-edit-outline"></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="preview-share">
              <div class="share-code">
                <img :src="link.shareUrl" alt="">
                <div class="share-code_label">扫一扫分享到微信</div>
                <div class="down-code">
                  <a :href="link.shareUrl" download><i class="el-icon-download"></i>下载二维码</a>
                </div>
              </div>
              <div class="share-otherWay">
                <div class="share-otherWay_title">分享到：</div>
                <ul class="other-way">
                  <li>
                    <a :href="shareQQUrl"><i class="v-icon v-icon-qq"></i>QQ</a>
                  </li>
                  <li>
                    <a :href="shareQzUrl"><i class="v-icon v-icon-qq_zone"></i>QQ空间</a>
                  </li>
                  <li>
                    <a :href="shareWbUrl"><i class="v-icon v-icon-micro_blog"></i>微博</a>
                  </li>
                </ul>
                <div class="link-copy-wrap">
                  <el-input placeholder="请输入内容" v-model="link.publishUrl">
                    <template slot="append">
                      <div @click="doCopy(link.publishUrl)">复制链接</div>
                    </template>
                  </el-input>
                </div>
                <div class="preview-share_describe">您可以将活动链接复制到您的公众号菜单或自定义回复中。</div>
              </div>
            </div>
            <div class="spread">
              <i class="el-icon-edit-outline"></i>
              我要推广
            </div>
          </div>
        </div>

        <!--渠道管理内容-->
        <div v-show="curTab == 'manage'" class="manage">
          <div class="label">哪个渠道客户/流量最多？设置不同渠道分享链接你就知道</div>
          <div class="spreadWay">
            <div class="default">
              <div style="font-size:16px;color: #5A5A5A">默认渠道分享：</div>


              //加载二维码的页面
              <div class="share-code">
                <img :src="link.shareUrl" alt="">
                <div class="share-code_label" style="color: #5A5A5A">扫一扫分享到微信
                  <a :href="link.shareUrl" download><i class="el-icon-download"></i></a>
                </div>
                <!-- <div class="down-code">
                  <i class="el-icon-download"></i>下载二维码</div> -->
              </div>



              <div class="link-copy-wrap">
                <el-input placeholder="请输入内容" v-model="link.publishUrl" class="link-copy-input">
                  <template  slot="append">
                    <div @click="doCopy(link.publishUrl)">复制链接</div>
                  </template>
                </el-input>
              </div>
              <div class="preview-share_describe">您可以将活动链接复制到您的公众号菜单，或自定义回复中</div>
            </div>
            <div class="other">
              <div style="font-size: 16px;color: #5A5A5A">其他渠道分享：</div>
              <div class="other-describe">
                <span class="other-describe_text">您可将连接（或二维码）放置在微信公众号、或者户外广告等不同渠道，供用户访问。结果统计中可区分用户来自哪个渠道</span>
                <el-button @click="createChannel('默认值')">
                  <i class="el-icon-plus"></i>添加渠道</el-button>
              </div>
              <div class="spread-way-table">
                <el-table :data="spreadWayTable"  style="width: 100%" border max-height="250">
                  <el-table-column label="渠道名称" type="index" prop="name" width="250" align="center">
                    <template slot-scope="scope">
                      <div>
                        <el-input :class="{'editState' : editState.nameState == false}"
                        v-model="scope.row.channel"
                        :placeholder="editState.nameState ? '未填写' : '最多20字'"
                        :disabled="editState.nameState"
                        style="width: 72%;float: left;">
                        </el-input>
                        <el-button type="text" v-show="editState.nameState"
                        @click.prevent="editState.nameState = !editState.nameState"
                        style="margin-left: 10px">
                          修改
                        </el-button>

                        <el-button v-show="!editState.nameState"
                        @click.prevent="editChannel(scope.row)"
                        size="small"
                        style="float: right;margin-top: 5px"
                        >
                          保存
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="链接" align="center">
                    <template slot-scope="scope">
                      <div>
                        <span>{{scope.row.linkUrl}}</span>
                        <el-button
                          type="text"
                          v-clipboard:copy='scope.row.linkUrl'
                          v-clipboard:success="copySuccess"
                          v-clipboard:error="copyError">复制</el-button>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="二维码" align="center" width="80">
                    <template slot-scope="scope">
                      <div class="spread-code">
                        <img :src="scope.row.urlImg" alt="">
                        <a :href="scope.row.urlImg" download><i class="el-icon-download"></i></a>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
            <div style="float: right;position: relative; top:-54px;">
              <el-button @click="publish">确定发布</el-button>
              <el-button @click="modal.show = false">再看看</el-button>
            </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script type="text/javascript">
// import VDialog from 'src/components/dialog'
import User from 'src/server/user.js'
import Activity from 'src/server/activity.js'
import { Message } from 'element-ui'
import modal from 'src/components/modal/index.vue'
import utils from 'src/lib/utils.js'
export default {
  components: {
    modal
  },
  props: {
    actid: {
      type: Number,
      required: true
    },
    indexAct: {
      type: Object
    },
    modal: {
      type: Object
    },
    curModalTab: {
      type: String,
      default: 'manage'
    }
  },
  data () {
    return {
      editState: {
        nameState: true
      },
      link: {},
      spreadWayTable: [],
      channelList: null,
      curTab: this.curModalTab,
      shareQQUrl: '',
      shareQzUrl: '',
      shareWbUrl: ''
    }
  },
  methods: {
    doCopy (msg) {
      this.$copyText(msg).then((e) => {
        Message({ type: 'success', message: '复制成功', ceter: true })
      }, (e) => {
        Message({ type: 'error', message: '复制失败', ceter: true })
      })

    },
    copySuccess (e) {
      Message({ type: 'success', message: '复制成功', ceter: true })
    },
    copyError (e) {
      Message({ type: 'error', message: '复制失败', ceter: true })
    },
    formatTime (dateStr) {
      return utils.formatDate(new Date(dateStr))
    },
    toEdit () {
      this.$router.push({
        path: `/edit/${this.indexAct.innerType}/${this.actid}/collect`
      })
      this.modal.show = false
    },
    toggleModal () {
      this.modal.show = !this.modal.show
    },
    query () {
      User.query({
        data: {
          activityId: this.actid
        }
      }).then(res => {
        if (res.suc && res.code === 200) {
          this.spreadWayTable = res.rs
          this.spreadWayTable.forEach(item => {
            item.channelID = item.id
            item.nameState = true
          })
        }
      })
    },
    handleDelete (index, row) {
      // 删除当前选中行数据
      let params = {
        id: row.channelID
      }
      User.channelDelete({
        data: params
      }).then(res => {
        if (res.suc && res.code === 200) {
          this.spreadWayTable.splice(index, 1)
        }
      })
    },
    editChannel (row) {
      // 编辑渠道
      let params = {
        id: row.channelID,
        channelName: row.channel
      }
      User.channelEdit({
        data: params
      })
      this.editState.nameState = true
    },
    createChannel (val) {
      // 添加渠道
      let params = {
        channelName: val,
        userActivityId: this.actid
      }

      User.channelCreate({
        data: params
      }).then(res => {
        this.query()
      })
    },
      // 确认发布
    publish () {
      Activity.publish({
        data: { id: this.actid }
      }).then(res => {
        if (res.suc) {
          Message({ type: 'success', message: '发布成功' })
          this.$router.push({path: '/nav-my'})
        }
      })
    }
  },
  mounted () {
    this.query()

    Activity.link({
      data: {
        activityId: this.actid
      }
    }).then(res => {
      if (res.suc) {
        this.link = res.rs || {}
        //console.log('啊啊啊啊啊啊啊啊'+this.link.previewUrl)
        let shareTitle = this.indexAct.shareTitle || this.indexAct.title
        let shareDesc = this.indexAct.shareDesc || this.indexAct.desc
        let shareImg = this.indexAct.img || this.indexAct.mainImg
        let shareUrl = encodeURIComponent(this.link.publishUrl)
        this.shareQQUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${shareUrl}&sharesource=qzone&title=${shareTitle}&pics=${shareImg}&summary=${shareDesc}&desc=${shareDesc}`
        this.shareQzUrl = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareUrl}&sharesource=qzone&title=${shareTitle}&pics=${shareImg}&summary=${shareDesc}`
        this.shareWbUrl = `http://service.weibo.com/share/share.php?url=${shareUrl}&sharesource=weibo&title=${shareTitle}&pic=${shareImg}&appkey=`
      }
    })
  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/my.scss">

</style>
<style lang="scss">
.perviewModal {
  .link-copy-wrap {
    .link-copy-input {
      margin-top: 34px;
    }
  }
  .el-input-group__append, .el-input-group__prepend {
    cursor: pointer;
    color: #fff !important;
    text-align: center;
    background: #fc4a46 !important;
  }
}
</style>
