import mysql from 'mysql2/promise';

export async function createTables() {
  const host = 'localhost';
  const user = 'root';
  const password = 'sayyousayme@123';
  const database = 'zeetrick';

  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  await connection.query(`USE \`${database}\``);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      age INT NOT NULL,
      gender VARCHAR(32) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      productName VARCHAR(255) NOT NULL UNIQUE,
      image VARCHAR(255) DEFAULT NULL,
      optionList TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      stock INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS customer (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  location VARCHAR(255) NOT NULL,
  orders JSON NOT NULL,
  optionList ENUM('regular', 'new', 'vip') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `);


  await connection.query(`
    CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CustomerName VARCHAR(255) NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    ProductName VARCHAR(255) NOT NULL,
    Comment TEXT NOT NULL,
    Date DATETIME NOT NULL,
    Status ENUM('pending', 'approved', 'flagged') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  await connection.query(`
        CREATE TABLE IF NOT EXISTS account_profile (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_image VARCHAR(255) DEFAULT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        professional_bio TEXT DEFAULT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
`);
  await connection.end();
  console.log('Database and tables ensured');
}
