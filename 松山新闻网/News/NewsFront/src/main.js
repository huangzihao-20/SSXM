import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.URL = "https://localhost:44354";
Vue.config.productionTip = false
Vue.filter("date", function (value) {
  var date = new Date(value);
  return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
})
Vue.filter("time", function (value) {
  var date = new Date(value);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds());
})
const rout = router;
// rout.beforeEach((to, from, next) => {  
//   if (to.path=="/Login" || sessionStorage.userName)
//     next();
//   else
//     next("/Login");
// }
// );
new Vue({
  router: rout,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
