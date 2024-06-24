const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful");
  } catch (error) {
    console.log(`connection failed ${error}`);
    process.exit(0);
  }
};

module.exports = connectDb;
