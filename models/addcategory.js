
import pool from "./db.js";

export const categorySchema = {
    category: { type: "string", required: true }
};

export const createCategoryModel = async (data = {}) => {
    let connection;

    try {
        connection = await pool.getConnection();

        const [exists] = await connection.execute(
            "SELECT id FROM categories WHERE Categories = ?",
            [data.category]
        );

        if (exists.length > 0) {
            return { exists: true };
        }

        const [result] = await connection.execute(
            "INSERT INTO categories (Categories) VALUES (?)",
            [data.category]
        );

        return {
            exists: false,
            id: result.insertId,
            ...data
        };
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const UpdateCategoryModel = async (id, data = {}) => {
    let connection;

    try {
        connection = await pool.getConnection();

        const [result] = await connection.execute(
            "UPDATE categories SET Categories = ? WHERE id = ?",
            [data.category, id]
        );

        return result;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const GetallCategoryModel = async () => {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.execute(
            "SELECT * FROM categories"
        );

        return rows;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const GetByIdCategoryModel = async (id) => {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.execute(
            "SELECT * FROM categories WHERE id = ?",
            [id]
        );

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const DeleteallCategoryModel = async () => {
    let connection;

    try {
        connection = await pool.getConnection();

        const [result] = await connection.execute(
            "DELETE FROM categories"
        );

        await connection.execute(
            "ALTER TABLE categories AUTO_INCREMENT = 1"
        );

        return result;
    } catch (error) {
        console.error("Error deleting all categories:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

export const DeleteaByIdCategoryModel = async (id) => {
    let connection;

    try {
        connection = await pool.getConnection();

        const [result] = await connection.execute(
            "DELETE FROM categories WHERE id = ?",
            [id]
        );

        return result;
    } catch (error) {
        console.error("Error deleting category by ID:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};
