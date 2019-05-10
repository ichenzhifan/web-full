class DVue {
	constructor(options) {
		this.$options = options;
		this.$data = options.data;

		// 响应式.
    this.observe(this.$data);

    this.$compiler = new DCompiler(options.el, this);

    options.created && options.created();
	}

	observe(obj) {
		if (!obj || typeof obj !== 'object') {
			return;
		}

		Object.keys(obj).forEach((key) => {
      this.defineReactive(obj, key, obj[key]);
      
      // 代理的vm.
      this.proxyData(key);
		});
	}

	defineReactive(obj, key, value) {
    const dep = new Dep();

		Object.defineProperty(obj, key, {
			get() {
        Dep.target && dep.add(Dep.target);
				return value;
			},

			set(newVal) {
				if (newVal !== value) {
          value = newVal;          
          dep.notify(newVal);
        }
			}
    });
    
    this.observe(value);
  }
  
  proxyData(key){
    Object.defineProperty(this, key, {
      get(){
        return this.$data[key];
      },

      set(newVal){
        this.$data[key] = newVal;
      }
    });
  }
}

class Dep{
  constructor() {
    this.watchers = [];    
  }

  add(watch){
    this.watchers.push(watch);
  }

  notify(){
    this.watchers.forEach(m => m.update());
  }  
}

class Watcher{
  constructor(vm, exp, cb) {
    this.$vm = vm;
    this.$exp = exp;
    this.cb = cb;

    Dep.target = this;
  }  

  update(){
    this.cb && this.cb.call(this.$vm, this.$vm[this.$exp]); 
  }
}
