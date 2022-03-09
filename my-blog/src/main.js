import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入公共样式
import './assets/css/common.css'

new Vue({
  // h创建虚拟dom
  render: h => h(App),
}).$mount('#app')
