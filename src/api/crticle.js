import request from "../utils/request";

//请求文章列表
export const getarticlelist = (params) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params
  })
}


