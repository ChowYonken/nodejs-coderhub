const userService = require("../service/user.service");
const { AVATAR_PATH } = require("../constants/file-path");
const fs = require("fs");

class UserController {
  async create(ctx, next) {
    // 获取用户传递过来的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    ctx.body = result;
  }
  // 获取图片地址
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const [avatarInfo] = await fileService.getAvatarByUserId(userId);
    // 设置图片类型
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
