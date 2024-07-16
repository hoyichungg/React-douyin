import resource from '../assets/resource'
import posts6 from '../assets/data/posts6.json'
import { axiosInstance } from '../utils/request'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axiosInstance)

const allRecommendVideos = posts6.map((v) => {
  v.type = 'recommend-video'
  return v
})
// console.log('allRecommendVideos', allRecommendVideos)

export async function startMock() {
  mock.onGet('/video/recommended').reply(async (config) => {
    const { start, pageSize } = config.params
    console.log('/video/recommended', config)
    return [
      200,
      {
        data: {
          total: 844,
          list: allRecommendVideos.slice(start, start + pageSize) // list: allRecommendVideos.slice(0, 6),
        },
        code: 200,
        msg: ''
      }
    ]
  })
  
  mock.onGet('/user/collect').reply(async () => {
    console.log('/user/collect');
    
    return [
      200,
      {
        data: {
          video: {
            total: 50,
            list: allRecommendVideos.slice(350, 400)
          },
          music: {
            total: resource.music.length,
            list: resource.music
          }
        },
        code: 200,
        msg: ''
      }
    ]
  })
}