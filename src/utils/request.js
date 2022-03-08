import axios from 'axios'
import store from '../store';

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  setTimeout: 5000
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

