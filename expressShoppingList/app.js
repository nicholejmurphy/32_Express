const express = require("express");
const app = express();
const ExpressError = require("./expressErrors");
const itemsRoutes = require("./itemsRoutes");
const morgan = require("morgan");

app.use("/items", itemsRoutes);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.send("Homepage");
});

// Custom 404 Handler
app.use(function (req, res, next) {
  const e = new ExpressError("Page not found.", 404);
  next(e);
});

// Custom Error Handler
app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;
  return res.status(status).send({
    Error: { message, status },
  });
});

module.exports = app;
