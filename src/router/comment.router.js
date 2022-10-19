const Router = require("koa-router");
const { create, reply } = require("../controller/comment.controller");
const { verifyAuth } = require("../middleware/auth.middleware");

const commentRouter = new Router({ prefix: "/comment" });

// 发表评论
commentRouter.post("/", verifyAuth, create);
commentRouter.post("/:commentId/reply", verifyAuth, reply);

module.exports = commentRouter;