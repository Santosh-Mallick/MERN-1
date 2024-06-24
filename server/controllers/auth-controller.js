const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

const home = async (req, res) => {
  try {
    res.status(200).send("router");
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) { 
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      msg: "Registration Successfull",
      token: await userCreated.generateToken(), //generateTOken is an instance in user-model.js
      userID: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(500).json({ message: `Internal server error` });
    next(error);
  }
};

// *________________________
//* User Login Logic
// *________________________

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successfull",
        token: await userExist.generateToken(),
        userID: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Credential" });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error}` });
  }
};

// *-------------------
// to send user data - User Logic
// *-------------------

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    // console.log(userData);
    res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login, user };
