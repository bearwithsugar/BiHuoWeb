<template>
  <div class="information">
    <div class="nav">
      <span class="center" :class="{act: curTab == 'personal'}" @click="toggleTab('personal')">个人中心</span>
      <span class="store" :class="{act: curTab == 'stores'}" @click="toggleTab('stores')">机构门店</span>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curTab: 'personal'
    }
  },
  methods: {
    toggleTab (route) {
      this.curTab = route
      this.$router.push({ path: '/nav-center/info/' + route })
    }
  }
}
</script>

<style lang="scss" scoped src="common/style/module/manage/center.scss">

</style>