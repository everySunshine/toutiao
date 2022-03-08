import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局样式
import './styles/index.less'
//引入移动组件库
import Vant from 'vant'
import 'vant/lib/index.css'
//引入rem基准值
import 'amfe-flexible'
import './utils/dayjs'
Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
