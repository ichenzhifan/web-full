// 静态服务的中间件.
// 使用姿态: app.use(static('./public'))
const fs = require('fs');
const path = require('path');

module.exports = (dirPath = './public') => {
	return async (ctx, next) => {
		const isStaticRequest = ctx.url.indexOf('/public') === 0;

		if (isStaticRequest) {
			// public开头 读取文件
			const url = path.resolve(__dirname, dirPath);
			const fileBaseName = path.basename(url);
			const filepath = url + ctx.url.replace('/public', '');

			try {
				const content = fs.readFileSync(filepath);
				ctx.body = content;
			} catch (error) {
				ctx.body = error.message;
			}
		} else {
			await next();
		}
	};
};
