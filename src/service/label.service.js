const connections = require("../app/database");

class LabelService {
  // 创建标签
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connections.execute(statement, [name]);
    return result;
  }
  // 查找标签
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connections.execute(statement, [name]);
    return result[0];
  }
  // 获取标签
  async getLabels(offset, size) {
    const statement = `SELECT * FROM label LIMIT ?,?;`;
    const [result] = await connections.execute(statement, [offset, size]);
    return result;
  }
}

module.exports = new LabelService();
