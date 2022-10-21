const fileService = require("../service/file.service");
const fs = require("fs");
const { AVATAR_PATH } = require("../constants/file-path");

class FileController {
  // 保存图片信息
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将图像信息保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id);
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

module.exports = new FileController();
