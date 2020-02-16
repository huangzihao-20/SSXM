import Vue from 'vue'
import Router from 'vue-router'
import News from './views/News.vue'
import WorkList from './views/WorkList.vue'
import ActivityList from './views/ActivityList.vue'
import Work from './views/Work.vue'
import Activity from './views/Activity.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import UploadWork from './views/UploadWork.vue'
import MyWork from './views/MyWork.vue'
import EditWork from './views/EditWork.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'News',
      component: News
    },
    {
      path: '/WorkList',
      name: 'WorkList',
      component: WorkList
    },
    {
      path: '/ActivityList',
      name: 'ActivityList',
      component: ActivityList
    },
    {
      path: '/Work/:id',
      name: 'Work',
      component: Work
    },
    {
      path: '/Activity/:id',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/UploadWork',
      name: 'UploadWork',
      component: UploadWork
    },
    {
      path: '/MyWork',
      name: 'MyWork',
      component: MyWork
    },
    {
      path: '/EditWork',
      name: 'EditWork',
      component: EditWork
    },    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
