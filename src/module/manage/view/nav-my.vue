<template>
  <div class="myact">
    <p class="main-title">我的活动</p>
    <ul class="main-type flexBox">
      <li v-for="(item,index) in mainType" :class="curType === item.id ? 'act' : ''" v-bind:key="index" @click="changeMainTab(item)">
        {{item.name}}（{{item.count}}）
      </li>
    </ul>

    <div class="act-wrap">
      <div class="act-hd">
        <div class="act-hd_lt">
          <div class="act-filter">
            <el-form :inline="true" :model="actFilter" class="demo-form-inline">
              <el-form-item label="筛选条件" class="filterConditions">
                <el-select v-model="actFilter.type" placeholder="活动类别" @change="searchType">
                  <el-option label="砍价" value="1"></el-option>
                  <el-option label="集卡" value="2"></el-option>
                </el-select>
                <el-select v-model="actFilter.state" placeholder="全部" @change="searchStatus">
                  <el-option label="已创建" value="0"></el-option>
                  <el-option label="发布" value="1"></el-option>
                  <el-option label="暂停" value="2"></el-option>
                  <el-option label="结束" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="act-hd_rt">
          <div class="act-search">
            <el-input placeholder="搜索活动" v-model="actFilter.name">
              <i slot="suffix" class="el-icon-search" @click="search"></i>
            </el-input>
          </div>
          <div>
            <el-button style="margin-left: 10px;" @click="goNew">
              <i class="el-icon-circle-plus" ></i>新建活动</el-button>
          </div>
        </div>
      </div>
      <div class="act-bd">
        <div class="act-table">
          <el-table :data="tableData" border>
            <el-table-column label="活动名称" align="center">
              <template slot-scope="scope">
                <div class="act-title flexBox">
                  <img :src="scope.row.code" alt="" class="icon icon-code" />

                  <img :src="scope.row.img" alt="" class="activity-img" />
                  <div class="name-text flex1">
                    <div class="text">
                      <p class="h1">{{scope.row.title}}</p>
                      <p class="h2">{{scope.row.module}}</p>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="活动时间" align="center" width="180">
              <template slot-scope="scope">
                <div>{{scope.row.beginTime || '未开始'}}</div>
                <div>{{scope.row.endTime || ''}}</div>
              </template>
            </el-table-column>
            <el-table-column label="活动状态" align="center" width="140">
              <template slot-scope="scope">
                <div :class="[{'no': scope.row.status == 'create'},{'ing': scope.row.status == 'open'},{'over': scope.row.status == 'finish'}]">{{scope.row.status}}</div>
              </template>
            </el-table-column>
            <el-table-column label="人数限制" align="center" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.limit}}</div>
              </template>
            </el-table-column>
            <el-table-column label="总参与人数" align="center" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.total}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" width="190">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="releaseAct(scope.row)">发布</el-button>
                <el-button type="text" size="small" @click="editAct(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="previewAct(scope.row)">预览</el-button>
                <el-button type="text" size="small" @click="dataAct(scope.row)">数据</el-button>
                <div>
                  <el-dropdown @command="more">
                    <span class="el-dropdown-link">
                      更多
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu id="udp" slot="dropdown">
                      <el-dropdown-item :command="scope.row.actid+'1'">复制</el-dropdown-item>
                      <el-dropdown-item :command="scope.row.actid+'2'">删除</el-dropdown-item>
                      <el-dropdown-item>推广</el-dropdown-item>
                      <el-dropdown-item :command="scope.row">渠道管理</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="act-ft">
        <div class="act-table_pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="listData.count">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 预览组件和渠道管理组件的使用demo -->
    <dialog-sources actid="1" v-if="false"></dialog-sources>
    <!-- <dialog-preview actid="1" v-show="false"></dialog-preview> -->
    <channel v-if="modal.show" 
    :actid="indexAct.id" 
    :indexAct="indexAct" 
    :modal="modal" :curModalTab="curModalTab"></channel>

  </div>
</template>

<script>
import Activity from 'src/server/activity.js'
import utils from 'src/lib/utils.js'
// import User from 'src/server/user.js'
import { Message } from 'element-ui'

import channel from '../dialog/channel.vue'

export default {
  components: {
    channel
  },
  data () {
    return {
      editState: {
        // true为显示状态，false为编辑状态
        nameState: true
      },
      curType: 0,
      mainType: [
        { name: '营销互动', id: 0, count: 3, isOpen: true },
        { name: '微图文', id: 1, count: 0, isOpen: false },
        { name: '微传单', id: 2, count: 0, isOpen: false }
      ],
      listData: {},
      indexAct: {},
      count: {},
      lists: [
        {
          code: '../static/imgs/temp/图层 13@2x.png',
          img: '../static/imgs/temp/图层 14@2x.png',
          h1: '这里是活动名称',
          h2: '全民砍价模块',
          start: '2018-01-27 23:19:00',
          end: '2018-02-03 23:19:00',
          state: 0,
          limit: 100,
          total: 200
        }
      ],
      modal: {
        show: false,
        content: 'my-activities'
      },
      curModalTab: 'preview',
      actFilter: {
        type: '',
        state: '',
        name: null
      },
      curAct: {}, // 当前操作的活动
      // 表格数据
      tableData: [],
      tempRow: null,

      // 当前表格页码
      currentPage: 1,
      actDetailDialog: false // 订单详情对话框的状态

    }
  },
  methods: {
    /*    count()
    {
      User.mine().then((res)=>{
        res.rs.count
      }
    } */
    goNew () {
      this.$router.push({
        path: '/nav-new'
      })
    },

    searchType (val) {
      // 根据活动类别筛选
      let params = {
        innerType: val
      }

      this.getList(params)
    },
    searchStatus (val) {
      // 根据活动状态筛选
      let params = {
        status: val
      }

      this.getList(params)
    },
    search () {
      // 搜索
      let params = {
        keyword: this.actFilter.name
      }

      this.getList(params)
    },

    more (command) {
      if (typeof command === 'object') {
        // 渠道管理
        this.indexAct = command
        // let params = {
        //   activityId: command.actid
        // }
        this.curModalTab = 'manage'
        this.modal.show = true
      } else {
        let type = command.substring(command.length - 1, command.length)
        let id = command.substring(0, command.length - 1)
        console.log(id)
        if (type === '1') {
          // 复制活动

          Activity.copy({
            data: { id: id }
          }).then(res => {
            if (res.suc) {
              Message({ type: 'success', message: '复制成功' })
              this.getList()
            }
          })
        }
        if (type === '2') {
          // 删除活动
          Activity.delete({
            data: { id: id }
          }).then(res => {
            if (res.suc) {
              Message({ type: 'success', message: '删除成功' })
              this.getList()
            }
          })
        }
      }
    },
    releaseAct (act) {
      // 发布
      let params = {
        id: act.actid
      }
      Activity.publish({
        data: params
      }).then(res => {
        if (res.suc) {
          Message({ type: 'success', message: '保存成功' })
          console.log('DONE')
        } else {
          console.log('GG')
        }
      })
      console.log(act.actid)
      this.curAct = act
    },
    previewAct (act) {
      // 预览
      this.indexAct = act
      console.log('indexAct' + act.id)
      // let params = {
      //   activityId: act.actid
      // }
      /* console.log("activityId:" + this.act.actid) */
      this.curAct = act
      this.modal.show = true
      this.curModalTab = 'preview'
    },

    editAct (item) {
      // 编辑

      this.curAct = item
      // 跳转到编辑页面
      this.$router.push({
        path: `/edit/${item.innerType}/${item.id}/collect`
      })
    },
    dataAct (act) {
      // 数据
      console.log(act)
      this.curAct = act
      let news = JSON.stringify({
        id: act.id,
        sTime: act.beginTime,
        eTime: act.endTime
      })
      window.localStorage.setItem('curActivityNews', news)
      this.$router.push({
        path: '/nav-my/index'
      })
    },
    handleSizeChange (val) {
      // 改变每页显示的条数
      console.log(`每页 ${val} 条`)
      let params = {
        pageSize: val
      }
      this.getList(params)
    },
    handleCurrentChange (val) {
      // 页码调整
      let params = {
        page: val
      }
      this.getList(params)

      console.log(`当前页: ${val}`)
    },
    formatState (state) {
      const actStateMap = {
        create: {
          type: 'create',
          label: '未开始'
        },
        open: {
          type: 'open',
          label: '进行中'
        },
        finish: {
          type: 'finish',
          label: '已结束'
        }
      }
      return actStateMap[state] ? actStateMap[state].label : '未开始'
    },
    changeMainTab (item) {
      if (item.isOpen) {
        this.curType = item.id
      } else {
        Message({ type: 'success', message: '敬请期待' })
      }
    },
    getList (params) {
       // 获取用户的活动列表
      params = params || null
      Activity.getList({
        data: params
      }).then(res => {
        console.log(res)
        this.listData = res.rs
        this.tableData = res.rs.pageList
        this.mainType[0].count = res.rs.count
        this.tableData.forEach(function (item) {
          item.title = item.activityName
          item.img = item.mainImg
          item.code = item.shareUrl
          item.actid = item.id
          if (item.status === 0 || item.status === 4) {
            item.status = '已创建'
          }
          if (item.status === 1) item.status = '发布'
          if (item.status === 2) item.status = '暂停'
          if (item.status === 3) item.status = '结束'
          if (item.status === 4) item.status = '预发布'

          item.beginTime = item.beginTime ? utils.formatDate(new Date(item.beginTime)) : ''
          item.endTime = item.endTime ? utils.formatDate(new Date(item.endTime)) : ''
          item.module = item.modName
          item.limit = item.goodsCount
          item.total = item.joinUserNum
        })
      })
    }
  },
  created () {
    this.$emit('leftAct', 2)
    this.modal.show = false
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/my.scss">

</style>

<style lang="scss">
.link-copy-wrap {
  .link-copy-input {
    margin-top: 34px;
  }
}
.link-copy-input .el-input .el-input-group .el-input-group--append{
 
}
.el-input-group__append, .el-input-group__prepend {
    cursor: pointer;
    color: #fff;
    background: #fc4a46 !important;
  }

.perviewModal {
  .my-activities {
    height: 580px;
  }
}
.el-table th {
  background-color: #F6F6F6;
}
.el-input,
.el-textarea {
  width: initial;
}
.el-textarea {
  width: 80%;
}
.el-input__inner {
  //border: 1px solid #999;
}
.el-input.is-disabled .el-input__inner,
.el-textarea.is-disabled .el-textarea__inner {
 // background: transparent !important;
  border: none;
  cursor: text;
}

.act-hd,
.act-bd,
.act-ft {
  margin-top: 10px;
  cursor: pointer;
}
.act-hd {
  display: flex;
  justify-content: space-between;
  margin-top: 46px;
  .filterConditions {
    margin-left: 38px;
    margin-bottom: 15px;
  }
}
.act-hd_rt {
  display: flex;
  justify-content: space-between;
  margin-right: 31px;
  .el-icon-circle-plus {
    vertical-align: text-bottom;
    font-size: 1.2em;
    margin-right: 0.5em;
  }
  .el-input__suffix {
    top: 10px;
  }
}
.act-table {
  margin-left: 38px;
  margin-right: 34px;
}
.act-table_pagination,
.act-handle {
  margin-bottom: 10px;
  margin-right: 28px;
  display: flex;
  justify-content: flex-end;
}
.myact {
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
}
.is-center {
  width: 35%;
}
.act-wrap {
  background-color: #ffffff;
  border: 1px #d9d9d9 solid;
  margin-top: 33px;
  border-radius: 6px;
  .no {
    color: #979797;
  }
  .ing {
    color: #7bb95b;
  }
  .over {
    color: #fc4a46;
  }
  .act-title {
    padding: 16px 0 16px 53px;
    position: relative;
    .icon-code {
      width: 20px;
      height: 20px;
      left: 26px;
    }
    /* img.codeAddress {
      width: 20px;
      height: 20px;
      left: 26px;
    } */
    img.activity-img {
      width: 108px;
      height: 76px;
    }

    .name-text {
      position: relative;

      .text {
        position: absolute;

        text-align: center;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        .h1 {
          color: #161616;
          width: 100px;
          margin: auto;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .h2 {
          color: #5a5a5a;
        }
      }
    }
  }
}
</style>