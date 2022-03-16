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
},
{
    path:'/detail/:id',
    name:'detail',
    component:()=>import('@/components/ArticleComponents/Detail')
},
{
    path:'/archive',
    name:'archive',
    component:()=>import('@/views/Archive')
},
{
    path:'/category',
    name:'category',
    component:()=>import('@/views/Category')
},
{
    path:'/tag',
    name:'tag',
    component:()=>import('@/views/Tag')
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