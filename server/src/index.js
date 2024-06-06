const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const { auth } = require("./middlewares/authMiddleware");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/react-gems")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(auth);

app.get("/", (req, res) => {
  res.send("RESTful service");
});

app.use(routes);

const port = 3030;

const server = app.listen(port, () =>
  console.log(`RESTful server is listening on port ${port}...`)
);

module.exports = { app, server };
