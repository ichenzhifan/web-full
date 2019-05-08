import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login';
import List from './views/List';
import Detail from './views/Detail';
import store from './store';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			children: [ 
        { path: '', name: 'list', component: List }, 
        { path: '/detail/:id', name: 'detail', component: Detail, props: true }
      ]
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/about/:id',
      name: 'about',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		}
	]
});

router.beforeEach((to, from, next) => {
  if(to.path.indexOf('/about') !== -1 && !store.state.isLogin){
    next('/login?redirect=' + to.path);
  } else{
    next();
  }
});

export default router;
