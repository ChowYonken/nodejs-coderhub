const labelService = require("../service/label.service");

class LabelController {
  // 添加标签
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await labelService.create(name);
    ctx.body = result;
  }
  // 获取标签
  async getLabels(ctx, next) {
    const { offset, size } = ctx.request.query;
    const result = await labelService.getLabels(offset, size);
    ctx.body = result;
  }
}

module.exports = new LabelController();
