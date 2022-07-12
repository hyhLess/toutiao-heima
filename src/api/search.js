import request from "./request";

export const reqLoadSearchSuggestion = (q) => request({
    url: '/v1_0/suggestion',
    method: 'get',
    params: {
        q
    }
})
export const getSearchResult = (params) => request({
    url: ' /v1_0/search',
    method: 'get',
    params
})