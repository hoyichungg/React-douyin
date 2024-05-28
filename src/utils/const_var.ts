export const ApiMethod = {
  REDIRECT: 'redirect',
  // HTTP Methods
  POST: 'post',
  GET: 'get',
  PATCH: 'patch',
  DELETE: 'delete',
  PUT: 'put',
  // 分頁預設值
  DEFAULT_PAGE_NUMBER: 1,
  DEFAULT_PAGE_SIZE: 10,
  // 模擬響應延遲
  SIMULATION_DELAY_MS: 250,
  // Standard HTTP Success Code
  HTTP_OK: 200,
  // User Relationship Status
  RelationshipStatus: {
    CANNOT_UNFOLLOW_RECOMMENDED: -2, // 推薦,不能移除
    RECOMMENDED: -1, // 推薦用戶
    FOLLOW_ME: 1, // 只追蹤我
    MUTUAL_FOLLOW: 2, // 相互追蹤
    I_FOLLOW: 3, // 我追蹤他
    FOLLOW_REQUEST: 4 // 待處理的關注請求
  }
}

export const SlideType = {
  HORIZONTAL: 0,
  VERTICAL: 1,
  VERTICAL_INFINITE: 2
}
