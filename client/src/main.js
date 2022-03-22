import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// 引入公共样式
import './assets/css/common.css'

// 引入图标
import './assets/icon/icon.css'

// 引入自定义字体
import './assets/font/font.css'

// 引入过滤器
import './utils/filter'


// axios导入
import api from '@/api/index'
Vue.prototype.$api = api

// 引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
// 挂载事件总线
Vue.prototype.$Bus=new Vue()
//  引入element-ui
import{
  Row,
  Col,
  Avatar,
  Message,
  MessageBox,
  Menu,
  MenuItem,
  Card,
  Tag,
  Pagination,
  Input,
  Button,
  Timeline,
  TimelineItem,
  Form,
  FormItem,
  Upload
}from'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Button)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
// 引入Mesage和MessageBox中提交信息和确定的box
Vue.prototype.$message = Message
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm
new Vue({
  // h创建虚拟dom
  render: h => h(App),
  // 挂载路由
  router,
  // 挂载vuex
  store
}).$mount('#app')
