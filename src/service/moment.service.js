const connections = require("../app/database");

// const sqlFragment = `
//   SELECT
//     m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
//     JSON_OBJECT("id", u.id, "name", u.name) author
//   FROM moment m
//   LEFT JOIN user u ON m.user_id = u.id
// `;

class MomentService {
  // 发布动态
  async create(content, userId) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const result = await connections.execute(statement, [content, userId]);
    return result;
  }
  // 获取单个动态
  async getMomentById(momentId) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.name) author
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?;   
    `;
    const [result] = await connections.execute(statement, [momentId]);
    return result[0];
  }
  // 获取多个动态
  async getMomentList(offset, size) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ?, ?;    
    `;
    const [result] = await connections.execute(statement, [offset, size]);
    return result;
  }
  // 更新动态
  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [content, momentId]);
    return result;
  }
  // 删除动态
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();
