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