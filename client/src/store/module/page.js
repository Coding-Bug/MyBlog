const state={
    // 控制背景颜色,如果为true,则为白天色
    backgroundColor:true,
    // 背景颜色
    bgColor:'rgba(242, 242, 242, 0.6)',
    // 字体颜色
    fontColor:'#333',
    // 卡片颜色
    cardColor:'rgba($color: #f2f2f2, $alpha: 0.7)'
}

const mutations={
    UPDATE_BGCOLOR(state){
        state.backgroundColor=!state.backgroundColor
        state.backgroundColor?state.bgColor='rgba(242, 242, 242, 0.6)':state.bgColor='rgba(43, 44, 40,0.6)'
        state.backgroundColor?state.fontColor='#333':state.fontColor='#fff'
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