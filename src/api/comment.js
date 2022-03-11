import request from "../utils/request";

//请求文章列表
export const getarticleComment = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

export const addCommentlike = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

export const delCommentlike = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE',
  })
}

export const pushComment = (data) => {
  return request({
    url: `/v1_0/comments`,
    method: 'POST',
    data
  })
}