const express = require("express");
const ExpressError = require("./expressErrors");

function getItemAndIdxByName(name, items) {
  console.log("Inside helper function");
  let foundItem;
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === name) {
      foundItem = items[i];
      return [foundItem, i];
    }
  }
  if (!foundItem) throw new ExpressError("Item not found.", 404);
}

module.exports = getItemAndIdxByName;
