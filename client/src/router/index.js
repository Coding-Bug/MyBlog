import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
    path:'/',
    redirect:'/article'
},{
    path:'/article',
    name:'article',
    component:()=>import('@/views/Article.vue')
}
]

const router = new VueRouter({
    routes
})

// 配置重定向不报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push=function push(location){
    return routerPush.call(this,location).catch(error=>error)
}

export default router