import request from "../utils/request";

//请求文章列表
export const getarticlelist = (params) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params
  })
}

export const getarticledetail = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`,
    method: 'GET',
  })
}

export const addcollection = (target) => {
  return request({
    url: `/v1_0/article/collections`,
    method: 'POST',
    data: {
      target
    }
  })
}

export const delcollection = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE',
  })
}

export const addlikeArticle = (target) => {
  return request({
    url: `/v1_0/article/likings`,
    method: 'POST',
    data: {
      target
    }
  })
}

export const dellikeArticle = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE',
  })
}


