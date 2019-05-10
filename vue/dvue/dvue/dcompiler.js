// new DCompiler(el, vm);

class DCompiler {
	constructor(el, vm) {
		this.$vm = vm;
		this.$el = document.querySelector(el);

		if (this.$el) {
			// 将所有节点提取到fragment, 提高dom的操作效率.
			this.$fragment = this.node2Fragment(this.$el);

			// 编译模板内容. 同时进行依赖搜集.
			this.compile(this.$fragment);
			this.$el.appendChild(this.$fragment);
		}
	}

	node2Fragment(el) {
		const fragment = document.createDocumentFragment();

		let child;
		while ((child = el.firstChild)) {
			// appendChild方法, 会从原来的宿主中移除. 就是搬迁.
			fragment.appendChild(child);
		}

		return fragment;
	}

	compile(el) {
		const childNodes = el.childNodes;

		if (childNodes && childNodes.length > 0) {
			Array.from(childNodes).forEach((node) => {
				if (node.nodeType === 1) {
					// element
					this.compileElement(node);
				} else if (this.isInterpolation(node)) {
					// text
					this.compileText(node);
				}

				this.compile(node);
			});
		}
	}

	// 是否为插值表达式.
	isInterpolation(node) {
		return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
	}

	compileElement(node) {
		console.log(node.nodeName);
	}

	compileText(node) {
		const exp = RegExp.$1;

    this.update(node, exp.trim(), 'text');
	}

	update(node, exp, type) {
		const fn = this[`${type}Update`];
		if (fn) {
      fn(node, this.$vm[exp]);
      
			new Watcher(this.$vm, exp, (newVal) => {
        fn(node, newVal);
      });
		}
  }
  
  textUpdate(node, val){
    node.textContent = val;
  }
}
