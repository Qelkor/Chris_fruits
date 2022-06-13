//? Dependencies
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const Fruit = require("./models/fruits");
const fruitsController = require("./controllers/fruits");
const userController = require("./controllers/users");
const User = require("./models/users");

//? Config
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/basiccrud";

mongoose.connect(MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//? middleware
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/fruits", fruitsController);
app.use("/users", userController);

//? Routes

app.get("/", (req, res) => {
  res.send("Hello Worlds");
});

// // SEED ROUTES
// app.get("/fruits/seed", async (req, res) => {
//   try {
//     await Fruit.deleteMany({});
//     const newFruits = await Fruit.create([
//       {
//         name: "grapefruit",
//         color: "pink",
//         readyToEat: true,
//       },
//       {
//         name: "grape",
//         color: "purple",
//         readyToEat: false,
//       },
//       {
//         name: "avocado",
//         color: "green",
//         readyToEat: true,
//       },
//     ]);
//     res.send(newFruits);
//   } catch (error) {
//     res.send(error);
//   }
// });

// //INDEX ROUTES
// app.get("/fruits/", async (req, res) => {
//   try {
//     const fruits = await Fruit.find();
//     res.send(fruits);
//   } catch (error) {
//     console.log(error);
//   }
// });

// //? Create Route
// app.post("/fruits/", async (req, res) => {
//   if (req.body.readyToEat === "on") {
//     // if checked, req.body.readyToEat is set to 'on'
//     req.body.readyToEat = true;
//   } else {
//     // if not checked, req.body.readyToEat is undefined
//     req.body.readyToEat = false;
//   }
//   try {
//     const fruit = await Fruit.create(req.body);
//     console.log(fruit);
//   } catch (error) {
//     console.log(error);
//   }
//   res.send(req.body);
// });

// //SHOW ROUTES
// app.get("/fruits/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const fruit = await Fruit.findById(id);
//     res.send(fruit);
//   } catch (error) {
//     res.send(error);
//   }
// });
// //DELETE ROUTE
// app.delete("/fruits/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const fruit = await Fruit.findByIdAndDelete(id);
//     res.send(fruit);
//   } catch (error) {
//     res.send(error);
//   }
// });

// //UPDATE ROUTE
// app.put("/fruits/:id", async (req, res) => {
//   const { id } = req.params;
//   if (req.body.readyToEat === "true") {
//     // if checked, req.body.readyToEat is set to 'on'
//     req.body.readyToEat = true;
//   } else {
//     // if not checked, req.body.readyToEat is undefined
//     req.body.readyToEat = false;
//   }

//   try {
//     const fruit = await Fruit.findByIdAndUpdate(id, req.body);
//     res.send(fruit);
//   } catch (error) {
//     res.send(error);
//   }
// });

//? listener
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
