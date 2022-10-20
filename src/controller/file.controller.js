const fileService = require("../service/file.service");

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将图像信息保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id);
    ctx.body = result;
  }
}

module.exports = new FileController();
