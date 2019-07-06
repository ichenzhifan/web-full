module.exports = {
  'get /': async ctx => {
    ctx.body = 'this is home'
  },
  'get /detail': ctx => {
    ctx.body = 'this is detail page'
  }
};