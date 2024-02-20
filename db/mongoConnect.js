import mongoose from "mongoose";

const { MONGO_URL } = process.env;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mango DB connected successfuly");
  } catch (error) {
    console.log(error, 'kurwa');
    process.exit(1);
  }
};