/**
 * 方法合成. 将多个中间件, 合成一个.
 * @param  {...Function} middlewares 
 */
const compose = (middlewares) => {
	return (ctx) => {
    const dispatch = (i) => {
      const fn = middlewares[i];
      const next = () => dispatch(i + 1);
      
			if (!fn) {
				return Promise.resolve();
			}

			return Promise.resolve(fn(ctx, next));
		};

		return dispatch(0);
	};
};

module.exports = compose;
