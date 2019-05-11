<template>
  <div>
     <div class="act-title" style="display: flex;justify-content: space-between;">
        <div class="buttonBox">
          <el-button :disabled="true" class="fr">添加渠道</el-button>
        </div>
      </div>

      <div class="act-bd">
        <div class="act-table">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column label="渠道名称" prop="channel" align="center" ></el-table-column>
            <el-table-column label="访问数量" prop="visitors" align="center" ></el-table-column>
            <el-table-column label="报名数量" prop="joinUserNum" align="center" ></el-table-column>
            <el-table-column label="所占比重" prop="occupancy" align="center" ></el-table-column>
            <el-table-column label="创建时间" prop="createTime" align="center" ></el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <span @click="deleteChannel(scope.row)" class="color-hover">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="act-ft">
        <!-- <div class="act-table_pagination">
          <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="5">
          </el-pagination>
        </div> -->
      </div>
      <modal v-show="showSureDeleteDialog" v-on:toggleModal="toggleQrcodeModal" class="sure-delete-box">
        <div class="head">确认删除</div>
        <div class="con">
          <div>确认删除渠道，删除后不可撤销</div>
        </div>
        <el-button class="button" @click="deleteGo">确认删除</el-button>
      </modal>
  </div>
</template>

<script>
import Activity from 'src/server/activity'
import { Message } from 'element-ui'
import utils from 'src/lib/utils.js'
export default {
  name: 'channelList',
  data () {
    return {
       // 当前表格页码
      currentPage: 1,
      showSureDeleteDialog: false,
      curRow: null,
      tableData: [{
        img: '/static/imgs/index/wechat-code.png',
        imgName: '打的',
        name: '姓名',
        phone: '234356332',
        act: '都是',
        time: '打的',
        coin: '呃呃呃',
        control: '吧吧'
      },
      {
        img: '/static/imgs/index/wechat-code.png',
        imgName: '打的',
        name: '姓名',
        phone: '234356332',
        act: '都是',
        time: '打的',
        coin: '呃呃呃',
        control: '吧吧'
      }]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      Activity.activeChannelList({
        data: {
          bizUserActivityId: JSON.parse(window.localStorage.getItem('curActivityNews')).id
        }
      }).then((res) => {
        if (res.suc) {
          if (res.rs) {
            this.tableData = res.rs
            this.dataHandle(this.tableData)
          }
        } else {
          Message({ type: 'error', message: res.msg })
        }
      })
    },
     // 数据显示信息处理
    dataHandle (data) {
      data.forEach(item => {
        item.visitors = item.visitors ? item.visitors : 0
        item.joinUserNum = item.joinUserNum ? item.joinUserNum : 0
        item.createTime = utils.formatDate(new Date(item.createTime))
      })
    },
    deleteChannel (res) {
      this.toggleQrcodeModal()
      console.log(res)
      this.curRow = res
    },
    deleteGo () {
      Activity.deleteChannel({
        data: {
          id: this.curRow.id
        }
      }).then((res) => {
        if (res.suc) {
          Message({ type: 'success', message: res.msg })
          this.toggleQrcodeModal()
          this.getData()
        } else {
          Message({ type: 'error', message: res.msg })
        }
      })
    },
    toggleQrcodeModal () {
      this.showSureDeleteDialog = !this.showSureDeleteDialog
    }
  }
}
</script>

<style lang="scss">
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
    padding-top: 22px;
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
.sure-delete-box {
    text-align: center;
    .head {
        display: none;
    }
    .con {
        padding: 52px 98px 60px 98px;
        font-size: 20px;
        color:#fc4a46;
    }
    .button {
      margin-bottom:10px;
    }
}
.color-hover{
  &:hover{
    color:#fc4a46;
  }
}
.buttonBox{
  width: 98%;
  height: 100%;
}
.fr{
  float: right;
}
</style>