const express = require("express");
const cors = require("cors");

const helmet = require("helmet");
const winston = require("winston");

const whitelist = ["http://127.0.0.1:8080"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use(helmet());
app.use(helmet.hidePoweredBy());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/secret", (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);
  if (userInput) {
    winston.log("info", "user input: " + userInput);
    res.status(200).json("success");
  } else {
    winston.error("This guy is messing with us:" + userInput);
    res.status(400).json("incorrect submission");
  }
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
