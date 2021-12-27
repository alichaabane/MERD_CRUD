const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const FoodModel = require("./models/Food");
const cors = require("cors");
dotenv.config();
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://alichaabane98:root@crud.kwz6w.mongodb.net/food?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.get("/getFoods", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});
app.post("/addFood", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });
  try {
    await food.save();
    res.send("inserted data");
  } catch (err) {
    console.error(err);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Your server is running on port :", port); // 3001
});
