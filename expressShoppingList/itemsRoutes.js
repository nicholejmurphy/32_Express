const express = require("express");
const router = express.Router();
const items = require("./fakeDb");
const getItemAndIdxByName = require("./helpers");
const ExpressError = require("./expressErrors");

router.get("/", (req, res) => {
  return res.send({ items });
});

router.get("/:name", (req, res, next) => {
  try {
    const foundItem = getItemAndIdxByName(req.params.name, items);
    return res.send(foundItem[0]);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    if (!req.query.name || !req.query.price)
      throw new ExpressError("Invalid item.", 400);
    const item = { name: req.query.name, price: req.query.price };
    items.push(item);
    return res.status(201).send(item);
  } catch (err) {
    next(err);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    const foundItem = getItemAndIdxByName(req.params.name, items);
    if (!foundItem) throw new ExpressError("Could not find item.", 404);
    const newItem = {
      name: req.query.name || foundItem.name,
      price: req.query.price || foundItem.price,
    };
    items[foundItem[1]].name = newItem.name;
    items[foundItem[1]].price = newItem.price;
    return res.send(newItem);
  } catch (err) {
    next(err);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    const foundItem = getItemAndIdxByName(req.params.name, items);
    if (!foundItem) throw new ExpressError("Could not find item.", 404);
    items.splice(foundItem[1], 1);
    return res.send({ Message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
