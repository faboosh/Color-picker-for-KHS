import Vue from 'vue'
import axios from 'axios'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App'
import router from './router'
import store from './store'

/* ---------------------------------------------------------------------------- 
    surfacecurve-color.js
    A color parsing and manipulation library
   ----------------------------------------------------------------------------
    The MIT License (MIT). Copyright (c) 2013-2015, Benjamin Cronin
*/

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
