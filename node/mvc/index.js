const app = new (require('koa'))();
const {
  initRouter
} = require('./lib/loader');

app.use(initRouter().routes());
app.listen(3000)