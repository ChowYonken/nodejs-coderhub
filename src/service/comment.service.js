const connections = require("../app/database");

class CommentService {
  // 发表评论
  async create(momentId, content, id) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?);`;
    const [result] = await connections.execute(statement, [
      momentId,
      content,
      id,
    ]);
    return result;
  }
  // 回复评论
  async reply(momentId, content, id, commentId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connections.execute(statement, [
      momentId,
      content,
      id,
      commentId,
    ]);
    return result;
  }
}

module.exports = new CommentService();
