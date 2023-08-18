import bodyParser from "body-parser";
import cors from "cors";
import router from "./router/productRouter.js";
import ErrorMiddleware from "./middleware/error.js";
import app from "./app.js";
import connectDataBase from "./dataBase.js";

//Handling  Uncaught Error
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to Handling  Uncaught Error");
});

// parse application/json
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

//Cors
app.use(cors());

connectDataBase();

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
app.use("/api/v1", router);

//Middleware
app.use(ErrorMiddleware);
