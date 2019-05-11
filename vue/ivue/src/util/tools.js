/**
 * 判断是否为指令. 格式为i-text, i-html, i-model等.
 * @param {String} attr 
 */
const isDirective = attr => {
  return attr.indexOf('i-') === 0;
};

const isEvent = attr => {
  return attr.indexOf('@') === 0;
}

export {
  isDirective,
  isEvent
};