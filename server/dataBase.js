import mongoose from "mongoose";
import dotenv from "dotenv";

//Config
dotenv.config({ path: "config/config.env" });

const connectDataBase = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB!");
    });

export default connectDataBase;
