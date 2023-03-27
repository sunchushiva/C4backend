const express = require("express");
const UserModel = require("../modules/user.module");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const payload = req.body;
  const email = payload.email;
  try {
    const Data = await UserModel.find({ email });
    if (Data.length > 0) {
      res.status(200).send({ message: "User already exist, please login" });
    } else {
      bcrypt.hash(payload.password, 2, async function (err, hash) {
        if (hash) {
          const newUser = new UserModel({ ...payload, password: hash });
          await newUser.save();
          res.status(200).send({ message: "User sign-in successful" });
        } else {
          res.status(400).send({ message: err });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const Data = await UserModel.find({ email });
    const user = Data[0]._id;
    bcrypt.compare(password, Data[0].password, function (err, result) {
      if (result) {
        res.status(200).send({
          message: "User login successful",
          token: jwt.sign(
            {
              user,
            },
            "secret",
            { expiresIn: "1h" }
          ),
        });
      } else {
        res.status(400).send({ message: "Wrong credentials" });
      }
    });
  } catch (err) {
    res.send({ message: err.message });
  }
});

module.exports = userRoute;

// {
//   "name": "Shiva",
//   "gender": "Male",
//   "age": 23,
//   "city": "Mumbai",
//   "is_married": false,
//   "email": "sunchushiva@gmail.com",
//   "password": "sunchushiva"
// }
