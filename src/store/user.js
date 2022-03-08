
//导入封装的本地存储
import { setItem, getItem } from '../utils/storage'
const TOKEN_KEY = 'TOKEN_USER'
const state = {
  user: getItem(TOKEN_KEY)
}
const mutations = {
  setUser(state, user) {
    state.user = user
    setItem(TOKEN_KEY,state.user)
  }
}
const actions = {
 
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}