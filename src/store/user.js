import { getItem, setItem } from "@/utils/storage"

const state = {
    user: getItem('user') || {}
}
const actions = {}
const mutations = {
    saveUser(state, user) {
        state.user = user
        setItem('user', user)
    }
}
const getters = {}
export default {
    // 为当前模块开启命名空间
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
