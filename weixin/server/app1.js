const Koa = require('koa');
const router = require('koa-router')();
const config = require('./config');
// const wechat = require('co-wechat');
const url = require('url');
const crypto = require('crypto');
const xml2js = require('xml2js');
const xmlParser = require('koa-xml-body')
const axios = require('axios')
const koaStatic = require('koa-static')
const koa = new Koa();

koa.use(xmlParser());
koa.use(koaStatic(__dirname + '/'));

const tokenCache = {
    access_token: '',
    updateTime: Date.now(),
    expires_in: 7200,
  };

// 配置验证
router.get('/wechat', async ctx => {
  const {
    // 微信加密签名，signature结合了开发者填写的token参数和
    // 请求中的timestamp参数、nonce参数
    signature,

    // 随机字符串
    echostr,

    // 时间戳
    timestamp,

    // 随机数
    nonce
  } = ctx.query;

  // 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密
  const str = [config.token, timestamp, nonce].sort().join('');
  const sh = crypto.createHash('sha1').update(str).digest('hex');

  if (signature === sh) {
    ctx.body = echostr;
  } else {
    ctx.body = 'verify failed';
  }
});

router.post('/wechat', async ctx => {
  const {
    xml: msg
  } = ctx.request.body
  const builder = new xml2js.Builder()

  const result = builder.buildObject({
    xml: {
      ToUserName: msg.FromUserName,
      FromUserName: msg.ToUserName,
      CreateTime: Date.now(),
      MsgType: msg.MsgType,
      Content: 'Hello ' + msg.Content
    }
  })

  ctx.body = result
});


router.get('/token', async ctx => {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`;
  const result = await axios.get(url);

  Object.assign(tokenCache, result.data, {
      updateTime: Date.now()
  });

  ctx.body = result.data;  
})

router.get('/users', async ctx => {
  const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`;
  const result = await axios.get(url);
  console.log(result)

  ctx.body = result.data;
})

// router.all('/wechat', wechat(config).middleware(async (message, ctx) => {
//   // console.log('xxx', message);
//   return 'Hi ' + message.Content;
// }));

koa.use(router.routes());
koa.listen(80);