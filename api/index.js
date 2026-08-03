import express from "express";
import serverless from "serverless-http";
import { createTables } from "../models/Sql.js";
import registerRouter from "../routes/register.js";
import loginRouter from "../routes/login.js";
import addProductRouter from "../routes/addProduct.js";
import addCustomerRouter from "../routes/addcustomer.js";
import reviewsrouter from "../routes/reviews.js";

const app = express();
let dbInitPromise = null;

const ensureDatabase = async () => {
  if (!dbInitPromise) {
    dbInitPromise = createTables();
  }
  return dbInitPromise;
};

app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await ensureDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/addproduct", addProductRouter);
app.use("/addCustomer", addCustomerRouter);
app.use("/reviews", reviewsrouter);

app.get("/", (req, res) => {
  res.send("Express Serverless API is running!");
});

export default serverless(app);
