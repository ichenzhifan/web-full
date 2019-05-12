const Koa = require("koa");
const Router = require("koa-router");

// 用于签发token
const jwt = require("jsonwebtoken");

// 用于验证token.
const jwtAuth = require("koa-jwt");

// 密钥
const secret = "it's a secret";

const app = new Koa();
const router = new Router();

router.get('/api/login', async ctx => {
  const { username, password } = ctx.query;
  if (username === 'jack' && password === '111111') {
    // 签发token.
    const token = jwt.sign({
      data: { name: username },

      // 过期时间
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },

      // 使用的密钥.
      secret
    );

    ctx.body = {
      code: 200,
      token
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      code: 1,
      message: '用户名和密码错误'
    }
  }
});

router.get(
  '/api/getUserInfo',

  // 验证token是否有效
  jwtAuth({ secret }),
  async ctx => {
    ctx.body = {
      code: 200,
      name: 'jack'
    }
  });

app.use(router.routes());
app.listen(3000);