import  request  from "../utils/request";

//获取登录信息
export const login = (data) => {
  // console.log(data);
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data:data
  })
}

// 获取验证码

export const getcode = (mobile) => {
  console.log(mobile);
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}