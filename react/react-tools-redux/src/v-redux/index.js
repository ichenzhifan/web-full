// redux的主要api:
// - createStore,
// - applyMiddleware,
// - bindActionCreator

// - getState,
// - dispatch,
// - subscribe,

/**
 * 创建store对象.
 * @param {Funcion} reducer 
 * @param {Funcion} enhancer 中间件.
 */
const createStore = (reducer, enhancer) => {
	if (enhancer) {
		return enhancer(createStore)(reducer);
	}

	let currentState;
	const currentListeners = [];

	const getState = () => currentState;

	const subscribe = (hander) => currentListeners.push(hander);

	const dispatch = (action) => {
		currentState = reducer(currentState, action);
		currentListeners.forEach((v) => v());

		return action;
	};

	return {
		getState,
		subscribe,
		dispatch
	};
};

// applyMiddleware(m1, m2, m3);
const applyMiddleware = (...middlewares) => {
	return (createStore) => (...args) => {
		const store = createStore(...args);
		let dispatch = store.dispatch;

		const midApi = {
			getState: store.getState,
			dispatch: (...args) => dispatch(...args)
		};

		const chain = middlewares.map((m) => m(midApi));
		dispatch = compose(...chain)(dispatch);

		return { ...store, dispatch };
	};
};

const compose = (...funcs) => {
	if (funcs.length === 0) {
		return (args) => args;
	}

	if (funcs.length === 1) {
		return funcs[0];
	}

	// 把多个方法. 合并成一个复合的方法.
	// [fn1, fn2, fn3] --> fn3(fn2(fn1))
	return funcs.reduce((left, right) => {
		return (...args) => {
			return right(left(...args));
		};
	});
};

const bindActionCreator = (creator, dispatch) => {
	return (...args) => dispatch(creator(...args));
};

export { createStore, applyMiddleware, bindActionCreator };
