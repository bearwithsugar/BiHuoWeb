import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => {
        require(['src/module/manage/view/index.vue'], resolve)
      }
    },
    {
      path: '/nav-vip',
      name: 'buyVip',
      component: resolve => {
        require(['src/module/manage/view/nav-vip.vue'], resolve)
      }
    },
    {
      path: '/edit/:type/:id',
      component: resolve => {
        require(['src/module/manage/view/edit/index.vue'], resolve)
      },
      children: [
        {
          path: 'collect',
          name: 'collectEdit',
          component: resolve => {
            require([
              'src/module/manage/view/edit/edit-collection.vue'
            ], resolve)
          }
        },
        {
          path: 'sponsor',
          name: 'sponsorEdit',
          component: resolve => {
            require([
              'src/module/manage/view/edit/edit-sponsor.vue'
            ], resolve)
          }
        },
        {
          path: 'share',
          name: 'shareEdit',
          component: resolve => {
            require([
              'src/module/manage/view/edit/edit-share.vue'
            ], resolve)
          }
        },
        {
          path: 'assistant',
          name: 'assistantEdit',
          component: resolve => {
            require([
              'src/module/manage/view/edit/edit-assistant.vue'
            ], resolve)
          }
        }
      ]
    },
    {
      path: '/nav-new',
      component: resolve => {
        require(['src/module/manage/view/nav-new.vue'], resolve)
      },
      children: []
    },
    {
      path: '/nav-new/basic-setting',
      component: resolve => {
        require(['src/module/manage/view/nav-new/basic-setting.vue'], resolve)
      },
      children: [
        {
          name: 'collect',
          path: 'collect/:id',
          component: resolve => {
            require([
              'src/module/manage/view/nav-new/editor-more-collection.vue'
            ], resolve)
          }
        },
        {
          name: 'sponsor',
          path: 'sponsor/:id',
          component: resolve => {
            require([
              'src/module/manage/view/nav-new/editor-more-sponsor.vue'
            ], resolve)
          }
        },
        {
          name: 'share',
          path: 'share/:id',
          component: resolve => {
            require([
              'src/module/manage/view/nav-new/editor-more-share.vue'
            ], resolve)
          }
        },
        {
          path: 'assistant',
          component: resolve => {
            require([
              'src/module/manage/view/nav-new/editor-more-assistant.vue'
            ], resolve)
          }
        }
      ]
    },
    {
      path: '/nav-my',
      component: resolve => {
        require(['src/module/manage/view/nav-my.vue'], resolve)
      }
    },

    {
      path: '/nav-my/index',
      component: resolve => {
        require(['src/module/manage/view/nav-my/index.vue'], resolve)
      }
    },
    {
      path: '/nav-center',
      redirect: '/nav-center/info',
      component: resolve => {
        require(['src/module/manage/view/nav-center.vue'], resolve)
      },
      children: [
        {
          path: 'info',
          redirect: '/nav-center/info/personal',
          component: resolve => {
            require(['src/module/manage/view/nav-center/info.vue'], resolve)
          },
          children: [
            {
              path: 'personal',
              component: resolve => {
                require([
                  'src/module/manage/view/nav-center/personal.vue'
                ], resolve)
              }
            },
            {
              path: 'stores',
              component: resolve => {
                require([
                  'src/module/manage/view/nav-center/stores.vue'
                ], resolve)
              }
            }
          ]
        },
        {
          path: 'editpsw',
          component: resolve => {
            require(['src/module/manage/view/nav-center/editpsw.vue'], resolve)
          }
        },
        {
          path: 'order',
          component: resolve => {
            require(['src/module/manage/view/nav-center/order.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/nav-replenish',
      component: resolve => {
        require(['src/module/manage/view/nav-replenish.vue'], resolve)
      }
    }
  ]
})
