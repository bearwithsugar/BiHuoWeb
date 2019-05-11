<template>
  <div class="v-dialog">
    <div class="v-dialog_bg"></div>
    <div class="v-dialog_con">
      <div class="v-dialog_close v-icon" v-if="showClose" @click="closeDialog">&#xe74f;</div>
      <div class="v-dialog_hd">
        <span v-if="title" class="v-dialog_title">{{title}}</span>
      </div>
      <div class="v-dialog_bd">
        <slot></slot>
      </div>
      <div class="v-dialog_ft">
        <slot name="dialog_ft"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VDialog',
  props: {
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 500;

  .v-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 30px;
    color: #fff;
    border: 10px solid transparent;
    z-index: 1;
    cursor: pointer;
  }

  .v-dialog_bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .v-dialog_con {
    position: relative;
    width: 973px;
    height: 600px;
    top: 50%;
    left: 50%;
    border-radius: 6px;
    transform: translate(-50%, -50%);
    background: #fff;
    overflow: scroll;

    .v-dialog_hd {
      position: relative;
      display: flex;
      align-items: flex-end;
      padding-left: 23px;
      height: 54px;
      background-color: $c-red;

      .v-dialog_title {
        color: $c-red;
        font-size: 18px;
        line-height: 40px;
        background-color: #fff;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        padding: 0 20px;
        margin-bottom: -1px;
      }
    }
    .v-dialog_bd{
      position: relative;
      background-color: #fff;
    }
  }
}
</style>

