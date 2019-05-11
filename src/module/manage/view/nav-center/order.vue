<template>
  <div class="order-wrap" style="border: 1px #D9D9D9 solid;
	margin-top: 29px;border-radius: 6px;background-color: #FFFFFF">
    <div class="order-hd">
      <div class="order-hd_lt">
        <div class="order-filter">
          <el-form :inline="true" :model="orderFilter" class="demo-form-inline">
            <el-form-item label="筛选条件">

              <el-select v-model="orderFilter.state" placeholder="全部" @change="searchList">
                <el-option label="全部" value=""></el-option>
                <el-option label="下单" :value="0"></el-option>
                <el-option label="支付成功" :value="1"></el-option>
                <el-option label="余额不足" :value="2"></el-option>
                <el-option label="订单取消" :value="-1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="order-hd_rt">
        <div class="order-search">
          <el-input placeholder="搜索订单" v-model="orderFilter.name">
            <i slot="suffix" @click="searchList" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div>
          <router-link to="/nav-replenish">
            <el-button style="margin-left: 10px;">去充值</el-button>
          </router-link>
          
        </div>
      </div>
    </div>
    <div class="order-bd">
      <div class="order-table">

        <el-table :data="tableData" empty-text="老铁，这里还什么都没有" style="width: 97%;margin-left:30px;" border>

          <div slot="empty">
            <img style="margin:15px" src="static/imgs/manage/null2x.png" />
            <div style="margin:15px">老铁，这里还什么都没有~</div>
          </div>

          <el-table-column prop="orderNo" label="订单号" align="center" style="width: 10%">
          </el-table-column>

          <el-table-column prop="title" label="产品" align="center" style="width: 18%">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" style="width: 24%">
          </el-table-column>
          <el-table-column prop="realPrice" label="金额" align="center" style="width: 18%">
          </el-table-column>
          <el-table-column prop="payTypeName" label="支付方式" align="center" style="width: 10%">
          </el-table-column>
          <el-table-column prop="statusName" label="订单状态" align="center" style="width: 10%">
          </el-table-column>
          <el-table-column label="操作" align="center" style="width: 10%">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showOrderDetail(scope.row)" v-if="tableData[scope.$index].status==1">
                查看
              </el-button>

              <el-button type="text" size="small" @click="showOrderDetail(scope.row)" v-if="tableData[scope.$index].status==0">
                支付
              </el-button>

              <el-button type="text" size="small" @click="showOrderDetail(scope.row)" v-if="tableData[scope.$index].status==2">
                充值
              </el-button>

              <el-button type="text" size="small" v-if="tableData[scope.$index].status==-1" @click="showOrderDetail(scope.row)">
                再次购买
              </el-button>

              <el-button type="text" size="small" v-if="tableData[scope.$index].status==0||tableData[scope.$index].status==2" @click="orderAlert(scope.row)">
                取消
              </el-button>
            </template>
          </el-table-column>

        </el-table>

      </div>
    </div>
    <div class="order-ft">
      <div class="order-table_pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listData.count">
        </el-pagination>
      </div>
    </div>
    <div class="order-detail" v-show="orderDetailDialog">
      <el-dialog title="订单详情" :visible.sync="orderDetailDialog" center>
        <!--
				<div slot="empty" title="订单详情">
					
				</div>
				-->
        <div class="order-baseInfo">
          <el-form label-width="100px" :model="list">
            <el-form-item label="订单编号：" prop="orderNo">
              <div class="pos-l">
                <div class="baseInfo-title">{{currentOrder.orderNo}}</div>
                <div class="baseInfo-text">
                  <span>创建时间：{{currentOrder.createTime}}</span>
                  <span>|</span>
                  <span>支付时间：{{currentOrder.payTime}}</span>
                </div>
              </div>

            </el-form-item>
            <el-form-item label="订单状态：" label-position="left" prop="status">
              <div class="pos-l">
                <img :src="status.img[currentOrder.status]">
                <span class="describe">{{status.describe[currentOrder.status]}}</span>
              </div>

            </el-form-item>
            <el-form-item label="支付方式：" prop="payType">
              <div class="pos-l">
                <span>{{status.payType[currentOrder.payType]}}</span>
              </div>

            </el-form-item>
          </el-form>
        </div>
        <el-table :data="orderDetail.productList" border>
          <el-table-column property="productName" prop="body" label="商品名称" width="150"></el-table-column>
          <el-table-column property="money" prop="realPrice" label="价格" width="100"></el-table-column>
          <el-table-column property="amount" prop="count" label="数量" width="200"></el-table-column>
          <el-table-column property="expirationTime" prop="payDataExpire" label="到期时间" width="200"></el-table-column>
        </el-table>
        <div class="order-handle" v-if="currentOrder.status!=1">
          <el-button @click="doDetail(currentOrder)">{{status.button[currentOrder.status]}}</el-button>
          <el-button @click="orderDetailDialog=!orderDetailDialog">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <el-dialog title="重新支付" :visible.sync="repayDialog" center>
        <div class="order-baseInfo">
          <el-form label-width="100px" :model="list">
            <el-form-item label="订单编号：" prop="orderNo">
              <div class="pos-l">
                <div class="baseInfo-title">{{currentOrder.orderNo}}</div>
                <div class="baseInfo-text">
                  <span>创建时间：{{currentOrder.createTime}}</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="订单状态：" label-position="left" prop="status">
              <div class="pos-l">
                <img :src="status.img[currentOrder.status]">
                <span class="describe">{{status.describe[currentOrder.status]}}</span>
              </div>

            </el-form-item>
            <el-form-item label="支付方式：" prop="payType">
              <div :class="{'pos-l': true, 'repay-item': true, 'repay-ac': payList === status.payType[currentOrder.payType]}" 
              v-for="(payList, index) in status.payType" :key="payList" @click="changeRepayType(index)" v-if="payList !== 'applyPay'">
                <span>{{payList}}</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="orderDetail.productList" border>
          <el-table-column property="productName" prop="body" label="商品名称" width="150"></el-table-column>
          <el-table-column property="money" prop="realPrice" label="价格" width="100"></el-table-column>
          <el-table-column property="amount" prop="count" label="数量" width="200"></el-table-column>
          <el-table-column property="expirationTime" prop="payDataExpire" label="到期时间" width="200"></el-table-column>
        </el-table>
        <div class="order-handle" v-if="currentOrder.status!=1">
          <el-button @click="repay(currentOrder)">{{status.button[currentOrder.status]}}</el-button>
          <el-button @click="repayDialog=!repayDialog">取消</el-button>
        </div>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="alert"
        width="500px">
        <span>删除后数据不可恢复，请谨慎操作</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="alert = false">取 消</el-button>
          <el-button @click="orderCancel(currentOrder.orderNo)">继 续</el-button>
        </span>
    </el-dialog>
    <modal v-show="qrcodeModal.show" v-on:toggleModal="toggleQrcodeModal" class="qrcode-box">
      <div class="head">微信扫码支付</div>
      <div class="con">
        <div id="reqrcode"></div>
      </div>
      <router-link to="/nav-center/order">
        <el-button @click="toggleQrcodeModal" type="danger" style="margin-bottom:10px;">完成支付</el-button>
      </router-link>
    </modal>
    <modal v-show="netRecharge.show" v-on:toggleModal="toggleNetRecharge" id="netRepay">
      <p class="title">网银/转账支付</p>
      <div class="box">
        <div class="price">
          <span class="name">支付金额</span>
          <span class="val">¥{{currentOrder.price}}</span>
        </div>
        <div class="carno">
          <span class="name">银行电汇／转账</span>
          <table>
            <tr class="head">
              <td>户名</td>
              <td>开户行</td>
              <td>账号</td>
            </tr>
            <tr v-for="card in cardList" :key="card.id">
              <td>{{card.backAccount}}</td>
              <td>{{card.backName}}</td>
              <td class="carno-val">{{card.backNumber}}</td>
            </tr>
          </table>
          <div class="important-tell flexBox">
            <span class="">重要信息：</span>
            <p class="flex1">1、网银转账时填写备注信息：“您的会员号＋联系方式”；2、付款后拍照或截图发给客服；3、我们与您取得联系，确认付款状态；4、充值成功。</p>
          </div>
          <div class="sbt-box">
            <button type="button">已支付，联系客服</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import User from 'src/server/user'
import personal from 'src/server/personal'
import utils from 'src/lib/utils.js'
import QRCode from 'src/lib/qrcode'
import { domainConfig } from 'src/lib/config-axios.js'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      qrcodeModal: {
        show: false
      },
      netRecharge: {
        show: false
      },
      orderFilter: {
        type: '',
        state: '',
        name: ''
      },
      list: {},
      index: 0,
      alert: false,
      listData: {}, // 订单数据
      // 根据订单状态所显示的相应信息和图片
      status: {
        img: {
          '1': 'static/imgs/manage/complete@2x.png',
          '2': 'static/imgs/manage/complete2@2x.png',
          '0': 'static/imgs/manage/complete3@2x.png',
          '-1': 'static/imgs/manage/complete1@2x.png'
        },
        payType: {
          '1': '支付宝',
          '2': '微信',
          '3': '余额',
          '4': '银联',
          '5': 'applyPay'
        },
        describe: {
          '1': '订单已完成',
          '2': '余额不足',
          '0': '等待支付',
          '-1': '已取消',
          '-2': '已关闭',
          '-3': '退款'
        },
        button: {
          '1': '',
          '-1': '再次购买',
          '0': '确认支付',
          '2': '去充值'
        }
      },
      // 表格数据
      tableData: [],
      currentOrder: {}, // 当前操作的订单
      // 当前表格页码
      currentPage: 1,
      orderDetailDialog: false, // 订单详情对话框的状态
      repayDialog: false,
      cardList: [],
      orderDetail: {},         // 订单详情数据
      pageSize: 10 // 一页显示的条数
    }
  },
  methods: {
    handleSizeChange (val) {
      let params = {
        pageSize: val
      }

      User.list({
        data: params
      }).then(res => {
        if (res.suc && res.code === 200) {
          this.listData = res.rs
          this.tableData = res.rs.pageList
          this.dataHandle(this.tableData)
        }
      })
    },
    handleCurrentChange (val) {
      // 页码调整
      let params = {
        page: val,
        status: this.orderFilter.state,
        keyword: this.orderFilter.name
      }

      User.list({
        data: params
      }).then(res => {
        if (res.suc && res.code === 200) {
          this.listData = res.rs
          this.tableData = res.rs.pageList
          this.dataHandle(this.tableData)
        }
      })
    },
    doDetail (currentOrder) {
      if (currentOrder.status === '2') {
        this.$router.push({path: '/nav-replenish'})
      } else if (currentOrder.status === '0') {     // 确认支付
        // 支付宝支付
        if (currentOrder.payType === 1) {
          let baseURL = 'https://www.okbihuo.com'
          window.location.href = `${baseURL}/pi/bizorder/rePay?orderNo=${currentOrder.orderNo}&returnUrl=/manage.html#/nav-center/order`

          // 微信支付
        } else if (currentOrder.payType === 2) {
          personal.rePay({
            data: {
              orderNo: currentOrder.orderNo,
              returnUrl: '/manage.html#/nav-center/order'
            }
          }).then(res => {
            console.log(res)
          })
        }
      }
    },
    orderAlert (row) {
      this.alert = true
      this.currentOrder = row
    },
    orderCancel (orderNo) {
      User.orderCancel({
        data: {
          orderNo: orderNo
        }
      }).then(res => {
        this.alert = false
        if (res.suc) {
          User.list().then(res => {
            if (res.suc && res.code === 200) {
              this.listData = res.rs
              this.tableData = res.rs.pageList
              this.dataHandle(this.tableData)
            }
          })
        }
      })
    },
    // 搜索订单
    searchList () {
      let params = {
        status: this.orderFilter.state,
        keyword: this.orderFilter.name
      }
      User.list({
        data: params
      }).then(res => {
        if (res.suc && res.code === 200) {
          this.listData = res.rs
          this.tableData = res.rs.pageList
          this.dataHandle(this.tableData)
        }
      })
    },
    changeRepayType (res) {
      console.log(this.status.payType[res])
      this.currentOrder.payType = Object.keys(this.status.payType)[res - 1]
    },
    showOrderDetail (item) {
      if (item.status === 1) {
        // 显示订单详情
        this.orderDetailDialog = true
      } else if (item.status === 0 || item.status === 2) {
        // 重新支付
        this.repayDialog = true
      }
      User.orderDetail({
        data: {
          orderNo: item.orderNo
        }
      }).then(res => {
        if (res.suc) {
          this.orderDetail = res.rs
          this.orderDetail.payTime = utils.formatDate(new Date(this.orderDetail.payTime))
          this.orderDetail.productList.forEach(item => {
            item.payDataExpire = utils.formatDate(new Date(this.orderDetail.payDataExpire))
          })
        }
      })

      this.currentOrder = item
    },
    // 数据显示信息处理
    dataHandle (data) {
      data.forEach(item => {
        item.statusName = this.status.describe[item.status]
        item.payTypeName = this.status.payType[item.payType]
        item.createTime = utils.formatDate(new Date(item.createTime))
        if (item.payTime) {
          item.payTime = utils.formatDate(new Date(item.payTime))
        } else {
          item.payTime = ''
        }
      })
    },
    toggleQrcodeModal () {
      this.qrcodeModal.show = !this.qrcodeModal.show
      clearInterval(this.timer)
    },
    toggleNetRecharge () {
      this.netRecharge.show = !this.netRecharge.show
    },
    repay (res) {
      console.log(res)
      if (typeof (res.payType) === 'number') {
        res.payType += ''
      }
      // 支付宝支付
      if (res.payType === '1') {
        let baseURL = domainConfig.url
        window.location.href = `${baseURL}/pi/bizorder/rePay?payType=${res.payType}&orderNo=${res.orderNo}&returnUrl=/manage.html#/nav-center/order`
      // 微信/银联/余额  支付
      } else if (res.payType !== '1') {
        personal.rePay({
          data: {
            payType: res.payType,
            orderNo: res.orderNo
          }
        }).then(ref => {
          console.log(ref)
          if (!ref) {
            return
          }
          if (!ref.suc) {
            Message({ type: 'error', message: ref.msg })
          } else {
            this.repayDialog = false
            // 微信
            if (res.payType === '2') {
              this.qrcodeModal.show = true
              document.querySelector('#reqrcode').innerHTML = ''
              let x = ref.rs
              let qrcode = new QRCode('reqrcode', {
                text: x,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
              })
              console.log(qrcode)
            // 余额
            } else if (res.payType === '3') {
              console.log(ref)
            // 银联
            } else if (res.payType === '4') {
              console.log(ref)
              this.cardList = ref.rs
              this.toggleNetRecharge()
            }
          }
        })
      }
    }
  },
  created () {
    // 获取订单数据
    User.list().then(res => {
      if (res.suc && res.code === 200) {
        this.listData = res.rs
        this.tableData = res.rs.pageList
        this.dataHandle(this.tableData)
      }
    })
  },
  mounted () {}
}
</script>
<style type="text/css">
.el-table__empty-block {
  min-height: 268px;
}
</style>
<style lang="scss" scoped>

.order-hd {
  margin-top: 39px;
  display: flex;
  justify-content: space-between;
}
.order-hd_lt {
  margin-left: 38px;
}
.order-hd_rt {
  margin-right: 31px;
  display: flex;
  justify-content: space-between;
}
.order-table_pagination,
.order-handle {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.order-wrap {
  .el-button--default {
    color: #fff;
    background-color: #fc4a46;
    border-color: #fc4a46;
  }
  .el-button--text {
    color: #fc4a46;
  }
}
.pos-l {
  position: relative;
  left: 50px;
}
.repay-item{
  float: left;
  border:1px solid #ccc;
  margin: 0 10px;
  padding: 0 10px;
  cursor: pointer;
  &:hover{
    background: #f0f0f0;
  }
}
.repay-ac{
  border: 1px solid red;
}
.baseInfo-title {
  font-size: 26px;
  color: #fc5c58;
}
.baseInfo-text {
  font-size: 12px;
  color: #979797;
}
.order-detail {
  .order-baseInfo {
    .describe {
      position: relative;
      left: 12px;
      color: #7bb95b;
    }
  }
}

.qrcode-box {
    text-align: center;
    .head {
        height: 74px;
        line-height: 74px;
        background: $c-red2;
        font-size: 20px;
        color: #fff;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .con {
        padding: 52px 98px 90px 98px;
        #qrcode {
            display: inline-block;
            width: 200px;
            height: 200px;
        }
    } 
}
#netRepay {
    .modal-content {
        width: 670px;
    }
    .title {
        height: 66px;
        line-height: 66px;
        text-align: center;
        background: $c-red2;
        font-size: 18px;
        color: #fff;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .box {
        padding: 42px 38px 30px 38px;
        .price {
            .name {
                font-size: 16px;
                color: $c-5a;   
            }
            .val {
                font-size: 28px;

                color: $c-red2;
                margin-left: 46px;
                vertical-align: middle;
            }
        }
        .carno {
            margin-top: 30px;
            .name {
                font-size: 16px;
                color: $c-5a;   
            }
            table {
                width: 100%;
                margin-top: 22px;
                margin-bottom: 10px;
                .head {
                    background: #F5F5F8;
                }
                td {
                    border: 1px solid $c-d9;
                    border-left: none;
                    font-size: 14px;
                    color: $c-5a;
                    text-align: center;
                    padding: 12px 0;
                }
                td:first-child {
                    border-left: 1px solid $c-d9;
                }
            }
            .important-tell {
                background: #FFF4E9;
                font-size: 12px;
                color: $c-red2;
                padding: 12px 13px;
            }
            .sbt-box {
                text-align: right;
                margin-top: 40px;
                button {
                    text-align: center;
                    padding: 10px 26px;
                    border-radius: 6px;
                    font-size: 14px;
                    color: #fff;
                    background: $c-red;
                    opacity: .9;
                }
            }
        }
    }
}
</style>


