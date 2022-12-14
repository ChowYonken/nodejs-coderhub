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
      JSON_OBJECT("id", u.id, "name", u.name, 'avatarUrl', u.avatar_url) author,
      IF(COUNT(l.id),JSON_ARRAYAGG(
        JSON_OBJECT('id', l.id, 'name', l.name)
      ), NULL) labels,
      (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
        JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
        ), NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
      FROM file WHERE m.id = file.moment_id) images
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id;   
    `;
    try {
      const [result] = await connections.execute(statement, [momentId]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }
  // 获取多个动态
  async getMomentList(offset, size) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
        FROM file WHERE m.id = file.moment_id) images
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
  // 动态添加标签
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connections.execute(statement, [momentId, labelId]);
    return result;
  }
  // 判断动态是否存在这个标签（查询关系表）
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connections.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }
  // 获取file列表
  async getFileByFileName(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    try {
      const [result] = await connections.execute(statement, [filename]);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new MomentService();
