# irouter

## Project setup
```
npm install
```

### 功能介绍
实现一个简单的vue-router.

### 原理介绍
- 使用Vue做当前的路由管理.
- 注册router-link全局组件
- 注册router-view全栈组件

### 使用说明
```
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
```
### 核心代码
```
	initComponent(Vue) {
    Vue.component('router-link', {
      props: ['to'],
      render(h) {
        // 使用jsx渲染
        return <a href={this.to}>{this.$slots.default}</a>
      }
    });

    const that = this;
    Vue.component('router-view', {
      render(h){
        const Component = that.routeMap[that.app.current];
        
        return <Component />;
      }
    });
  }
```


