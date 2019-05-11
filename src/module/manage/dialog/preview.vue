<template>
  <v-dialog title="活动预览">
    <div class="preview-wrap">
      <div class="preview">
        <div class="preview-box">
          <div class="preview-head">
            <div class="t"></div>
            <div class="d">
              <span>这里显示活动主题</span>
            </div>
          </div>
          <div class="preview-body">666</div>
          <div class="preview-foot">技术支持：必火互动</div>
        </div>
        <div class="preview-data">
          <div class="img-box flexBox">
            <img src="/static/imgs/temp/图层 14@2x.png" alt="" />
            <div class="flex1">
              <div class="title">
                <span class="title-tag">砍价</span>
                <span class="title-text">这里显示此次活动标题</span>
              </div>
              <p class="des">啥实打实大师大师大师大师的实打实大师达到</p>
              <div class="time">
                <span class="val">
                  <i class="el-icon-time"></i>创建时间：2018-1-10 15:30:24 </span>
                <span class="edit">去编辑
                  <span class="el-icon-edit-outline"></span>
                </span>
              </div>
            </div>
          </div>
          <div class="preview-share">
            <div class="share-code">
              <img src="/static/imgs/index/wechat-code.png" alt="">
              <div class="share-code_label">扫一扫分享到微信</div>
              <div class="down-code">
                <a href="/static/imgs/index/wechat-code.png" download><i class="el-icon-download"></i>下载二维码</a>
              </div>
            </div>
            <div class="share-otherWay">
              <div class="share-otherWay_title">分享到：</div>
              <ul class="other-way">
                <li>
                  <i class="el-icon-edit-outline"></i>QQ</li>
                <li>
                  <i class="el-icon-edit-outline"></i>QQ空间</li>
                <li>
                  <i class="el-icon-edit-outline"></i>微博</li>
              </ul>
              <div class="link-copy-wrap">
                <el-input placeholder="请输入内容" v-model="linkVal">
                  <template 
                    slot="append"
                    v-clipboard:copy='linkVal'
                    v-clipboard:success="copySuccess"
                    v-clipboard:error="copyError">复制链接</template>
                </el-input>
              </div>
              <div class="preview-share_describe">您可以将活动链接复制到您的公众号菜单或自定义回复中。</div>
            </div>
          </div>
          <div class="spread">
            <i class="el-icon-edit-outline"></i>我要推广</div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import VDialog from 'src/components/dialog'
export default {
  components: {
    VDialog
  },
  props: {
    actid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      editState: {
        nameState: true
      },
      linkVal: 'https://www.okbihuo.com',
      // 模拟数据
      spreadWayTable: [
        {
          name: 'qq',
          link: 'http://www.baidu.com',
          code: '/static/imgs/index/wechat-code.png'
        }
      ]
    }
  },
  methods: {
    copySuccess (e) {
      Message({ type: 'success', message: '复制成功', ceter: true })
    },
    copyError (e) {
      Message({ type: 'error', message: '复制失败', ceter: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-wrap {
  .preview {
    display: flex;
    &-box {
      width: 454px;
      background: $c-97;
      //height: 640px;
      padding: 36px 70px 30px 65px;
    }
    &-head {
      background: #1a1a1f;
      //height: 64px;
      .t {
        height: 20px;
      }
      .d {
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        color: #fff;
      }
    }
    &-body {
      height: 400px;
      background: #fff;
    }
    &-foot {
      height: 20px;
      line-height: 20px;
      background: rgba(8, 1, 3, 1);
      text-align: center;
      color: #f6f8f9;
      font-size: 12px;
      opacity: 0.6;
    }
    &-data {
      position: relative;
      padding: 40px 20px 0 20px;
      .img-box {
        img {
          width: 110px;
          height: 110px;
          margin-right: 10px;
        }
        .title-tag {
          display: inline-block;
          height: 24px;
          line-height: 24px;
          width: 46px;
          text-align: center;
          border: 1px solid #ddd;
          color: $c-red;
          font-size: 14px;
          margin-right: 16px;
          position: relative;
        }
        .title-tag:after {
          content: ' ';
          display: inline-block;
          position: absolute;
          height: 18px;
          width: 1px;
          background: #d2d2d2;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
        }
        .title-text {
          font-size: 16px;
          color: #161616;
          display: inline-block;
          height: 24px;
          line-height: 24px;
        }
      }
      .des {
        margin-top: 12px;
        font-size: 14px;
        color: #333;
      }
      .time {
        display: flex;
        justify-content: space-between;
        margin-top: 1em;
        font-size: 12px;
        color: #999;

        .el-icon-time {
          margin-right: 0.5em;
        }
        .el-icon-edit-outline {
          margin-left: 0.5em;
        }
        .edit {
          cursor: pointer;

          &:hover {
            color: $c-red;
          }
        }
      }
    }
    &-share {
      @extend %flex;

      margin-top: 40px;
      justify-content: space-between;

      .share-code {
        border-radius: 3px;
        border: 1px solid #e5e5e5;
        text-align: center;
        color: #999;
        width: 200px;
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
      .share-otherWay {
        color: #999;

        &_title {
          color: #333;
          margin-bottom: 20px;
        }

        .other-way {
          @extend %flex;

          color: #333;
          justify-content: space-between;

          li {
            border: 1px solid currentColor;
            padding: 5px 10px;
            border-radius: 5px;

            i {
              vertical-align: text-bottom;
            }
            &:hover {
              color: $c-red;
            }
          }
        }
        .link-copy-wrap {
          margin-top: 10px;
        }
        .preview-share_describe {
          font-size: 12px;
          color: #999;
          margin-top: 20px;
        }
      }
    }
    .spread {
      position: absolute;
      bottom: 10px;
      right: 10px;
      text-align: right;
      color: #333;
      cursor: pointer;

      i {
        margin-right: 0.5em;
      }

      &:hover {
        color: $c-red;
      }
    }
  }
}
</style>
