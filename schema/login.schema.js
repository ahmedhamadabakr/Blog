const zod = require("zod");

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8).max(30),
});

module.exports = loginSchema;
