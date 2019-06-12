const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const compose = require('./middleware');

class VKoa {
	constructor() {
    this.middlewares = [];
  }

	createContext(req, res) {
		const ctx = Object.create(context);
		ctx.request = Object.create(request);
		ctx.response = Object.create(response);

		ctx.req = ctx.request.req = req;
		ctx.res = ctx.response.res = res;
		return ctx;
	}

	use(callback) {
    // this.callback = callback;
    this.middlewares.push(callback);
	}

	listen(...args) {
		const app = http.createServer(async (req, res) => {
      // this.callback(req, res);
      const ctx = this.createContext(req, res);
      const fn = compose(this.middlewares);

      await fn(ctx)
      ctx.res.end(ctx.body);
		});

		app.listen(...args);
	}
}

module.exports = VKoa;
