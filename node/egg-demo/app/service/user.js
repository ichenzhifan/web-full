const Service = require('egg').Service;

class User extends Service {

  async getAll() {
    // return [
    //   { name: 'tom', age: 12 }
    // ]

    return await this.ctx.model.User.findAll();
  }
}

module.exports = User;