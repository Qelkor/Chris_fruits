//? Dependencies
const express = require("express");
const Fruit = require("../models/fruits");

//? Config
const router = express.Router();

//? Routes
//? Seed  Routes
router.get("/seed", async (req, res) => {
  try {
    await Fruit.deleteMany({});
    const newFruits = await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.send(newFruits);
  } catch (error) {
    res.send(error);
  }
});

//? Index Route
router.get("/", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.send(fruits);
  } catch (error) {
    res.send(error);
  }
});

//? Create Route
router.post("/", async (req, res) => {
  if (req.body.readyToEat === "on") {
    // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  try {
    const fruit = await Fruit.create(req.body);
    console.log(fruit);
  } catch (error) {
    res.send(error);
  }
  res.send(req.body);
});

//? Show Route
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fruit = await Fruit.findById(id);
    res.send(fruit);
  } catch (error) {
    res.send(error);
  }
});

//? delete route
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fruit = await Fruit.findByIdAndDelete(id);
    res.send(fruit);
  } catch (error) {
    res.send(error);
  }
});

//? update route
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (req.body.readyToEat === "true") {
    // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }

  try {
    const fruit = await Fruit.findByIdAndUpdate(id, req.body, { new: true });
    res.send(fruit);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
