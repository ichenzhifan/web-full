import Vue from 'vue';
import App from './App.vue';
import dynamicCreate from './plugin/create';

// 注入新创建的插件.
Vue.use(dynamicCreate);

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App)
}).$mount('#app');
