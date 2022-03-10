import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

console.log(router)
// 引入公共样式
import './assets/css/common.css'

// 引入图标
import './assets/icon/icon.css'

// 引入自定义字体
import './assets/font/font.css'

// 挂载事件总线
Vue.prototype.$Bus=new Vue()
//  引入element-ui
import{
  Row,
  Col
}from'element-ui'

Vue.use(Row)
Vue.use(Col)
new Vue({
  // h创建虚拟dom
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
