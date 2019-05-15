# create-api

## 功能介绍
实现一个类似cube-ui中动态创建组件实例的方法.

## 用法
- 在main.js中注册组件
```
import Vue from 'vue';
import App from './App.vue';
import dynamicCreate from './plugin/create';

// 注入新创建的插件.
Vue.use(dynamicCreate);

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App)
}).$mount('#app');
```
- 组件中调用$createApi方法.
```
methods:{
  addBall() {
	this.adding = !this.adding;

	if (this.adding) {
		timer = setInterval(() => {
			const pos = {
				top: `${Math.round(Math.random() * 800)}px`,
				left: `${Math.round(Math.random() * 800)}px`
			};

			const ball = this.$createApi(Ball, { pos });
			setTimeout(() => {
				ball.remove();
			}, 2000);
		}, 500);
	} else {
		clearInterval(timer);
	}
 }
}
```

## 增加了create插件.
create.js

```
function create(Vue, Component, props) {
	// 创建一个vue实例来渲染传入的组件
	// 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。
	// 可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
	// 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，
	// 并且你必须使用原生 DOM API 把它插入文档中。
	const vm = new Vue({
		render() {
			return <Component props={props} />;
		}
	}).$mount();

	// 获取组件的实例.
	const componentInstance = vm.$children[0];

	// 给组件实例添加remove方法. 防止内存泄漏.
	componentInstance.remove = () => {
		document.body.removeChild(vm.$el);
		vm.$destroy();
	};

	// 挂载到body上. 不能直接在$mount上传入body, 不然vue会报错. 需要手动的方式来挂载
	document.body.appendChild(vm.$el);

	return componentInstance;
}

export default {
	install(Vue) {
		Vue.prototype.$createApi = (Component, props) => {
			return create(Vue, Component, props);
		};
	}
};
```