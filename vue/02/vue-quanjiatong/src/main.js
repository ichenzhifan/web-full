import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import xstore from './xstore';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  xstore,
  render: h => h(App)
}).$mount('#app')
