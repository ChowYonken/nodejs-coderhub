const momentService = require("../service/moment.service");
const fs = require("fs");
const { PICTURE_PATH } = require("../constants/file-path");

class MomentController {
  // 发布动态
  async create(ctx, next) {
    // 获取用户id和评论内容
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    const result = await momentService.create(content, userId);
    ctx.body = result;
  }
  // 查询单个动态
  async detail(ctx, next) {
    // 获取动态id
    const momentId = ctx.request.params.momentId;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }
  // 获取多个动态
  async list(ctx, next) {
    const { offset, size } = ctx.request.query;
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }
  // 修改动态
  async update(ctx, next) {
    const { momentId } = ctx.request.params;
    const { content } = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }
  // 删除动态
  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }
  // 动态添加标签
  async addLabel(ctx, next) {
    // 获取标签和动态id
    const { momentId } = ctx.params;
    const { labels } = ctx;
    // 添加所有标签
    for (let label of labels) {
      const isExists = await momentService.hasLabel(momentId, label.id);
      if (!isExists) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = "给动态添加标签成功";
  }
  // 获取动态配图url地址
  async fileInfo(ctx, next) {
    const { filename } = ctx.params;
    const fileInfo = await momentService.getFileByFileName(filename);
    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
