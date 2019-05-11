/**
 * 定义依赖.
 */
export default class Dep{
  constructor(){
    this.deps = [];
  }

  add(dep){
    this.deps.push(dep);
  }

  notify(){
    this.deps.forEach(m => m.update());
  }
}