<template>
  <div class="box">
    <div class="manner">
      <div class="font-strong">助力方式</div>
      <div>
        <el-radio></el-radio>
        每人每天限
        <el-input size="medium" style="width: 40px;margin:0 8px;"></el-input>次
      </div>
      <div>
        <el-radio></el-radio>
        重复助力，重复获奖
      </div>
    </div>
    <div class="dashed"></div>
    <div class="prize">
      <span class="font-strong">助力获奖</span>
      <span class="font-small mar-10">(报名者邀请的好友完成一次助力，即可获得相应的奖励。)</span>
    </div>

    <el-radio-group style="margin:30px 0" v-model="prizeType">
      <el-radio :label="1">不设置</el-radio>
      <el-radio :label="2">普通奖品</el-radio>
      <el-radio :label="3">微信红包</el-radio>
    </el-radio-group>

    <div class="prize-main" v-show="prizeType==2">
      <el-form size="medium" label-width="90px">
        <el-form-item label="奖品名称：">
          <el-input style="width: 147px"></el-input>
          <el-button>使用过的奖品</el-button>
        </el-form-item>

        <el-form-item label="奖品图片：">
          <img src="" width="127" height="50">
          <img src="static/imgs/manage/editor/prize2.png">
        </el-form-item>

        <el-form-item label="兑奖码：">
          <el-radio-group>
            <el-radio>自动生成</el-radio>
            <el-radio>手动导入</el-radio>
            <el-radio>不需要</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="兑奖方式：">
          <el-select placeholder="请选择">
            <el-option label="公总号兑奖" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="兑奖说明：">
          <el-input type="textarea" :rows="4"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button>保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="prize-main" v-show="prizeType==3">
      <el-form size="medium" label-width="90px">
        <el-form-item label="红包类型：">
          <el-radio-group>
            <el-radio>现金红包</el-radio>
            <el-radio>拼手气红包</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="红包名称：">
          <el-input style="width: 150px;"></el-input>
        </el-form-item>

        <el-form-item label="红包金额：">
          <el-input style="width: 150px;"></el-input>
          <p class="font-small mar-t-15">现金红包为固定金额，每个红包金额为固定值</p>
          <p class="font-small mar-t-15">微信红包将由必火互动公总号或微信官方服务号自动发放</p>
        </el-form-item>

        <el-form-item>
          <el-button>保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      prizeType: 2
    }
  }
}
</script>
<style type="text/css" src="common/style/module/manage/new-editor.scss" scoped></style>

<style lang="scss" scoped>
.manner {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 36px;
}
.font-strong {
  font-size: 18px;
  color: #1a1a1f;
  font-weight: bold;
}
.prize-main {
  width: 495px;
  border: 1px solid #d9d9d9;
  padding: 30px;
}
</style>