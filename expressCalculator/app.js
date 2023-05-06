const express = require("express");
const ExpressError = require("./expressErrors");
const { validateNums, findMean, findMedian, findMode } = require("./helpers");

const app = express();

app.get("/mean", (req, res, next) => {
  try {
    const { query } = req.query;
    const validNums = validateNums(query);
    if (validNums) {
      const mean = findMean(validNums);
      return res.json({ mean });
    }
  } catch (err) {
    return next(err);
  }
});

app.get("/median", (req, res, next) => {
  try {
    const { query } = req.query;
    const validNums = validateNums(query);
    if (validNums) {
      const median = findMedian(validNums);
      return res.json({ median });
    }
  } catch (err) {
    return next(err);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    const { query } = req.query;
    const validNums = validateNums(query);
    if (validNums) {
      const mode = findMode(validNums);
      return res.json({ mode });
    }
  } catch (err) {
    return next(err);
  }
});

app.use(function (res, req, next) {
  const err = new ExpressError("Page not found", 404);
  next(err);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(5000, () => {
  console.log("Server has started.");
});
