import request from "../utils/request";

//请求文章列表
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}


