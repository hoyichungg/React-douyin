export const ApiMethod = {
  REDIRECT: 'redirect',
  // 請求方法
  POST: 'post',
  GET: 'get',
  PATCH: 'patch',
  DELETE: 'delete',
  PUT: 'put',
  PAGE_NUMBER: 1,
  PAGE_SIZE: 10,
  DELAY_TIME: 250,
  SUCCESS: 200,
  RELATE_ENUM: {
    RECOMMEND_NO_REMOVE: -2, //推薦,不能移除
    RECOMMEND: -1, //推薦
    FOLLOW_ME: 1, //只關注我
    FOLLOW_EACH_OTHER: 2, //互相關注
    FOLLOW_HE: 3, //我關注他
    REQUEST_FOLLOW: 4 //關注請求
  }
}

export const SlideType = {
  HORIZONTAL: 0,
  VERTICAL: 1,
  VERTICAL_INFINITE: 2
}
