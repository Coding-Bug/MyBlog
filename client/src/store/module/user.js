const state={
    userInfo:{
        id:1,
        name:'小明',
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
    }
}

const actions={
    saveUser({commit,state},userInfo){
        commit('SAVE_USER',userInfo)
    },
    setLoginStatus({commit,state},loginStatus){
        commit('SET_LOGINSTATUS',loginStatus)
    },
    removeToken({commit,state}){
        localStorage.removeItem('token')
        commit('REMOVE_TOKEN')
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