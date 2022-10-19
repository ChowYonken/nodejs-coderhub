const momentService = require("../service/moment.service");

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
}

module.exports = new MomentController();
