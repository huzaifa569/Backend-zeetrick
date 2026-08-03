import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const requiredDbEnv = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
];

export function isDatabaseConfigured() {
  const missing = requiredDbEnv.filter(
    (key) => !process.env[key] || process.env[key].trim() === ""
  );

  if (missing.length) {
    console.warn("Missing Environment Variables:", missing.join(", "));
    return false;
  }

  return true;
}

export async function createTables() {
  if (!isDatabaseConfigured()) {
    console.warn("Database connection is not configured. Skipping createTables.");
    return;
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectTimeout: 10000,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );

    await connection.query(`USE \`${process.env.DB_NAME}\``);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
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

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productName VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255),
        optionList TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS customer (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        location VARCHAR(255) NOT NULL,
        orders JSON NOT NULL,
        optionList ENUM('regular','new','vip') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        CustomerName VARCHAR(255) NOT NULL,
        Rating INT NOT NULL,
        ProductName VARCHAR(255) NOT NULL,
        Comment TEXT NOT NULL,
        Date DATETIME NOT NULL,
        Status ENUM('pending','approved','flagged') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS account_profile (
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

    console.log("✅ Database and tables created successfully.");
  } catch (err) {
    console.error("❌ Database Error:", err.message);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}