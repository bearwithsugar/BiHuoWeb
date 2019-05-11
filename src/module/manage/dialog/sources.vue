<template>
  <v-dialog title="渠道管理" @close="close">
    <div class="sources-wrap">
      <div class="sources-manage">
        <div class="label">哪个渠道客户/流量最多？设置不同渠道分享链接你就知道</div>
        <div class="spreadWay">
          <div class="default">
            <div>默认渠道分享：</div>
            <div class="share-code">
              <img src="/static/imgs/index/wechat-code.png" alt="">
              <div class="share-code_label">扫一扫分享到微信
                <a :href="link.shareUrl" download><i class="el-icon-download"></i></a>
              </div>
            </div>
            <div class="link-copy-wrap">
              <el-input placeholder="请输入内容" value="http://baidu.com" class="link-copy-input">
                <template slot="append">
                <p class="text-center">复制链接</p></template>
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
              <el-table :data="spreadWayTable" style="width: 100%" border>
                <el-table-column label="渠道名称" prop="name" width="230" align="center">
                  <template slot-scope="scope">
                    <div class="edit-name">
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
                      <span>{{scope.row.link}}</span>
                      <el-button 
                        type="text"
                        v-clipboard:copy='scope.row.link'
                        v-clipboard:success="copySuccess"
                        v-clipboard:error="copyError">复制</el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="二维码" align="center" width="100">
                  <template slot-scope="scope">
                    <div class="spread-code">
                      <img :src="scope.row.code" alt="">
                      <a :href="link.shareUrl" download><i class="el-icon-download"></i></a>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div style="float: right;">
          <el-button @click="publish">确定发布</el-button>
          <el-button @click="close">再看看</el-button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import VDialog from 'src/components/dialog'
import User from 'src/server/user.js'
import Activity from 'src/server/activity.js'
import { Message } from 'element-ui'
export default {
  components: {
    VDialog
  },
  props: {
    actid: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      editState: {
        nameState: true
      },
      //渠道数据
      spreadWayTable: []
    }
  },
  methods: {
    copySuccess (e) {
      Message({ type: 'success', message: '复制成功', ceter: true })
    },
    copyError (e) {
      Message({ type: 'error', message: '复制失败', ceter: true })
    },
    close () {
      this.$emit('close')
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
        console.log(this.spreadWayTable)
      })
    },
    test (scope) {

      console.log(this.spreadWayTable[scope.$index])
      scope.row.nameState = false
      console.log(scope.row.nameState)
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
    //删除渠道
    handleDelete(index, row) {
      //删除当前选中行数据     
      let params = {
        id : row.channelID
      }
      console.log("Delete: " + row.channelID)
      User.channelDelete({
        data : params
      }).then(res => {
        if (res.suc && res.code === 200) {
          this.spreadWayTable.splice(index, 1)
        }
      })
    },
    //确认发布
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
    console.log(this.actid)
    this.query()
  }
}
</script>

<style lang="scss" scoped>
  .el-button--default {
    color: #fff;
    background-color: #fc4a46;
    bact-color: #fc4a46;
  }
  .el-button--text {
    color: #fc4a46;
  }
  .el-dropdown {
    font-size: 12px;
    color: #fc4a46;
    cursor: pointer;
  }
.sources-wrap {
  .sources-manage {
    padding: 0 20px;

    .label {
      font-size: 18px;
      color: #161616;
      font-weight: bold;
      text-align: center;
      padding-top: 30px;
      padding-bottom: 20px;
    }
    .spreadWay {
      @extend %flex;

      justify-content: space-between;
    }
    .default {
      @extend %flex;
      flex-flow: column nowrap;

      width: calc(30% - 40px);
      margin: 0 20px;
      font-size: 16px;
      color: #5A5A5A;

      .share-code {
        align-self: center;
        margin-top: 20px;
        border: 1px solid #999;
        text-align: center;
        color: #999;
        width: 200px;
        height: 239px;
        font-size: 14px;
        margin-right: 20px;

        img {
          padding: 10px 15px;
        }
        .down-code {
          margin-top: 10px;
          border-top: 1px solid #999;
          padding: 10px;
          cursor: pointer;
        }
        &:hover {
          .down-code {
            color: $c-red;
          }
        }
      }
      .link-copy-wrap {
        margin-top: 10px;
      }
      .preview-share_describe {
        font-size: 13px;
        color: #979797;
        margin-top: 20px;
        margin-bottom: 20px;
        line-height: 25px;
      }
    }
    .other {
      width: 70%;

      &-describe {
        @extend %flex;

        justify-content: space-between;
        margin-top: 20px;

        &_text {
          margin-right: 20px;
          font-size: 13px;
          line-height: 20px;
          color: #5a5a5a;
          width: 369px;
        }

        i {
          margin-right: 0.5em;
        }
      }
      .spread-way-table {
        margin-top: 10px;

        .edit-name{
          display: flex;
          justify-content: space-between;
        }

        .el-button {
          margin-left: 10px;
        }

        .spread-code {
          @extend %flex;
          justify-content: center;
          align-items: center;

          img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}

.el-button--default {
  color: #fff;
  background-color: #fc4a46;
  border-color: #fc4a46;
}
.el-button:hover {
  color: #5a5a5a;
  background: #fff;
}
.el-input-group__append {
  text-align: center;
}
</style>
