import Vue from "vue";
import VueRouter from "vue-router";
import api from '../api/index'
import { Message } from "element-ui";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/article",
  },
  {
    path: "/article",
    name: "article",
    component: () => import("@/views/Article.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("@/components/ArticleComponents/Detail"),
  },
  {
    path: "/archive",
    name: "archive",
    component: () => import("@/views/Archive"),
  },
  {
    path: "/category",
    name: "category",
    component: () => import("@/views/Category"),
  },
  {
    path: "/tag",
    name: "tag",
    component: () => import("@/views/Tag"),
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/Message"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import("@/views/Profile")
  },

  {
    path: '/admin',
    name: 'admin',
    component: () => import("@/admin/index"),
    redirect:'/admin/publishArticle',
    children:[
      {
        path:'publishArticle',
        name:'publishArticle',
        component:()=>import('@/admin/components/articlePublish')
      },
    ]
  }
];

const router = new VueRouter({
  routes,
});



// 配置重定向不报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

// 全局前置守卫
router.beforeEach(async (to, from, next)=>{
  // 
  if (to.path.indexOf('/admin')!==-1) {
    // 判断是不是管理员
    try {
      let res = await api.isAdmin()
      if (res.flag) {
        // 不能根据构造函数找原型链，所以要手动取原型链的
        Vue.prototype.$Bus.$emit('setAdminState',true)
        next()  // 放行
      } else {
        Message.error('您可不是尊敬的管理员ヾ(´∀`o)+')
        next('/')
      }

    } catch (err) {
      console.log(err)
      next('/')
    }
  }else{
    if(from.path.indexOf('admin')!=-1&&to.path.indexOf('admin')==-1){
      // 设置为非admin
      Vue.prototype.$Bus.$emit('setAdminState',false)
    }
    next()
  }
})

export default router;
