const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const { auth } = require("./middlewares/authMiddleware");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
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

const server = app.listen(process.env.PORT, () =>
  console.log(`RESTful server is listening on port ${process.env.PORT}...`)
);

module.exports = { app, server };
