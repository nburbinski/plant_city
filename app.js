const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const plantsRouter = require("./controllers/plants");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());

app.use("/api/plants", plantsRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

module.exports = app;
