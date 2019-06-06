import {Component} from './component';

function createElement(type, props, ...rest){
  delete props.__self;
  delete props.__source;

  props.children = rest;

  let vtype;
  // div, p等.
  if(typeof type === 'string'){
    vtype = 1;
  }else{
    // class组件
    if(type.isReactComponent){
      vtype = 2;
    }else{
      // function组件.
      vtype = 3;
    }
  }

  return { vtype, type, props }
}

export {
  Component
};

export default {
  createElement  
};