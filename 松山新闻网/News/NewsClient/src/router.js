import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddUser from './views/AddUser.vue'
import EditUser from './views/EditUser.vue'
import ManageUser from './views/ManageUser.vue'
import AddActivity from './views/AddActivity.vue'
import EditActivity from './views/EditActivity.vue'
import ManageActivity from './views/ManageActivity.vue'
import ManageComment from './views/ManageComment.vue'
import ManageWork from './views/ManageWork.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/AddUser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/EditUser/:username',
      name: 'EditUser',
      component: EditUser
    },
    {
      path: '/ManageUser',
      name: 'ManageUser',
      component: ManageUser
    },
    {
      path: '/AddActivity',
      name: 'AddActivity',
      component: AddActivity
    },
    {
      path: '/EditActivity/:id',
      name: 'EditActivity',
      component: EditActivity
    },
    {
      path: '/ManageActivity',
      name: 'ManageActivity',
      component: ManageActivity
    },
    {
      path: '/ManageComment',
      name: 'ManageComment',
      component: ManageComment
    },
    {
      path: '/ManageWork',
      name: 'ManageWork',
      component: ManageWork
    },
    {
      path: '/login',
      name: 'login',
      component: function () {
        return import('./views/Login.vue')
      }
    }
  ]
})
