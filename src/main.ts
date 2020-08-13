import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/scss/common.scss"
import "./components"
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// 因为要切换主题：不建议用element-variables.scss重新定义element-ui样式
Vue.use(Element, {
  zIndex: 3000,
  size: "mini"
});
