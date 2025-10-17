const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // 🔍 DEBUG: Check if MONGO_URI is being loaded
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected");

  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
