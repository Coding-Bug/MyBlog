const state={
    userInfo:null, // 保存用户信息
    loginStatus:false,
}

const mutations={
    SAVE_USER(state,userInfo){
        state.user=userInfo
    },
    SET_LOGINSTATUS(state,loginStatus){
        state.loginStatus = loginStatus
    }
}

const actions={
    saveUser({commit,state},userInfo){
        commit('SAVE_USER',userInfo)
    },
    setLoginStatus({commit,state},loginStatus){
        commit('SET_LOGINSTATUS',loginStatus)
    }
}

const getters ={
    loginStatus:(state)=>(state.loginStatus||JSON.parse(window.localStorage.getItem('loginStatus'))),
    userInfo:(state)=>(state.userInfo||JSON.parse(window.localStorage.getItem('userInfo')))
}

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}