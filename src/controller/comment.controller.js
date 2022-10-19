const commentService = require("../service/comment.service");

class CommentController {
  // 发表评论
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.create(momentId, content, id);
    ctx.body = result;
  }
  // 回复评论
  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const { commentId } = ctx.params;
    const result = await commentService.reply(momentId, content, id, commentId);
    ctx.body = result;
  }
  // 修改评论
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await commentService.update(commentId, content);
    ctx.body = result;
  }
  // 删除评论
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.remove(commentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();
