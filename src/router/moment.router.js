const Router = require("koa-router");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
} = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

// 发布动态接口
momentRouter.post("/", verifyAuth, create);

// 获取单个动态接口
momentRouter.get("/:momentId", detail);

// 获得动态列表接口
momentRouter.get("/", list);

// 修改动态接口 登录验证 修改权限验证
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

// 删除动态接口
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

module.exports = momentRouter;
