import { request } from "../utils/request";

export const userinfo = (params, data) => {
    return request({ url: '/user/userinfo', method: 'get', params, data })
}

export const userVideoList = (params, data) => {
    return request({ url: '/user/video_list', method: 'get', params, data })
}

export const panel = (params, data) => {
    return request({ url: '/user/panel', method: 'get', params, data })
}

export const friends = (params, data) => {
    return request({ url: '/user/friends', method: 'get', params, data })
}

export const userCollect = (params, data) => {
    return request({ url: '/user/collect', method: 'get', params, data })
}

export const recommendedPost = (params, data) => {
    return request({ url: '/post/recommended', method: 'get', params, data })
}

export const recommendedShop = (params, data) => {
    return request({ url: '/shop/recommended', method: 'get', params, data })
}
