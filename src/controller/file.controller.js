const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");

class FileController {
  // 保存图片信息
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将图像信息保存到数据库中
    await fileService.createAvatar(filename, mimetype, size, id);
    // 3.将地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);
    ctx.body = "上传头像成功";
  }
  async savePictureInfo(ctx, next) {
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.request.query;
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }
    ctx.body = "上传动态配图成功";
  }
}

module.exports = new FileController();
