const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const app = new Koa()
const conf = require('./config')
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))
const axios = require('axios')
const Oauth = require('co-wechat-oauth');
const client = new Oauth(conf.appid, conf.appsecret);

router.get('/favicon.ico', async ctx => {
  ctx.body = '';
})

/**
 * 微信登录.
 */
router.get('/wxAuthorize', async ctx => {
  const redirectUrl = ctx.href.replace('wxAuthorize', 'wxCallback');
  const url = client.getAuthorizeURL(redirectUrl, ctx.query.id, 'snsapi_userinfo')

  ctx.redirect(url);
})

/**
 * callback中返回code. 根据code可以获取accesstoken
 */
router.get('/wxCallback', async ctx => {
  const {code} = ctx.query;
  
  const accessToken = await client.getAccessToken(code);
  const { access_token: token, openid } = accessToken.data;

  ctx.redirect('/?openid=' + openid );
});

router.get('/getUser', async ctx => {
  const { openid } = ctx.query;

  const data = await client.getUser(openid);
  ctx.body = data;
});


app.use(router.routes());


app.listen(80);