<template>
  <div class="modal">
    <div class="modal-bg"></div>
    <div class="modal-content" :class="contentType">
      <slot name="register"></slot>
      <slot name="reset"></slot>
      <slot></slot>
      <span class="modal-close" @click="close"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    contentType: String
  },
  methods: {
    close () {
      this.$emit('toggleModal')
      /* this.$emit('toggleModal'); */
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  &-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.53;
  }
  &-content {
    position: absolute;
    background: #fff;
    border-radius: 6px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &-close {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(/static/imgs/icon/icon-close.png) no-repeat center;
    position: absolute;
    top: 0;
    right: -22px;
    cursor: pointer;
  }
  .modal-close:hover {
    width: 14px;
    height: 14px;
    background: url(/static/imgs/icon/icon-close2.png) no-repeat center;
  }
}

.register {
  width: 900px;
  // width: 46.875%;
  height: 540px;
  max-width: 900px;
  min-width: 650px;
}
.reset {
  width: 24%;
  max-width: 445px;
  min-width: 345px;
}
.bind-phone {
  /*width: 560px;*/
}
.my-activities {
  width: 973px;
}
</style>