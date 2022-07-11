import { getItem, setItem } from "@/utils/storage"
import { reqGetUserChannels, reqGetUserInfo } from "@/api/user";
const state = {
    user: getItem('user') || {},
    userInfo: {},
    channels: []
}
const actions = {
    // 获得用户信息资料
    async getUerInfo({ commit }) {
        const res = await reqGetUserInfo();
        commit('GETUSERINFO', res.data)
    },
    // 获得用户频道
    async getUserChannels({ commit }) {
        const res = await reqGetUserChannels()
        if (res.message === 'OK') {
            commit('GETUSERCHANNELS', res.data.channels)
        }
    }
}
const mutations = {
    saveUser(state, user) {
        state.user = user
        setItem('user', user)
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 保存用户频道
    GETUSERCHANNELS(state, channels) {
        state.channels = channels
        setItem('channels', channels)
    }

}
const getters = {}
export default {
    namespaced: true,//开启命名空间
    state,
    actions,
    mutations,
    getters
}
