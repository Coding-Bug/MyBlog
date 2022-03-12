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


export default router