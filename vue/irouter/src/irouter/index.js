export default class IRouter {
	constructor(Vue, options = {}) {
		this.$options = options;
		this.app = new Vue({
			data: {
				current: '#/'
			}
		});
		this.routeMap = {};

		this.init();
		this.createRouteMap(this.$options);
		this.initComponent(Vue);
	}

	init() {
		window.addEventListener('load', this.onHashChange.bind(this), false);
		window.addEventListener('hashchange', this.onHashChange.bind(this), false);
	}

	createRouteMap(options) {
		if (options && options.routes) {
			// 把path和组件对应起来.
			options.routes.forEach((m) => {
        this.routeMap[m.path] = m.component;
      });
		}
	}

  /**
   * 注册两个全局的组件. router-link, router-view
   * @param {*} Vue 
   */
	initComponent(Vue) {
    Vue.component('router-link', {
      props: ['to'],
      render(h) {
        // 使用jsx渲染
        return <a href={this.to}>{this.$slots.default}</a>

        // 使用render函数渲染.
        // return h(
        //   'a',
        //   {attrs: {href: this.to }},
        //   this.$slots.default
        // );
      }
    });

    const that = this;
    Vue.component('router-view', {
      render(h){
        const Component = that.routeMap[that.app.current];
        return <Component />;

        // return h(component);
      }
    });
  }

	getHash() {
		// 去除#号.
		return window.location.hash.slice() || '#/';
	}

	onHashChange() {
		this.app.current = this.getHash();
	}
}
