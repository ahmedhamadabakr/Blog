const zod = require("zod");

const postSchema = zod.object({
  title: zod.string().min(20).max(80),
  body: zod.string().min(30).max(1000),
});

module.exports = postSchema;
