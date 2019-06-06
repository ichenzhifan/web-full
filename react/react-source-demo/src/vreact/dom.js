function initNode(vNode) {
	const { vtype } = vNode;

	if (!vtype) {
		// 文本节点.
		return createTextElement(vNode);
	}

	if (vtype === 1) {
		return createNativeElement(vNode);
	} else if (vtype === 2) {
		return createClassElement(vNode);
	} else {
		return createFuncElement(vNode);
	}
}

/**
 * div, p
 * @param {object} vNode {vtype, type, props}
 */
function createNativeElement(vNode) {
	const { type, props } = vNode;

	const node = document.createElement(type);
	const { key, children, ...rest } = props;

	Object.keys(rest).forEach((k) => {
		if (k === 'className') {
			node.setAttribute('class', rest[k]);
		} else if (k === 'htmlFor') {
			node.setAttribute('for', rest[k]);
		} else if (k.startsWith('on')) {
			node.addEventListener(k.substring(2).toLowerCase(), rest[k]);
		} else {
			node.setAttribute(k, rest[k]);
		}
	});

	key && node.setAttribute('key', key);
	children.forEach((c) => {
		if (Array.isArray(c)) {
			c.forEach((m) => {
				node.appendChild(initNode(m));
			});
		} else {
			node.appendChild(initNode(c));
		}
	});

	return node;
}

/**
 * class
 * @param {object} vNode {vtype, type, props}
 */
function createClassElement(vNode) {
	const { type: Component, props } = vNode;
	const instance = new Component(props);
	const vDom = instance.render();

	return initNode(vDom);
}

/**
 * Function
 * @param {object} vNode {vtype, type, props}
 */
function createFuncElement(vNode) {
	const { type: func, props } = vNode;
	const vDom = func(props);
	return initNode(vDom);
}

/**
 * 文本
 * @param {object} vNode {vtype, type, props}
 */
function createTextElement(vNode) {
	return document.createTextNode(vNode);
}

export { initNode };
