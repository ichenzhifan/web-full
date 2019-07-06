const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

/**
 * 读取制定目录下的文件
 * @param {String} dir 
 * @param {Function} cb 
 */
function load(dir, cb) {
  const url = path.resolve(__dirname, '../', dir);
  const files = fs.readdirSync(url);

  files.forEach(name => {
    const fileName = name.replace('.js', '');
    const file = require(path.join(url, fileName));
    cb(fileName, file);
  });
}

function initRouter() {
  const router = new Router();

  load('routes', (fileName, routes) => {
    const prefix = fileName === 'index' ? '' : fileName;
    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ');

      router[method](prefix + path, routes[key]);
    });
  });

  return router;
}

module.exports = {
  initRouter
};
