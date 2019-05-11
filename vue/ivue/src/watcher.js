import Dep from './dep';

export default class Watcher{
  constructor(vm, key, cb){
    this.$vm = vm;
    this.$key = key;
    this.$cb = cb;

    Dep.target = this;

    // 访问一下vm data下的key, 把当前watcher实例添加
    // 到dep中.
    this.$vm[key];

    Dep.target = null;
  }

  update(){
    this.$cb && this.$cb.call(this.$vm, this.$vm[this.$key]);
  }
}