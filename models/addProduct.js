import pool from './db.js';


export const addproductschema = {
    productName: { type: 'string', required: true },
    image: { type: 'string' },
    price: { type: 'number', required: true, min: 0 },
    stock: { type: 'number', required: true, min: 0 },
    Status: { type: 'string' },
    created_at: { type: 'string' }
};

export const productAlreadyExists = async (productName) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT id FROM products WHERE productName = ?',
            [productName ?? null]
        );
        return rows.length > 0;
    } finally {
        if (connection) connection.release();
    }
};

export const addProduct = async (productData = {}) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = productData ?? {};
        const [result] = await connection.execute(
            `INSERT INTO products 
            (productName, image,  price, stock, Status) 
            VALUES ( ?, ?, ?, ?, ?)`,
            [
                data.productName ?? null,
                data.image || null,
                data.price ?? null,
                data.stock ?? null,
                data.Status || null
            ]
        );

        return {
            id: result.insertId,
            ...data,
        };
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const GetallProduct = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(`SELECT * FROM products`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const GetallProductBYid = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(
            `SELECT * FROM products WHERE id = ?`,
            [id ?? null]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const GetallProductDelete = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(`DELETE FROM products`);
        await connection.execute(`ALTER TABLE products AUTO_INCREMENT = 1`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const GetallProductDeleteById = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(
            `DELETE FROM products WHERE id = ?`,
            [id ?? null]
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const updateproduct = async (id, productData = {}) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = productData ?? {};
        const [result] = await connection.execute(
            `UPDATE products 
             SET productName = ?, image = ?,  price = ?, stock = ?, Status = ? 
             WHERE id = ?`,
            [
                data.productName ?? null,
                data.image || null,
                data.price ?? null,
                data.stock ?? null,
                data.Status || null,
                id ?? null
            ]
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};