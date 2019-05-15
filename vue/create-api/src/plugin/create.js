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


