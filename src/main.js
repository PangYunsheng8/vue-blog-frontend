// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import router from './router'
import VueMaterial from 'vue-material'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'

axios.defaults.withCredentials = true // 跨域请求时是否将cookie中存储的内容一起发送

Vue.use(VueMaterial)
Vue.use(infiniteScroll)

Vue.config.productionTip = false

Vue.filter('clip', (string, num = 100) => {
  if (string.length > num) {
    return string.substr(0, num)
  } else {
    return string
  }
})

Vue.filter('datetime', (data, format = 'YYYY/MM/DD HH:mm:ss') => {
  return moment(data).format(format)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
