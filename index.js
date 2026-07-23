import express from "express";
import { createTables } from "./models/Sql.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import addProductRouter from "./routes/addProduct.js";
import addCustomerRouter from "./routes/addcustomer.js";
import  reviewsrouter from "./routes/reviews.js"

const app = express();
const PORT = 3000;

app.use(express.json());

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
    await createTables();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();