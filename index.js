import express from "express";
import cors from "cors";
import { createTables } from "./models/Sql.js";

import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import addProductRouter from "./routes/addProduct.js";
import addCustomerRouter from "./routes/addcustomer.js";
import reviewsrouter from "./routes/reviews.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "https://zeetrick-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  if (req.method === "GET") {
    res.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }

  next();
});

let tablesReady;

const ensureTables = () => {
  if (!tablesReady) {
    tablesReady = createTables().catch((error) => {
      console.error("Failed to initialize database tables:", error);
      tablesReady = undefined;
      throw error;
    });
  }

  return tablesReady;
};

app.get("/", (req, res) => {
  res.status(200).send("Express is running with ES Modules!");
});

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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled Runtime Error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message || "An unexpected error occurred",
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;