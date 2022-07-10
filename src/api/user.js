import request from "./request"
// 登录
export const login = (data)=>request({method:'post',url:'/v1_0/authorizations',data})
// 发送验证码
export const sendCode = (mobile)=>request({method:'GET',url:`/v1_0/sms/codes/${mobile}`})