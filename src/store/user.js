import { getItem, setItem } from "@/utils/storage"
import { reqGetUserInfo } from "@/api/user";
const state = {
    user: getItem('user') || {},
    userInfo: {}
}
const actions = {
    async getUerInfo({ commit }) {
        const res = await reqGetUserInfo();
        commit('GETUSERINFO', res.data)
    },
}
const mutations = {
    saveUser(state, user) {
        state.user = user
        setItem('user', user)
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
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
