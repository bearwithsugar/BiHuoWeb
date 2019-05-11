<template>
  <div>
     <div class="act-title" style="display: flex;justify-content: space-between;">
        <div>
          <el-button v-for="status in statusList" :key="status.val" @click="changeCurView(status.val)">{{`${status.label}(${status.num})`}}</el-button>
        </div>
        <div>
            <el-input placeholder="请输入内容" class="input-with-select" v-model="keywords">
              <el-select slot="prepend" placeholder="请选择" v-model="keywordsGroup">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
               <i slot="suffix" @click="searchList" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button>导出名单</el-button>
        </div>
      </div>

      <div class="act-bd">
        <div class="act-table">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column label="中奖玩家">
              <template slot-scope="scope">
                <div>
                  <img :src="scope.row.headUrl" style="width: 50px;height: 50px;border-radius: 50%;margin:0 auto;float:left;">
                  <p style="text-align:center">{{scope.row.userName}}</p>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="姓名" prop="name" align="center">

            </el-table-column>

            <el-table-column label="手机号码" prop="phone" align="center"></el-table-column>
            <el-table-column label="活动情况" prop="remaining" align="center"></el-table-column>
            <el-table-column label="报名时间" prop="createTime" align="center"></el-table-column>
            <el-table-column label="核销兑奖">
              <template slot-scope="scope">
                <p class="getMoneyColor" v-if="scope.row.status === 1" @click="getMoney(scope.row)">兑奖</p>
                <p class="alreadyGetColor" v-else-if="scope.row.status === 3">已兑奖</p>
                <p class="alreadyNoColor" v-else-if="scope.row.status === 4">未兑奖</p>
                <p :class="{alreadyGetColor: scope.row.status === 1 || scope.row.status === 3, alreadyNoColor: scope.row.status === 4}">{{scope.row.cashingCode}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span style="color:red;">查看</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="act-ft">
        <div class="act-table_pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
          :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" 
          layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <modal v-if="showSureGetDialog" v-on:toggleModal="toggleQrcodeModal" class="sure-delete-box">
        <div class="head">确认核销</div>
        <div class="con">
          <div>{{`您确定要对${curRow.userName}做核销吗？`}}</div>
        </div>
        <el-button class="button" @click="realGet">确认</el-button>
      </modal>
  </div>
</template>

<script>
import Activity from 'src/server/activity'
import { Message } from 'element-ui'
import utils from 'src/lib/utils.js'
export default {
  name: 'userList',
  data () {
    return {
       // 当前表格页码
      currentPage: 1,
      showSureGetDialog: false,
      curRow: null,
      pageSize: 10,
      totalCount: null,
      curStatus: null,
      keywords: null,
      keywordsGroup: 1,
      statusList: [
        {label: '全部', val: null, num: 0},
        {label: '未兑奖', val: 1, num: 0},
        {label: '已兑奖', val: 3, num: 0}
      ],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      dataPage1: {},
      dataPage2: {},
      dataPage3: {}
    }
  },
  computed: {
    tableData () {
      let tableData = []
      if (this.curStatus === null) {
        tableData = this.tableData1
      } else if (this.curStatus === 1) {
        tableData = this.tableData2
      } else {
        tableData = this.tableData3
      }
      return tableData
    }
  },
  mounted () {
    this.curStatus = 3
    this.getDataList(true, 0)
  },
  methods: {
    realGet () {
      // this.curRow
      let paramObj = {
        data: {
          wxUserActivityId: this.curRow.id,
          cashingCode: this.curRow.cashingCode
        }
      }
      Activity.sureGetMoney(paramObj).then((res) => {
        if (res.suc) {
          if (res.rs) {
            console.log(res.rs)
            this.toggleQrcodeModal()
            this.curStatus = 3
            this.getDataList(true, 0)
          }
        } else {
          Message({ type: 'error', message: res.msg })
        }
      })
    },
    toggleQrcodeModal () {
      this.showSureGetDialog = !this.showSureGetDialog
    },
    getMoney (res) {
      console.log(res)
      this.curRow = res
      this.toggleQrcodeModal()
    },
    changeCurView (res) {
      this.curStatus = res
      if (res === null) {
        this.currentPage = this.dataPage1.currentPage
        this.totalCount = this.dataPage1.totalCount
        this.pageSize = this.dataPage1.pageSize
      } else if (res === 1) {
        this.currentPage = this.dataPage2.currentPage
        this.totalCount = this.dataPage2.totalCount
        this.pageSize = this.dataPage2.pageSize
      } else {
        this.currentPage = this.dataPage3.currentPage
        this.totalCount = this.dataPage3.totalCount
        this.pageSize = this.dataPage3.pageSize
      }
    },
    searchList (val) {
      this.getDataList()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getDataList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDataList()
    },
    nextGet (index) {
      if (index < 3) {
        if (index === 0) {
          this.curStatus = 1
          this.getDataList(true, 1)
        } else if (index === 1) {
          this.curStatus = null
          this.getDataList(true, 2)
        } else {
          console.log('over satrt ajax')
        }
      }
    },
    getDataList (isGetNum, index) {
      let paramObj = {
        data: {
          pageSize: this.pageSize,
          page: this.currentPage,
          bizUserActivityId: JSON.parse(window.localStorage.getItem('curActivityNews')).id,
          status: this.curStatus,
          keyword: this.keywords
        }
      }
      Activity.activeUserList(paramObj).then((res) => {
        if (res.suc) {
          if (res.rs) {
            this.currentPage = res.rs.page
            this.totalCount = res.rs.count
            this.pageSize = res.rs.pageSize
            let curPageData = {
              currentPage: res.rs.page,
              totalCount: res.rs.count,
              pageSize: res.rs.pageSize
            }
            if (this.curStatus === null) {
              this.tableData1 = res.rs.pageList
              this.handlerShow(this.tableData1)
              this.dataPage1 = curPageData
            } else if (this.curStatus === 1) {
              this.tableData2 = res.rs.pageList
              this.handlerShow(this.tableData2)
              this.dataPage2 = curPageData
            } else {
              this.tableData3 = res.rs.pageList
              this.handlerShow(this.tableData3)
              this.dataPage3 = curPageData
            }
            if (isGetNum) {
              this.statusList.map((ref, index) => {
                if (ref.val === this.curStatus) this.statusList[index].num = res.rs.count
              })
            }
            this.nextGet(index)
          }
        } else {
          Message({ type: 'error', message: res.msg })
        }
      })
    },
    handlerShow (res) {
      res.forEach(ref => {
        ref.createTime = utils.formatDate(new Date(ref.createTime))
      })
    }
  }
}
</script>

<style lang="scss">
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
.getMoneyColor {
  color: #1890FF;
  text-align: center;
}
.alreadyGetColor {
  color:#5a5a5a;
  text-align: center;
}
.alreadyNoColor {
  color:#ccc;
  text-align: center;
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
</style>