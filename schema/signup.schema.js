const zod = require("zod");

const signupSchema = zod.object({
  email: zod.string().min(8).max(80),
  password: zod.string().min(8).max(50),
  name: zod.string().min(3).max(80),
});

module.exports = signupSchema;
