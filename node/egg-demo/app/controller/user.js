const Controller = require('egg').Controller;

class User extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getAll()
  }
}

module.exports = User;