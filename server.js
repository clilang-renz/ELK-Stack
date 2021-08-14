const apm = require("elastic-apm-node").start({
  serviceName: "nodeAPMSerivce",
  serverUrl: "http://localhost:8200",
  metricsInterval: "0s",
});

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const User = require("./models/userModel");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey, I'm here!!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    const savedUser = await User.create({ ...req.body });

    res.status(201).json({
      savedUser,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => {
  console.log("Hello I'm listening on PORT 8080");
});
