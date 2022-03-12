const state={
    // 控制背景颜色,如果为true,则为白天色
    backgroundColor:true,
    // 背景颜色
    bgColor:'rgba(242, 242, 242, 0.6)'
}

const mutations={
    UPDATE_BGCOLOR(state){
        state.backgroundColor=!state.backgroundColor
        state.backgroundColor?state.bgColor='rgba(242, 242, 242, 0.6)':state.bgColor='rgba(43, 44, 40,0.6)'
    }
}

const actions = {
    update_bgcolor({commit,state}){
        commit('UPDATE_BGCOLOR')
    }
}


export default{
    namespaced:true,
    state,
    mutations,
    actions
}