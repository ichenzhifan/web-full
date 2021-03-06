// const Koa = require('koa');
// const app = new Koa();

// app.use((ctx, next) => {
//   ctx.body = ctx;
// })

// app.listen(3000);

const VKoa = require('../v-koa');
const VRouter = require('../v-koa/v-koa-router');
const static = require('../v-koa/v-koa-static')
const app = new VKoa();

const router = new VRouter();
router.get('/', async (ctx, next) => {
	ctx.body = '<h1>this is home</h1>';
});


router.get('/user', async (ctx, next) => {
	ctx.body = '<h1>this is user</h1>';
});

app.use(static(__dirname));
app.use(router.routes());

app.listen(3000);
