import express from "express";
import { createTables } from "./models/Sql.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import addProductRouter from "./routes/addProduct.js";
import addCustomerRouter from "./routes/addcustomer.js";
import  reviewsrouter from "./routes/reviews.js"

const app = express();
const PORT = 3000;
let tablesReady;

const ensureTables = () => {
  if (!tablesReady) {
    tablesReady = createTables();
  }
  return tablesReady;
};

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await ensureTables();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/addproduct", addProductRouter);
app.use("/api/addCustomer", addCustomerRouter);
app.use("/api/reviews", reviewsrouter);



app.get("/", (req, res) => {
  res.send("Express is running with ES Modules!");
});

const startServer = async () => {
  try {
    await ensureTables();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

if (!process.env.VERCEL) {
  startServer();
}

export default app;
