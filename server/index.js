import bodyParser from "body-parser";
import cors from "cors";
import productRouter from "./router/productRouter.js";
import userRouter from "./router/userRouter.js";
import ErrorMiddleware from "./middleware/error.js";
import app from "./app.js";
import connectDataBase from "./dataBase.js";
import cookieParser from "cookie-parser";
import orderRouter from "./router/orderRouter.js";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

//Handling  Uncaught Error
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to Handling  Uncaught Error"); // THis must be at the top
});

// parse application/json
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cookieParser());

//Cors
app.use(
  "*",
  cors({
    origin: true,
    credentials: true, // Allow cookies to be sent and received
  })
);

app.use(fileUpload());

connectDataBase();
// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Start the server
const server = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// Unhandled  Promise  Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});

// Routes Import
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

//Middleware
app.use(ErrorMiddleware);
