// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import moment from 'moment'

// reference axios globally
window.axios = axios

// Global axios defaults
axios.defaults.baseURL = 'http://127.0.0.1:3333'

// register vee validate plugin
Vue.use(VeeValidate)

Vue.config.productionTip = false

// globális szűrők a dátumok formázásához a moment js-sel
Vue.filter('timeAgo', date => moment(date).fromNow())
Vue.filter('joined', date => moment(date).format('MMMM YYYY'))
Vue.filter('dob', date => moment(date).format('MMMM Do YYYY'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
