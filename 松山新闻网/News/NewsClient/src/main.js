import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(ElementUI)

Vue.prototype.URL = "https://localhost:44354";

Vue.filter("date", function (value) {
  var data = new Date(value);
  return data.getFullYear() + "年" + (data.getMonth()+1) + "月" + data.getDate() + "日"
})
Vue.config.productionTip = false
const rout = router;
rout.beforeEach((to, from, next) => {  
  if (to.path=="/login" || sessionStorage.type && sessionStorage.type == "管理员")
    next();
  else
    next("/login");
}
);
new Vue({
  router: rout,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
