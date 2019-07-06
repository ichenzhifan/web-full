'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    await ctx.model.User.sync({ force: true });
    const ret = await ctx.model.User.create({
      name: 'tom',
      address: 'shanghai of china'
    })

    console.log(ret);

    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
