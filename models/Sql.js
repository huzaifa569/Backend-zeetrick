import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const requiredDbEnv = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
];
let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 10000,
    });
  }

  return pool;
}

export function isDatabaseConfigured() {
  const missing = requiredDbEnv.filter(
    (key) => !process.env[key] || process.env[key].trim() === ""
  );

  if (missing.length > 0) {
    console.warn(
      "Missing Environment Variables:",
      missing.join(", ")
    );

    return false;
  }

  return true;
}

export async function createTables() {
  if (!isDatabaseConfigured()) {
    console.warn(
      "Database connection is not configured. Skipping createTables."
    );
    return;
  }

  try {
    const databasePool = getPool();
    const databaseName = `\`${process.env.DB_NAME.replace(/`/g, "``")}\``;

    console.log("Initializing MySQL connection pool");

    await databasePool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

    console.log(`✅ Database "${process.env.DB_NAME}" ready`);

    // =========================
    // USERS TABLE
    // =========================
    await databasePool.query(`
      CREATE TABLE IF NOT EXISTS ${databaseName}.users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(32) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ users table ready");

    // =========================
    // PRODUCTS TABLE
    // =========================
    await databasePool.query(`
      CREATE TABLE IF NOT EXISTS ${databaseName}.products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productName VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255),
        optionList TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ products table ready");

    // =========================
    // CUSTOMER TABLE
    // =========================
    await databasePool.query(`
      CREATE TABLE IF NOT EXISTS ${databaseName}.customer (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(191) UNIQUE NOT NULL,
        location VARCHAR(255) NOT NULL,
        orders TEXT NOT NULL,
        optionList ENUM('regular', 'new', 'vip') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ customer table ready");

    // =========================
    // REVIEWS TABLE
    // =========================
    await databasePool.query(`
      CREATE TABLE IF NOT EXISTS ${databaseName}.reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        CustomerName VARCHAR(255) NOT NULL,
        Rating INT NOT NULL,
        ProductName VARCHAR(255) NOT NULL,
        Comment TEXT NOT NULL,
        Date DATETIME NOT NULL,
        Status ENUM('pending', 'approved', 'flagged') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ reviews table ready");

    // =========================
    // ACCOUNT PROFILE TABLE
    // =========================
    await databasePool.query(`
      CREATE TABLE IF NOT EXISTS ${databaseName}.account_profile (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_image VARCHAR(255),
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        professional_bio TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ account_profile table ready");

    console.log("=================================");
    console.log("✅ Database and tables created successfully.");
    console.log("=================================");

  } catch (error) {
    console.error("❌ Database Error:", error.message);
    throw error;
  }
}