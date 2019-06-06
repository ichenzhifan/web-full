import { initNode } from './dom';

function render(vNode, container){
  container.appendChild(initNode(vNode));
}

export default {
  render
};