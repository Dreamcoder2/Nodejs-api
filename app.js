const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/orders");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error");
require("dotenv/config");

//intialize cors
app.use(cors());
app.options("*", cors());

// read env variaables
const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use(errorHandler);

//Routes
app.use(`${api}/products`, productRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/user`, userRouter);
app.use(`${api}/order`, orderRouter);

// connect to db
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((result) => {
    app.listen(3000, () => {
      console.log("server is ready $ db connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
