const express = require("express");
const usersRouter = require("./src/routes/users");

const app = express();
app.use(express.json());

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

module.exports = app;