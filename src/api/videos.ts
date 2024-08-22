import { request } from '../utils/request'

export const historyOther = (params, data) => {
  return request({ url: '/video/historyOther', method: 'get', params, data })
}

export const historyVideo = (params, data) => {
  return request({ url: '/video/history', method: 'get', params, data })
}

export const recommendedVideo = (params, data) => {
  return request({ url: '/video/recommended', method: 'get', params, data })
}

export const recommendedLongVideo = (params, data) => {
  return request({ url: '/video/long/recommended', method: 'get', params, data })
}

export const myVideo = (params, data) => {
  return request({ url: '/video/my', method: 'get', params, data })
}

export const privateVideo = (params, data) => {
  return request({ url: '/video/private', method: 'get', params, data })
}

export const likeVideo = (params, data) => {
  return request({ url: '/video/like', method: 'get', params, data })
}

export const videoComments = (params, data) => {
  return request({ url: '/video/comments', method: 'get', params, data })
}
