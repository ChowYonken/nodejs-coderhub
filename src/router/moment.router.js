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
  addLabel,
  fileInfo,
} = require("../controller/moment.controller");
const { verifyLabelExists } = require("../middleware/label.middelware");

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

// 动态添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabel
);

// 获取动态的配图
momentRouter.get("/images/:filename", fileInfo);

module.exports = momentRouter;
