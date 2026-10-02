// import express from "express";
// import { createTables } from "./models/Sql.js";
// import registerRouter from "./routes/register.js";
// import loginRouter from "./routes/login.js";
// import addProductRouter from "./routes/addProduct.js";
// import addCustomerRouter from "./routes/addcustomer.js";
// import  reviewsrouter from "./routes/reviews.js"

// const app = express();
// const PORT = 3000;
// let tablesReady;

// const ensureTables = () => {
//   if (!tablesReady) {
//     tablesReady = createTables().catch((error) => {
//       tablesReady = undefined;
//       throw error;
//     });
//   }
//   return tablesReady;
// };

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Express is running with ES Modules!");
// });

// app.use(async (req, res, next) => {
//   try {
//     await ensureTables();
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// app.use("/api/register", registerRouter);
// app.use("/api/login", loginRouter);
// app.use("/api/addproduct", addProductRouter);
// app.use("/api/addCustomer", addCustomerRouter);
// app.use("/api/reviews", reviewsrouter);

// app.use((err, req, res, next) => {
//   console.error("Unhandled Runtime Error:", err);
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined,
//   });
// });

// const startServer = () => {
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// };

// if (!process.env.VERCEL) {
//   startServer();
// }

// export default app;
import express from "express";
import cors from "cors";

import { createTables } from "./models/Sql.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import addProductRouter from "./routes/addProduct.js";
import addCustomerRouter from "./routes/addcustomer.js";
import reviewsrouter from "./routes/reviews.js";

const app = express();
const PORT = 3000;

let tablesReady;

const ensureTables = () => {
  if (!tablesReady) {
    tablesReady = createTables().catch((error) => {
      tablesReady = undefined;
      throw error;
    });
  }

  return tablesReady;
};

// =========================
// CORS
// =========================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      // Apna deployed frontend URL yahan add karna
      // "https://your-frontend-domain.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// =========================
// Middleware
// =========================

app.use(express.json());

// =========================
// Home
// =========================

app.get("/", (req, res) => {
  res.send("Express is running with ES Modules!");
});

// =========================
// Database Tables
// =========================

app.use(async (req, res, next) => {
  try {
    await ensureTables();
    next();
  } catch (error) {
    next(error);
  }
});

// =========================
// Routes
// =========================

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/addproduct", addProductRouter);
app.use("/api/addCustomer", addCustomerRouter);
app.use("/api/reviews", reviewsrouter);

// =========================
// Error Handler
// =========================

app.use((err, req, res, next) => {
  console.error("Unhandled Runtime Error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : undefined,
  });
});

// =========================
// Local Server
// =========================

const startServer = () => {
  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}`
    );
  });
};

if (!process.env.VERCEL) {
  startServer();
}

export default app;