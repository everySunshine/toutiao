import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  setTimeout: 5000
})

// request.interceptors.request.use((config) => {
//   return config
// });

// request.interceptors.response.use((res) => {
//   return res.data
// },(error) => {
//    alert("服务器响应数据失败");
// });


export default request

