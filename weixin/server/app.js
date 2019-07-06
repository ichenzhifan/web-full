const Koa = require('koa');
const router = require('koa-router')();
const config = require('./config');
const wechat = require('co-wechat');
const koa = new Koa();

router.all('/wechat', wechat(config).middleware(async (message, ctx) => {
  // console.log('xxx', message);
  return 'Hi ' + message.Content;
}));

koa.use(router.routes());
koa.listen(80);