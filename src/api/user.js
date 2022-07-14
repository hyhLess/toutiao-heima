import request from "./request"
// 登录
export const login = (data) => request({ method: 'post', url: '/v1_0/authorizations', data })
// 发送验证码
export const sendCode = (mobile) => request({ method: 'GET', url: `/v1_0/sms/codes/${mobile}` })
// 获取用户数据
export const reqGetUserInfo = () => request({ url: '/v1_0/user', method: 'get' })
// 获得用户频道数据
export const reqGetUserChannels = () => request({ url: '/v1_0/user/channels', method: 'GET' })
// 获得用户频道列表
export const getArticles = (params) => request({ url: '/v1_0/articles', method: 'GET', params })
/**
 * 获取当前登录用户的个人资料
 */
export const getUserProfile = target => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}

/**
 * 更新用户资料
 */
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}