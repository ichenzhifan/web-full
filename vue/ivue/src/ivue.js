import Dep from './dep';
import Watcher from './watcher';
import Compiler from './compiler';

/**
 * new IVue({data:{}, methods:{})
 * 
 * 做的事情有:
 * - 添加响应.
 */
export default class IVue {
  constructor(options = {}) {
    const {
      el,
      data,
      methods
    } = options;

    this.$options = options;
    this.$el = el;
    this.$data = data;
    this.$methods = methods;

    // 对data添加响应.
    this.observe(this.$data);

    this.$compiler = new Compiler(this.$el, this);

    // 执行created钩子函数.
    options.created && options.created.call(this);

    // new Watcher();
    // this.$data.name;
    // this.$data.name = 'aaaa'; 
  }

  observe(obj) {
    if (!obj || typeof obj !== 'object') {
      return;
    }

    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key, obj[key]);

      // 代理的vm上.
      this.proxyData(key);
    });
  }

  defineReactive(obj, key, val) {
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 搜集依赖.
        Dep.target && dep.add(Dep.target);

        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;

          // 通知依赖执行更新操作.
          dep.notify();
        }
      }
    });

    // 递归添加.
    this.observe(obj[key]);
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