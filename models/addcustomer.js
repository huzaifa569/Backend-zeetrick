
import pool from './db.js';

// Validation Schema
export const addCustomerSchema = {
  image: { type: "string", required: false },
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  location: { type: "string", required: true },
  orders: { type: "string", required: true },
  TotalSpent: { type: "string", required: true },
  Tier: { type: "string", enum: ["vip", "new", "regular"], required: true }
};

// Add Customer
export const addCustomer = async (customerData) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `INSERT INTO customer
      (image, name, email, location, orders, TotalSpent, Tier)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        customerData.image || null,
        customerData.name,
        customerData.email,
        customerData.location,
        customerData.orders,
        customerData.TotalSpent,
        customerData.Tier
      ]
    );

    return {
      id: result.insertId,
      ...customerData
    };
  } finally {
    connection.release();
  }
};

// Check Customer Already Exists
export const CustomerAlreadyExists = async (customerData) => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT id FROM customer WHERE email = ?",
      [customerData.email]
    );

    return rows.length > 0;
  } finally {
    connection.release();
  }
};

// Get All Customers
export const GetallCustomer = async () => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `SELECT
        id,
        image,
        name,
        email,
        location,
        orders,
        TotalSpent,
        Tier,
        created_at
      FROM customer`
    );

    return result;
  } catch (err) {
    console.error("Error fetching customers:", err);
    throw err;
  } finally {
    connection.release();
  }
};

// Get Specific Customer By ID
export const GetSpecificCustomerById = async (id) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `SELECT
        id,
        image,
        name,
        email,
        location,
        orders,
        TotalSpent,
        Tier,
        created_at
      FROM customer
      WHERE id = ?`,
      [id]
    );

    return result[0] || null;
  } catch (err) {
    console.error("Error fetching customer by ID:", err);
    throw err;
  } finally {
    connection.release();
  }
};

// Delete All Customers
export const DeleteByAll = async () => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      "DELETE FROM customer"
    );

    await connection.execute(
      "ALTER TABLE customer AUTO_INCREMENT = 1"
    );

    return result;
  } catch (err) {
    console.error("Error deleting all customers:", err);
    throw err;
  } finally {
    connection.release();
  }
};

// Delete Customer By ID
export const DeleteById = async (id) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      "DELETE FROM customer WHERE id = ?",
      [id]
    );

    return result;
  } catch (err) {
    throw err;
  } finally {
    connection.release();
  }
};

// Update Customer By ID
export const UpdateById = async (customerData, id) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `UPDATE customer
       SET
         image = ?,
         name = ?,
         email = ?,
         location = ?,
         orders = ?,
         TotalSpent = ?,
         Tier = ?
       WHERE id = ?`,
      [
        customerData.image || null,
        customerData.name,
        customerData.email,
        customerData.location,
        customerData.orders,
        customerData.TotalSpent,
        customerData.Tier,
        id
      ]
    );

    return result;
  } catch (err) {
    throw err;
  } finally {
    connection.release();
  }
};
