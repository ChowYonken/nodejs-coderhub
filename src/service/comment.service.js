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
  // 修改评论
  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [content, commentId]);
    return result;
  }
  // 删除评论
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const [result] = await connections.execute(statement, [commentId]);
    return result;
  }
}

module.exports = new CommentService();
