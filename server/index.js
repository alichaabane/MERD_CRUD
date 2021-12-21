const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const FoodModel = require("./models/Food");

dotenv.config();
app.use(express.json());

mongoose.connect('mongodb+srv://alichaabane98:root@crud.kwz6w.mongodb.net/food?retryWrites=true&w=majority', { useNewUrlParser: true })


app.get('/', async (req, res) => {
 const food = new FoodModel({foodName: 'Apple', daysSinceIAte: 3})
    try {
        await food.save();
        res.send("inserted data");
    } catch(err) {
        console.error(err);
    }

});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Your server is running on port :',port); // 3001

});
