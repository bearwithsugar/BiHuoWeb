<template>
  <div class="box">
    <p class="font-small t-center">设置分享信息让更多的朋友参与活动</p>
    <div class="share">
      <div class="weixi">
        <img src="static/imgs/manage/editor/weixi.png">
      </div>
      <div class="triangle"></div>
      <div class="share-main">
        <div class="mar-10">
          <el-input size="medium" v-model="shareSet.shareTitle">
            <i slot="suffix" class="pointer el-input__icon ">
              <img @click="doShareTitleListShow"
              style="position: relative;top: -10px;left: -8px;" 
               src="static/imgs/manage/editor/huan.png">
            </i>
          </el-input>
          <div class="share-content">
            <el-input type="textarea" v-model="shareSet.shareDesc" :rows="3" style="font-size:12px;"></el-input>
            <img :src="shareSet.thumbnailUrl">
          </div>
        </div>
        <div class="share-footer">
          <div class="pointer" @click="showShareName" style="margin-left: 20px;">+插入分享人昵称</div>
          <span>|</span>
          <div class="pointer" @click="showShareTimes" style="margin-right: 20px;">+插入访问次数</div>
        </div>
      </div>

      <el-dialog title="你可以使用这些标题" :visible.sync="shareTitleListShow" center>
        <div>
          <ul class="activityNameList">
            <li class="pointer" v-for="(item,index) in shareTitleList.arr" :key="'activityNameListpointer' + index" @click="actNameChange($event,index)">
              {{index+1}}、{{item}}
            </li>
          </ul>
        </div>
        <hr>
        <div style="margin-top: 10px;display: flex;justify-content: flex-end;">
          <el-button @click="hideActNameList(true)">确定</el-button>
          <el-button @click="hideActNameList(false)"> 取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    shareSet: {
      type: Object
    },
    preview: {
      type: Object
    }
  },
  data () {
    return {
      isName: '\n##显示分享人昵称##',
      isTimes: '\n##显示分享次数##',
      shareTitleListShow: false,
      shareTitleList: {
        index: 0,
        arr: []
      }
    }
  },
  methods: {
    // 显示标题列表弹框
    doShareTitleListShow () {
      this.shareTitleListShow = true
    },

    actNameChange (e, index) {
      var el = event.currentTarget.parentNode.childNodes
      for (var i = 0; i < el.length; i++) {
        // el[i].nodeName === '#text' ? true : el[i].classList.remove('actName')
        // el[i].nodeName === '#text' && el[i].classList.remove('actName')
        if (el[i].nodeName !== '#text') {
          el[i].classList.remove('actName')
        }
      }
      this.shareTitleList.index = index
      e.currentTarget.classList.add('actName')
    },

    hideActNameList (type) {
      if (type) {
        this.shareSet.shareTitle = this.shareTitleList.arr[this.shareTitleList.index]
      }
      this.shareTitleListShow = false
    },
    // 插入分享人昵称
    showShareName () {
      if (this.shareSet.isShowShareName) {
        this.shareSet.isShowShareName = false
        this.shareSet.shareDesc = this.shareSet.shareDesc.replace(
          this.isName,
          ''
        )
      } else {
        this.shareSet.isShowShareName = true
        this.shareSet.shareDesc += this.isName
      }
    },
    // 插入分享次数
    showShareTimes () {
      if (this.shareSet.isShowShareTimes) {
        this.shareSet.isShowShareTimes = false
        this.shareSet.shareDesc = this.shareSet.shareDesc.replace(
          this.isTimes,
          ''
        )
      } else {
        this.shareSet.isShowShareTimes = true
        this.shareSet.shareDesc += this.isTimes
      }
    }
  },
  mounted () {
    console.log('this.shareSet', this.shareSet)
    this.shareTitleList.arr = this.shareSet.shareTitleList
    console.log(this.shareSet.shareTitleList)
    this.$emit('enterShare')
    this.preview.content = 2
  },
  beforeDestroy () {
    this.preview.content = 1
    this.$emit('leaveShare')
  }
}
</script>

<style type="text/css" src="common/style/module/manage/new-editor.scss" scoped></style>
<style lang="scss" scoped>
.share {
  display: flex;
  margin: 30px 0;

  .share-main {
    width: 410px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    position: relative;
    z-index: 1;
    background: #fff;
    padding-top: 10px;

    .share-content {
      display: flex;
      margin-top: 10px;

      img {
        width: 60px;
        height: 60px;
        margin: 10px;
      }
    }

    .share-footer {
      height: 22px;
      font-size: 12px;
      line-height: 22px;
      display: flex;
      background: #f2f3f3;
      justify-content: space-around;
    }
  }
}
</style>