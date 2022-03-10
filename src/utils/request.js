import axios from 'axios'
import store from '../store';
import JSONBig from 'json-bigint'
//parse(): 将JSON格式转为字符串，注意返回的数据不是一个数字是一个字符串我们可以使用toString将其转化
//stringify():与上面相反
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  setTimeout: 5000,
  //自定义后端返回的数据
  //data返回的后端的原始数据
  transformRequest: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

request.interceptors.request.use((config) => {
  const {user} = store.state.user
  if(user && user.token){
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
},(error) => {
  return Promise.reject(error)
});



export default request

