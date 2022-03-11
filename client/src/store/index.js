import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user.js'
import page from './module/page.js'

Vue.use(Vuex)


export default new Vuex.Store({
    modules:{
        user,
        page
    }
})