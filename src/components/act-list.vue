<template>
  <div class="act-wrap">
    <ul class="lists-box">

      <!--循环生成多个活动小界面，这个activities是上一个nav-new页面传来的，从后端调用-->
      <li v-for="item in activities" :key="item.id" :actid="item.id">
        <div class="img-box">
          <img :src="item.mainImg || '/static/imgs/temp/图层 10@2x.png'" alt="活动主图" />
          <!-- <p class="name">{{item.title}}</p> -->
          <div class="code-box">
            <img :src="item.shareUrl || '/static/imgs/temp/图层 13@2x.png'" alt="" />
          </div>
        </div>
        <div class="sub">

          <div class="sub-hd">
            <p class="name">{{item.activityName}}</p>
            <!--点击创建触发路由跳转-->
            <span class="btn-add" v-show="item.showCreate" @click="push(item)">
              <i class="p-icon el-icon-plus"></i>创建</span>
          </div>

          <div class="sub-bd">
            <div class="tags" v-if="item.tags">
              <span v-for="(tagItem, index) in getTags(item.tags)" :key="item.id + tagItem + index">{{tagItem}}</span>
            </div>
            <div class="content">{{item.description || item.modDesciption}}</div>
          </div>
          <div class="sub-ft" v-if="type !== 'show'">
            <div class="example">
              <div class="img1" style="width: 15px;height: 15px;float: left">
              </div>
              <span style="float: right;margin-left: 8px;margin-right: 8px">样例</span>
            </div>

            <i class="line"></i>

            <div class="method">
              <div class="img2" style="width: 18px;height: 15px;
              margin-left: 8px;float: left">
              </div>
              <span style="float: right;margin-left: 8px;margin-right: 9px">执行方案</span>
            </div>

            <i class="line"></i>

            <div class="collection" :class="{doCollection: type == 'collect' || item.showCollRed}" @click="changeCollect(item, $event)">
              <div class="img3" style="width: 16px;height: 13px;margin-left: 5px;margin-top:2px;float: left">
              </div>
              <span style="float: right;margin-left: 5px">收藏</span>
            </div>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Activity from 'src/server/activity.js'
import { Message } from 'element-ui'
export default {
  name: 'ActList',
  data () {
    return {}
  },
  props: {
    type: {
      type: String,
      default: 'edit'
    },
    activities: {
      type: Array,
      default: []
    }
  },
  methods: {
    getTags: function (tagStr) {
      return tagStr.split(',')
    },
    // 添加删除收藏活动
    changeCollect (item, e) {
      let code = this.type === 'all' ? 1 : -9

      Activity.changeCollect({
        data: {
          activityId: item.id,
          code
        }
      }).then(res => {
        let currentTarget = e.target.classList.contains('collection') ? e.target : e.target.parentNode || e.target.parentElement

        if (res.suc) {
          if (this.type === 'all') {   // 所有活动列表
            currentTarget.classList.add('collected')
            Message({type: 'success', message: '收藏成功'})
          } else if (this.type !== 'show') {
            currentTarget.classList.remove('doCollection', 'collected')
            Message({type: 'success', message: '已删除收藏'})
            this.$emit('refresh')
          }
        }
      })
    },
    push (item) {
        console.log('item.innerType是'+item.innerType+'  item.id是'+item.id)
      this.$router.push({
        path: `/edit/${item.innerType}/${item.id}/collect`
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.act-wrap {
  background: #fff;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  .lists-box {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    // margin: auto;
    margin-right: -28px;
    li {
      display: inline-block;
      width: 226px;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      box-shadow: 0px 3px 3px $c-d9;
      margin-right: 26px;
      margin-top: 30px;
      background: #ffffff;
      .img-box {
        position: relative;
        border-radius: 5px;
        width: 224px;
        height: 148px;
        .name {
          position: absolute;
          width: 100%;
          color: #fff;
          bottom: 0;
          left: 0;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 14px;
        }
        img {
          width: 100%;
          height: 100%;
          vertical-align: bottom;
        }
        .code-box {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          text-align: center;
          opacity: 0;
          img {
            width: auto;
            height: 60%;
          }
          p {
            color: #fff;
            font-size: 14px;
          }
        }
      }
      .sub {
        font-size: 12px;
        position: relative;
        padding: 0 13px 17px 13px;
        .sub-hd {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          margin-top: 15px;
          border-bottom: 1px solid $c-d9;

          .name {
            font-size: 14px;
            color: $c-5a;
            max-width: 8em;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .btn-add {
            line-height: 25px;
            padding: 0 1em;
            color: #fff;
            border-radius: 6px;
            background: $c-red;
            cursor: pointer;
            .p-icon {
              margin-right: 6px;
              vertical-align: middle;
            }
          }
        }
        .sub-bd {
          margin-top: 10px;
          .tags {
            span {
              background: #f3f3f3;
              display: inline-block;
              font-size: 14px;
              color: #979797;
              border: 1px solid $c-d9;
              padding: 0 4px;
              margin-right: 6px;
              border-radius: 4px;
            }
            span.hot {
              color: $c-red;
              border: 1px solid $c-red;
            }
          }
          .content {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            font-size: 13px;
            color: #bfbfbf;
            line-height: 19px;
            height: 60px;
            margin-top: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .icon-add {
            width: 36px;
            height: 36px;
            background: url('/static/imgs/manage/index/icon-add.png') no-repeat
              center #fff;
            background-size: 100%;
            top: 10px;
            right: 0;
            left: auto;
            transform: none;
          }
        }
        .sub-ft {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-top: 16px;
          color: #979797;
          span {
          }
          .line {
            display: inline-block;
            width: 1px;
            height: 1em;
            background: $c-d9;
          }
          .example {
            .img1 {
              background: url('/static/imgs/manage/index/example.png');
            }
          }
          .method {
            .img2 {
              background: url('/static/imgs/manage/index/method.png');
            }
          }
          .collection {
            cursor: pointer;
            .img3 {
              background: url('/static/imgs/manage/index/collection.png');
            }
          }
          .example:hover {
            .img1 {
              background: url('/static/imgs/manage/index/example2.png');
            }
            span {
              color: #fc4a46;
            }
          }
          .method:hover {
            .img2 {
              background: url('/static/imgs/manage/index/method2.png');
            }
            span {
              color: #fc4a46;
            }
          }
          .doCollection,.collection:hover,.collection.collected {
            .img3 {
              background: url('/static/imgs/manage/index/collection2.png');
            }
            span {
              color: #fc4a46;
            }
          }
        }
      }
    }
    li:hover {
      border: 1px solid pink;
      box-shadow: 0px 2px 5px pink;
      .sub-bd .tags {
        span {
          color: #fff;
          background: burlywood;
          border: 1px solid burlywood;
        }
      }
      .icon-add {
        background: url('/static/imgs/manage/index/icon-add-hover.png')
          no-repeat center #fff;
        background-size: 100%;
      }
      .code-box {
        opacity: 1;
      }
    }
  }
  .loading-text {
    text-align: center;
    font-size: 16px;
    color: $c-97;
    margin-top: 30px;
    margin-bottom: 20px;

    .el-icon-loading {
      color: $c-red;
      vertical-align: middle;
      font-size: 1.5em;
      margin-right: 0.5em;
    }
  }
}
</style>
