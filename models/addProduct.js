import pool from './db.js';

export const addproductschema = {
    productName: { type: 'string', required: true },
    image: { type: 'string' },
    optionList: { type: 'string', required: true },
    price: { type: 'number', required: true, min: 0 },
    stock: { type: 'number', required: true, min: 0 },
    Category: { type: 'string', required: true },
    Status: { type: 'string', required: true },
    Created_at: { type: 'string' }
};

export const productAlreadyExists = async (productName) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT id FROM products WHERE productName = ?',
            [productName]
        );
        return rows.length > 0;
    } finally {
        connection.release();
    }
};

export const addProduct = async (productData) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            `INSERT INTO products 
            (productName, image, optionList, price, stock, Category, Status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                productData.productName,
                productData.image,
                productData.optionList,
                productData.price,
                productData.stock,
                productData.Category,
                productData.Status
            ]
        );

        return {
            id: result.insertId,
            ...productData
        };
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        connection.release();
    }
};

export const GetallProduct = async () => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(`SELECT * FROM products`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        connection.release();
    }
};

export const GetallProductBYid = async (id) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            `SELECT * FROM products WHERE id = ?`,
            [id]
        );
        // Returns single product object if found, otherwise null
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        connection.release();
    }
};

export const GetallProductDelete = async () => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(`DELETE FROM products`);
        await connection.execute(`ALTER TABLE products AUTO_INCREMENT = 1`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        connection.release();
    }
};

export const GetallProductDeleteById = async (id) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            `DELETE FROM products WHERE id = ?`,
            [id]
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        connection.release();
    }
};

export const updateproduct = async (id, productData) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            `UPDATE products 
             SET productName = ?, image = ?, optionList = ?, price = ?, stock = ?, Category = ?, Status = ? 
             WHERE id = ?`,
            [
                productData.productName,
                productData.image,
                productData.optionList,
                productData.price,
                productData.stock,
                productData.Category,
                productData.Status,
                id
            ]
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        connection.release();
    }
};