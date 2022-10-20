const labelService = require("../service/label.service");

// 验证标签是否存在 不存在则添加到label表中
const verifyLabelExists = async (ctx, next) => {
  // 1.取出要添加的所有的标签
  const { labels } = ctx.request.body;
  // 2.判断每个标签在label中是否存在
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await labelService.getLabelByName(name);
    const label = { name };
    // 标签不存在
    if (!labelResult) {
      // 创建标签数据
      const result = await labelService.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    // 添加标签数组
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};
