import request from "./request";

export const reqAllChannels = () => request({ url: '/v1_0/channels', method: 'GET' })
/**
 * 添加用户频道
 */
export const addUserChannel = channel => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}
export const reqDeteleChannel = (id) => request({
    url: `/v1_0/user/channels/${id}`,
    method: 'delete'
})
