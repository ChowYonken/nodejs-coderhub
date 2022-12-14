const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");

// 账号密码规则验证
const verifyUser = async (ctx, next) => {
  // 1.获取用户和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户或密码是否为空
  if (!name || !password) {
    // 将错误发出
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  // 3.判断用户是否存在
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

// 对密码进行加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);

  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
