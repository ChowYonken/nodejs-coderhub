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
  // 获取评论
  async getCommentsByMomentId(momentId) {
    const statement = `
    SELECT 
      c.id, c.content, c.comment_id commentId, c.createAt createTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM comment c
    LEFT JOIN user u ON c.user_id = u.id
    WHERE moment_id = ?;
    `;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();
