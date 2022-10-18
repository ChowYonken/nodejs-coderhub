const koa = require("koa");
const bodyParser = require("koa-bodyParser");
const errorHandle = require("./error-handle");
const useRoutes = require("../router");

const app = new koa();

app.useRoutes = useRoutes;

app.use(bodyParser());
app.useRoutes();
app.on("error", errorHandle);

module.exports = app;
