<template>
  <div>
    <div class="phone-content s2">
      <div class="s3">
        <div style="width: 45px;height: 45px;"></div>
        <div class="triangle"></div>
        <div class="share-box">
          嗨，老铁
        </div>
      </div>
      <div class="t-time">11:30</div>
      <div class="s3" style="justify-content: flex-end">
        <div class="share-box">
          <div class="share-text">
            <p class="share-title">{{shareSet.shareTitle}}</p>
            <p class="share-desc">{{shareSet.shareDesc}}</p>
          </div>
          <img class="share-img" :src="shareSet.thumbnailUrl" style="width: 60px;height: 60px">
        </div>
        <div class="triangle"></div>
        <div style="width: 45px;height: 45px"></div>
      </div>
      
    </div>
    <div class="share-bottom" style="position: absolute;bottom: 0"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    shareSet: {
      type: Object
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .triangle {
    width: 12px;
    height: 12px;
    border-left: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    transform: rotate(45deg);
    position: relative;
    top: 15px;
    left: 6px;
    z-index: 2;
    background: #fff;
  }
  .s2 {
    background: #e0e1e1;
    padding: 40px 15px 0 15px;
  }

  .s3 {
    display: flex;

    .share-box {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 200px;
      min-height: 45px;
      border-radius: 5px;
      padding: 15px;
    }
    .share-text {
      width: 120px;

      .share-title,.share-desc {
        width: 100% !important;
      }
      .share-desc {
        padding-top: 5px;
        font-size: 11px;
      }
    }
    .share-img {
      width: 60px;
      height: 60px;
    }
    div {
      background: #fff;
    }
  }

  .share-bottom{
    width: 100%;
    height: 56px;
    background: url(/static/imgs/manage/editor/share-bottom.png);
    background-size: 100%;
  }
</style>

<style lang="scss" src="common/style/module/manage/new-setting.scss" scoped></style>