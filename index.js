const express = require("express");
const app = express();
const ejs = require("ejs");
const cookieParser = require("cookie-parser");

const transporter = require("./mailer");
const port = process.argv[2] || 5000;

app.use(express.urlencoded({ extended: true })); //this line can me read req.body
app.use(express.json()); //to read json
app.engine("html", ejs.renderFile);
app.use(express.static("public"));
app.use(cookieParser());

const postsRouter = require("./routers/posts.router");
app.use(postsRouter);
const usersRouter = require("./routers/users.router");
app.use(usersRouter);
const authRouter = require("./routers/auth.router");
app.use(authRouter);
const dashboardRouter = require("./routers/dashboard.router");
app.use(dashboardRouter);



app.get("/send-mail", (req, res) => {
  transporter.sendMail({
    from: "myemail@gmail.com",
    to: "clientemail@gmail.com",
    subject: "hello",
    text: "hello world",
    html: "<h1>Your OTP IS</h1>",
  });

  res.send("send meail");
});

/* app.get("/api/posts/:postId/archive", (req, res) => {
  const postId = req.params.postId;

  const oldPath = `data/posts/${postId}.json`;
  const newPath = `data/archive/${postId}.json`;
  fs.renameSync(oldPath, newPath);

  res.send("Post archived");
}); */

app.all("*", (req, res) => {
  res.send("404 Page Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
