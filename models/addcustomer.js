import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sayyousayme@123",
  database: "zeetrick",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Validation Schema
export const addCustomerSchema = {
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  location: {
    type: "string",
    required: true,
  },
  orders: {
    type: "array",
    required: true,
    items: {
      type: "string",
    },
  },
  optionList: {
    type: "string",
    required: true,
    enum: ["regular", "new", "vip"],
  },
};

export const addCustomer = async (customerData) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `INSERT INTO customer
      (name, email, location, orders, optionList)
      VALUES (?, ?, ?, ?, ?)`,
      [
        customerData.name,
        customerData.email,
        customerData.location,
        JSON.stringify(customerData.orders),
        customerData.optionList,
      ]
    );

    return {
      id: result.insertId,
      ...customerData,
    };
  } finally {
    connection.release();
  }
};

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
export const GetallCustomer = async () => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `SELECT * FROM customer`
    );

    return result;
  } catch (err) {
    console.error("Error fetching customers:", err);
    throw err;
  } finally {
    connection.release();
  }
};

export const GetSpecificCustomerById  = async (id) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `SELECT * FROM customer WHERE id = ?`,
      [id]
    );

    return result;
  } catch (err) {
    console.error("Error fetching customer by ID:", err);
    throw err;
  } finally {
    connection.release();
  }
};


export const DeleteByAll = async () => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `DELETE FROM customer`
    );

    await connection.execute(
      `ALTER TABLE customer AUTO_INCREMENT = 1`
    );

    return result;
  } catch (err) {
    console.error("Error deleting all customers:", err);
    throw err;
  } finally {
    connection.release();
  }
};

export const DeleteById = async (id) => {
  const connection = await pool.getConnection();
  try{
    const [result] = await connection.execute(
      `DELETE FROM customer WHERE id = ?`,
      [id]
    );
    
      return result
  }catch(err){
throw err
  }finally{
    connection.release();
  }
}

export const UpdateById = async (customerData,id) => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      `UPDATE customer
       SET
         name = ?,
         email = ?,
         location = ?,
         orders = ?,
         optionList = ?
       WHERE id = ?`,
      [
        customerData.name,
        customerData.email,
        customerData.location,
        JSON.stringify(customerData.orders),
        customerData.optionList,
        customerData.id,
      ]
    );

    return result;
  } catch (err) {
    throw err;
  } finally {
    connection.release();
  }
};