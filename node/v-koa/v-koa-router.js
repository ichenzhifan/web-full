// 路由中间件.
class Router {
	constructor() {
		this.stack = [];
	}

	register(path, method, handler) {
		const route = {
			path,
			method,
			handler
		};

		this.stack.push(route);
	}

	get(path, handler) {
		this.register(path, 'get', handler);
	}

	post(path, handler) {
		this.register(path, 'post', handler);
	}

	routes() {
		return async (ctx, next) => {
			const { url, method } = ctx;
			const route = this.stack.find((s) => s.path === url && s.method === method);

			if (route && typeof route.handler === 'function') {
				route.handler(ctx, next);
				return;
			}

			await next();
		};
	}
}

module.exports = Router;

// 使用姿态.
// const router = new Router;
// app.use(router.routes())
