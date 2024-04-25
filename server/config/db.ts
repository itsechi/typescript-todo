import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.DB_URI!);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err}`);
  }
}

