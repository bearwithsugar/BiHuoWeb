<template>
  <div class="myact">
    <p class="main-title">我的活动</p>
    <ul class="main-type flexBox">
      <li v-for="(item,index) in mainType" :class="item.id == curType ? 'act' : ''" v-bind:key="index" @click="changeTab(item)">
        {{item.name}}
      </li>
    </ul>

    <div class="act-wrap">
      <div class="act-title">
        <p class="font-small">全民大砍价</p>
        <p class="font-small" style="margin-top: 10px">
          {{`活动时间 ${beginTime} 至 ${endTime}`}}
        </p>
      </div>
      <user-list v-if="curType === '3'"></user-list>
      <channel-list v-if="curType === '2'"></channel-list>
    </div>

  </div>
</template>

<script>
// import Activity from 'src/server/activity.js'
// import utils from 'src/lib/utils.js'
// import User from 'src/server/user.js'
import { Message } from 'element-ui'
import userList from 'src/module/manage/view/nav-my/userList.vue'
import channelList from 'src/module/manage/view/nav-my/channelList.vue'

export default {
  components: {
    userList,
    channelList
  },
  data () {
    return {
      curTemplate: 'userList',
      editState: {
        // true为显示状态，false为编辑状态
        nameState: true
      },
      mainType: [
        {name: '数据分析', id: '1', isOpen: false, msg: '敬请期待'},
        {name: '渠道统计', id: '2', isOpen: true},
        {name: '用户名单', id: '3', isOpen: true}
      ],
      curType: '3'
    }
  },
  methods: {
    changeTab (val) {
      if (val.isOpen) {
        this.curType = val.id
      } else {
        Message({ type: 'success', message: val.msg })
      }
    }
  },
  computed: {
    beginTime () {
      return JSON.parse(window.localStorage.getItem('curActivityNews')).sTime
    },
    endTime () {
      return JSON.parse(window.localStorage.getItem('curActivityNews')).eTime
    }
  },
  created () {
    this.$emit('leftAct', 2)
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/my.scss">

</style>

<style lang="scss" scoped>
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

</style>