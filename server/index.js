import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/productRouter.js";
import ErrorMiddleware from "./middleware/error.js";

const app = express();

// parse application/json
app.use(bodyParser.json({ extended: true, limit: "30mb" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors());
dotenv.config({ path: "config/config.env" });

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Start the server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// Routes Import
app.use("/api/v1", router);

//Middleware
app.use(ErrorMiddleware);
