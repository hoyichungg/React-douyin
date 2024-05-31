import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 60000
})

// request攔截器
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * 響應攔截器,無論失敗or成功都會返回{ success: boolean, data: xxx }這類型的數據,沒有reject和拋error
 * 如果有問題,攔截器裡會進行提示。在then裡面會接收到返回值
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    /**
     * 響應成功的攔截器,主要是對data做處裡
     */
    const { data } = response
    console.log('response', data, response);

  }
)

export interface ApiResponse<T> {
  data: T
  success: boolean
}

export const request = async (config: AxiosRequestConfig) => {
  /**
   * then和catch裡面返回數據必須加as const,否則調用方無法推斷出類型
   */
  return axiosInstance
    .request(config)
    .then(({ data }) => {
      return { success: true, data } as const
    })
    .catch((err) => {
      return { success: false, data: err } as const
    })
}
