<template>
  <div class="nav-new_wrap" @scroll="loadMoreActs($event)">
    <div>
      <div class="head">
        <p class="main-title">新建活动</p>

        <!--搜索栏以及其中内容-->
        <div class="mod-search">
          <el-input v-model="filter.keyword" placeholder="你可以搜招生/签到/教师节等" class="input-with-select">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <el-button class="button-search" slot="append" @click="search" style="cursor:pointer;background: #FC4A46;color: #fff;">搜索</el-button>
          </el-input>
        </div>

      </div>
    </div>
    <div class="templates">
      <ul class="main-type flexBox">
        <!--加载新建活动下方的一行标题栏，设置点击事件等-->
        <li v-for="(item) in mainType" :key="item.id" :class="{'act': curTab == item.id}"
        @click="mainTypeSwitch(item)">
          <a>{{item.name}}</a>
        </li>
      </ul>

      <!--没用？？？-->
      <div class="tags-box" v-if="tags.length > 0" v-show="listType == 'all'">

        <div class="festival flexBox lists">
          <span class="name">{{tags[0].name}}：</span>
          <ul class="flexBox">
            <li :class="filter.curFestival == '' ? 'act' : ''" @click="filterActivity({a:1},1)">全部</li>
            <li v-for="(item) in tags[0].childTagList" :key="'festival' + item.id" :class="filter.curFestival == item.id ? 'act' : ''" @click="filterActivity(item,1)">{{item.name}}</li>
          </ul>
        </div>

        <div class="festival flexBox lists">
          <span class="name">{{tags[1].name}}：</span>
          <ul class="flexBox">
            <li :class="filter.curKind == '' ? 'act' : ''" @click="filterActivity({a:2},2)">全部</li>
            <li v-for="(item) in tags[1].childTagList" :key="'festival' + item.id" :class="filter.curKind == item.id ? 'act' : ''" @click="filterActivity(item, 2)">{{item.name}}</li>
          </ul>
        </div>
      </div>

      <div class="recommend flexBox" v-show="false">
        <span class="name">您是不是想找：</span>
        <span v-for="(item, index) in recommend" :key="'recommend' + index" @click="filterActivity(item, 'recommend')">{{item.label}}</span>
      </div>
      <!--到这貌似都没有用-->

      <!--加载排序方式标题栏-->
      <div class="data-box">
        <div class="sort" v-show="listType == 'all'">
          <div class="sort-type">
            <span>排序方式：</span>
          </div>
          <div :class="['sort-method', (sortType === 'zh' ? 'sort-default' : '')]">
            <span @click="sortActivity('zh')">综合排序</span>
          </div>
          <div :class="['sort-method', (sortType === 'th' ? 'sort-default' : '')]">
            <span @click="sortActivity('th')">同行都在用</span>
          </div>
          <div :class="['sort-method', (sortType === 'zx' ? 'sort-default' : '')]">
            <span @click="sortActivity('zx')">最新上传</span>
          </div>
        </div>

        <!--加载中的提示语句-->
        <div class="activities-wrap">
          <!--加载那几个创建活动-->
          <act-list :activities="recommends" :type="listType" @refresh="mainTypeSwitch({ id: 102})"></act-list>

          <p class="requestStateTip" v-show="noMoreActs && curPage > 1">已经没有更多数据了哦!</p>
          <p class="requestStateTip" v-show="!requestLoading && recommends.length === 0">没有找到相关的数据哟!</p>
        </div>
        <p class="loading-text" v-show="requestLoading"><i class="el-icon-loading"></i>必火君玩命加载中...</p>
      </div>

    </div>
  </div>
</template>

<script>
import User from 'src/server/user'
import ActList from 'src/components/act-list'
export default {
  data () {
    return {
      listType: 'all',
      debounceTimer: null, // 防抖计时器
      requestLoading: false, // 数据请求加载状态
      curPage: 1,  // 当前页码
      noMoreActs: false, // 是否还有更多数据
      mainType: [{ name: '所有分类', id: 101 }, { name: '我的收藏', id: 102 }],
      curTab: 101,
      sortType: 'zh', // 活动排序方式
      filter: {
        // 当前筛选类型
        curFestival: '',
        curKind: '',
        keyword: null
      },
      tags: [],
      recommend: [
        {
          label: '砍价活动'
        },
        {
          label: '集赞活动'
        },
        {
          label: '抽奖活动'
        } ],
      recommends: [],
      acts: [
        {
          mainImg: '/static/imgs/temp/图层 10@2x.png',
          title: '超级大转盘',
          industryUrl: '/static/imgs/temp/图层 13@2x.png',
          activityName: '助力,引流,成功案例',
          description: '助力类小游戏，能够快速增加品牌的曝光率，为公众号吸粉，增加阅读量等等。'
        },
        {
          mainImg: '/static/imgs/temp/图层 10@2x.png',
          title: '超级大转盘',
          industryUrl: '/static/imgs/temp/图层 13@2x.png',
          activityName: '助力,引流,女生节',
          description: '助力类小游戏，能够快速增加品牌的曝光率，为公众号吸粉，增加阅读量等等。'
        },
        {
          mainImg: '/static/imgs/temp/图层 10@2x.png',
          title: '超级大转盘',
          industryUrl: '/static/imgs/temp/图层 13@2x.png',
          activityName: '助力,引流,曝光',
          description: '助力类小游戏，能够快速增加品牌的曝光率，为公众号吸粉，增加阅读量等等。'
        },
        {
          mainImg: '/static/imgs/temp/图层 10@2x.png',
          title: '超级大转盘',
          industryUrl: '/static/imgs/temp/图层 13@2x.png',
          activityName: '助力,引流,购物节',
          description: '助力类小游戏，能够快速增加品牌的曝光率，为公众号吸粉，增加阅读量等等。'
        }
      ]
    }
  },
  components: {
    ActList
  },
  methods: {
    // 滚动加载更多活动列表
    loadMoreActs (e) {
      this.debounceTimer && clearTimeout(this.debounceTimer)
      if (this.noMoreActs) {
        return
      }
      this.debounceTimer = setTimeout(() => {
        let scrollWrap = document.querySelector('#scrollWrap')
        if (scrollWrap.scrollTop + scrollWrap.clientHeight >= scrollWrap.scrollHeight) {
          this.initIndex({}, false)
        }
      }, 200)
    },
    filterActivity (item, type) {
      // 活动类型过滤
      if (type === 1) {
        this.filter.curFestival = item.id
      }
      if (type === 2) {
        this.filter.curKind = item.id
      }

      if (item.a === 1) {
        this.filter.curFestival = ''
      }

      if (item.a === 2) {
        this.filter.curKind = ''
      }
      this.initIndex()
    },
    search () {
      let params = {
        page: 1,
        pageSize: 8,
        tagIds: this.filter.curFestival + ',' + this.filter.curKind,
        keyword: this.filter.keyword
      }
      this.initIndex(params, true)
    },
    sortActivity (type) {
      // 活动排序
      this.sortType = type
      this.initIndex()
    },
    mainTypeSwitch (item) {
      this.curTab = item.id
      let params = {
        page: 1,
        pageSize: 8,
        tagIds: this.filter.curFestival + ',' + this.filter.curKind,
        keyword: this.filter.keyword
      }
      if (this.curTab === 101) {
        this.listType = 'all'
        this.initIndex(params, true)
      } else {
        this.listType = 'collect'
        this.collActivity(params, true)
      }
    },
    // 获取数据
    initIndex (params = {}, refresh = true) {
      let initParams = {
        page: params.page || (refresh ? 1 : this.curPage),
        pageSize: params.pageSize || 8,
        tagIds: params.tagIds || [this.filter.curFestival, this.filter.curKind].join(','),
        keyword: params.keyword || '',
        sort: this.sortType || 'zh'
      }
      // 显示加载状态
      this.requestLoading = true
      // 重置当前页码
      this.curPage = initParams.page
      User.initIndex({
        data: initParams
      }).then(res => {
        if (res.suc && res.code === 200) {
          this.recommends = refresh ? res.rs.pageList : [...this.recommends, ...res.rs.pageList]
          this.recommends.forEach(function (item) {
            item.showCreate = item.showCreateBtn
          })
          // 判断是否还有更多
          if (res.rs.lastPage) {
            this.noMoreActs = true
          } else {
            this.noMoreActs = false
            // 页码指向下一页
            this.curPage = initParams.page + 1
          }
        }
      }).finally(() => {
        setTimeout(() => {
          this.requestLoading = false
        }, 500)
      })
    },
    // 我的收藏活动
    collActivity (params, refresh) {
      let initParams = {
        page: params.page || (refresh ? 1 : this.curPage),
        pageSize: params.pageSize || 8
      }
      // 显示加载状态
      this.requestLoading = true
      // 重置当前页码
      this.curPage = initParams.page
      console.log('coll start')
      User.coll({
        data: initParams
      }).then(res => {
        if (res.suc && res.code === 200) {
          this.recommends = refresh ? res.rs.pageList : [...this.recommends, ...res.rs.pageList]
          this.recommends.forEach(function (item) {
            item.showCreate = item.showCreateBtn
          })
          // 判断是否还有更多
          if (res.rs.lastPage) {
            this.noMoreActs = true
          } else {
            this.noMoreActs = false
            // 页码指向下一页
            this.curPage = initParams.page + 1
          }
        }
      }).finally(() => {
        setTimeout(() => {
          this.requestLoading = false
        }, 500)
      })
    },
    push (id) {
      this.$router.push({
        name: 'collectEdit',
        params: {
          id: id
        }
      })
    }
  },
  mounted () {
    let params = {
      page: 1,
      pageSize: 8,
      tagIds: '',
      keyword: ''
    }
    this.initIndex(params, true)
    User.indexTags().then(res => {
      if (res.suc && res.code === 200) {
        this.tags = res.rs
      }
    })
    // this.filterActivity({a: 1}, 1)
    // this.filterActivity({a: 2}, 2)
  },

  created () {
    this.$emit('leftAct', 1)
  }
}
</script>

<style lang="scss">
.mod-search {
  float: right;
  .input-with-select {
    border: 2px solid #f54848;
    border-radius: 4px;
    border-width: 2px 0px 2px 2px;
    width: 359px;
  }
  .el-input__icon {
    color: #f54848;
  }
  .el-input__inner:focus {
    border-color: #f54848;
  }
  .button-search {
    height: 40px;
    border-top-left-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 0;
  }
  .el-input-group__append {
    padding: 0 18px;
  }
  /* .el-input-group__append
    {
    } */
}
</style>

<style lang="scss" scoped src="common/style/module/manage/new.scss">

</style>

