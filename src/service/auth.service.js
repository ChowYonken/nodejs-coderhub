const connections = require("../app/database");

class AuthService {
  async checkMoment(momentId, userId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
    const [result] = await connections.execute(statement, [momentId, userId]);
    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();
