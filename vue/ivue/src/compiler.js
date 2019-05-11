import { INTERPOLATION } from './util/regs';
import Watcher from './watcher';
import {
  isDirective,
  isEvent
} from './util/tools';

/**
 * new Compiler(el, vm)
 */
export default class Compiler {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      // 把宿主下的所有子节点摘到fragment下, 提升dom操作的效率.
      this.$fragment = this.html2fragment(this.$el);

      // 编译dom.
      this.compile(this.$fragment);

      // 编译好的html重新加回到宿主中, 完成渲染.
      this.$el.appendChild(this.$fragment);
    }
  }

  html2fragment(el) {
    const fragment = document.createDocumentFragment();

    let child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  }

  compile(el) {
    const childNodes = el.childNodes;

    Array.from(childNodes).forEach(node => {
      // 判断节点类型.
      switch (node.nodeType) {
        // 1. 文本类型
        case Node.TEXT_NODE: {
          this.compileText(node);
          break;
        }

        // 2. 节点类型.
        case Node.ELEMENT_NODE: {
          this.compileElement(node);
          break;
        }
        default: {
          break;
        }
      }

      // 递归编译.
      this.compile(node);
    });
  }

  compileText(node) {
    // 检查是否为插值文本.
    // <p>{{name}}</p>
    if (INTERPOLATION.test(node.textContent)) {
      this.update(node, RegExp.$1.trim(), 'text');
    }
  }

  compileElement(node) {
    const {
      attributes
    } = node;

    Array.from(attributes).forEach(attr => {
      if (isDirective(attr.name)) {
        // i-text="age"
        // key: text,
        // attr.value: age
        const key = attr.name.substring(2);
        this.update(node, attr.value, key);
      } else if (isEvent(attr.name)) {
        // event: @click="submit"
        const key = attr.name.substring(1);
        this.eventHandler(node, key, attr.value);
      }
    });
  }

  /**
   * 
   * @param {*} node 
   * @param {String} key 在vue data中定义的key值.
   * @param {String} type text, model, html等
   */
  update(node, key, type) {
    // textUpdate, htmlUpdate...
    const updator = this[`${type}Update`];
    if (updator) {
      // 编译的时候执行一次.
      updator.call(this, node, this.$vm[key], key);

      // 依赖搜集.
      // 当下次值有更新时, 触发更新操作.
      new Watcher(this.$vm, key, val => {
        updator.call(this, node, val, key);
      });
    }
  }

  textUpdate(node, val) {
    node.textContent = val;
  }

  htmlUpdate(node, val) {
    node.innerHTML = val;
  }

  modelUpdate(node, val, key) {
    node.value = val;

    node.addEventListener('input', ev => {
      this.$vm[key] = ev.target.value;
    });
  }

  eventHandler(node, type, fnName) {
    const fn = this.$vm.$methods[fnName];
    node.addEventListener(type, fn.bind(this.$vm));
  }
}