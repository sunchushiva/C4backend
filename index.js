const express = require("express");
const connection = require("./db");
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use("/users", userRoute);
app.use("/posts", postRoute);

app.listen(8080, async () => {
  try {
    console.log("Server started");
    await connection, console.log("Connected to Mongo Atlas");
  } catch (err) {
    console.log("Couldn't connect to Mongo Atlas");
  }
});
