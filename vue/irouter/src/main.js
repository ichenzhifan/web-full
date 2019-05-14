import Vue from 'vue'
import App from './App.vue'
import IRouter from './irouter';
import Home from './views/Home.vue'

Vue.config.productionTip = false

const router = new IRouter(Vue, {
  routes: [
    {
      path: '#/',
      name: 'home',
      component: Home
    },
    {
      path: '#/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});

new Vue({
  router,
  render: h => <App />
}).$mount('#app');

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app');


