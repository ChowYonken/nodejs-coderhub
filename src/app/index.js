const koa = require("koa");
const userRouter = require("../router/user.router");
const bodyParser = require("koa-bodyParser");
const errorHandle = require("./error-handle");

const app = new koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.on("error", errorHandle);

module.exports = app;
