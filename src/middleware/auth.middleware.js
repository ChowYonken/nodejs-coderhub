const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const md5password = require("../utils/password-handle");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名或密码是否为空
  if (!name || !password) {
    const err = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", err, ctx);
  }
  // 3.判断用户是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const err = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", err, ctx);
  }
  // 4.判断密码是否和数据库中的密码相同
  if (md5password(password) !== user.password) {
    const err = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", err, ctx);
  }
  ctx.user = user;
  await next();
};

// token验证
const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};
// 权限认证
const verifyPermission = async (ctx, next) => {
  // 1.获取key值
  const [resourceKey] = Object.keys(ctx.params);
  // 去除key值后面的Id字母
  const tableName = resourceKey.replace("Id", "");
  // 获取value值
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  try {
    const isPermission = await authService.checkResource(
      tableName,
      resourceId,
      id
    );
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyUser,
  verifyAuth,
  verifyPermission,
};
