<template>
  <div class="box">
    <el-form>

      <el-form-item>
        <div class="collect">
          <div style="color: #606266;">*报名收集：</div>
          <div class="collect-input">
            <ul>
              <li v-for="(item, index) in activityFormList" :key="'activityFormList' + index">
                <el-input size="medium" :placeholder="item.name" 
                style="width:220px;"
                readonly="readonly">
                  <i v-if="!item.isNeed" 
                     slot="suffix" 
                     @click="removeList(index, false)" 
                     class="pointer el-input__icon el-icon-remove-outline">
                  </i>
                  <i v-else slot="suffix" class="el-input__icon">
                    <img
                      style="position: relative;top: -14px;left: -6px;"
                      src="static/imgs/manage/editor/lock.png">
                  </i>
                </el-input>
              </li>
              <li v-for="(item, index) in userDefinedList" :key="'userDefinedList' + index">
                <el-input size="medium" v-model="item.name" 
                placeholder="自定义选项" 
                class="userDefined"
                style="width:220px">
                  <i slot="suffix" 
                     @click="removeList(index, true)" 
                     class="pointer el-input__icon el-icon-remove-outline">
                  </i>
                </el-input>
              </li>

              <el-input size="medium" readonly="readonly" 
              placeholder="自定义选项"
              class="userDefined" 
              style="width:220px;">
                <i slot="suffix" 
                   @click="addList" 
                   class="pointer el-input__icon el-icon-circle-plus-outline">
                </i>
              </el-input>
            </ul>

          </div>
          <div>
            <p v-for="(item, index) in activityFormList" :key="'activityFormItem' + index" v-show="item.isNeed" class="font-small">必填，不可更改</p>
          </div>
        </div>
      </el-form-item>
      <!--
      <el-form-item label="手机验证：">
        <el-switch v-model="isCheck" active-color="#FC4A46" inactive-color="#E6E6E6"></el-switch>
        <span>手机短信验证开启</span>
      </el-form-item>
      -->
    </el-form>

    <div class="next">
      <router-link :to="{name:'sponsorEdit', params: { id: $route.params.id} }">
        <img src="static/imgs/manage/editor/next.png">
        <span>下一步</span>
      </router-link>

    </div>
  </div>
</template>

<script type="text/javascript">
import { Message } from 'element-ui'
export default {
  props: {
    activityFormList: {
      type: Array
    },
    userDefinedList: {
      type: Array
    },
    preview: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {
    addList () {
      if ((this.userDefinedList.length + this.activityFormList.length) >= 5) {
        Message({ type: 'success', message: '最多添加5项' })
        return
      }
      this.userDefinedList.push({
        id: null,
        name: '',
        uid: null
      })
      this.preview.type = 2
      this.preview.content = 1
    },
    removeList (index, type) {
      if (type) {
        this.userDefinedList.splice(index, 1)
      } else {
        this.activityFormList.splice(index, 1)
      }

      this.preview.type = 2
      this.preview.content = 1
    }
  },
  mounted () {
    console.log(this.activityFormList)
  },
  beforeDestroy () {
    this.preview.type = 1
  }
}
</script>
<style type="text/css" src="common/style/module/manage/new-editor.scss" scoped></style>
<style scoped lang="scss">
.collect {
  display: flex;

  .collect-input {
    width: 220px;
    margin: 0 20px;
  }
  div > p {
    margin: 20px 0;
  }
}
.next {
  overflow: hidden;
  zoom: 1;
}

.next > span,
.next > img {
  float: right;
  margin: 0 5px;
}
.next > span {
  position: relative;
  top: 6px;
}
</style>
<style type="text/css">
.userDefined > .el-input__inner {
  border:1px solid #FC4A46 !important
}
</style>