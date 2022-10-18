const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 获取用户传递过来的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    ctx.body = result;
  }
}

module.exports = new UserController();
