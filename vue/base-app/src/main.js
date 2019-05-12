import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptors from './interceptors';

Vue.config.productionTip = false


const vm = new Vue({
  router,
  store,
  render: h => h(App)
});

interceptors(vm);

vm.$mount('#app');
