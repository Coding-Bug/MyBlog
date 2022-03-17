const state={
    userInfo:{
        username:'小明',
        avatar:'.'
    }, // 保存用户信息
    loginStatus:false,
    admin:'skyblade',// 管理员
    token:'dsad', 
    
}

const mutations={
    SAVE_USER(state,userInfo){
        state.user=userInfo
    },
    SET_LOGINSTATUS(state,loginStatus){
        state.loginStatus = loginStatus
    },
    REMOVE_TOKEN(state){
        state.token=''
    },
    SET_TOKEN(state){
        
    }
}

const actions={
    saveUser({commit,state},userInfo){
        // 第二个参数是字符串,要转化一下
        window.localStorage.setItem('userInfo',JSON.stringify(userInfo))
        commit('SAVE_USER',userInfo)
    },
    setLoginStatus({commit,state},loginStatus){
        commit('SET_LOGINSTATUS',loginStatus)
        window.localStorage.setItem('loginStatus',loginStatus)
        if(!loginStatus){
            this.removeToken()
        }
    },
    removeToken({commit,state}){
        window.localStorage.removeItem('token')
        commit('REMOVE_TOKEN')
    },
    setToken({commit,state},token){
        window.localStorage.setItem('token',token)
        commit('SET_TOKEN',token)
    }
}

const getters ={
    loginStatus:(state)=>(state.loginStatus||JSON.parse(window.localStorage.getItem('loginStatus'))),
    userInfo:(state)=>(state.userInfo||JSON.parse(window.localStorage.getItem('userInfo'))),
    token:(state)=>(state.token||window.localStorage.getItem('token'))
}

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}