import {
    productAlreadyExists,
    addProduct,
    GetallProduct,
    GetallProductBYid,
    GetallProductDelete,
    GetallProductDeleteById,
    updateproduct
} from "../models/addProduct.js";

import { uploadToCloudinary } from "../utils/cloudinary.js";

// ADD PRODUCT
export const addproduct = async (req, res) => {
    try {
        const {
            productName,
            category,
            price,
            stock,
            status,
            Status,
            optionList
        } = req.body ?? {};

        if (!productName) {
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            });
        }

        const exists = await productAlreadyExists(productName);

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Product already exists"
            });
        }

        let cloudinaryImage = null;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(
                req.file.buffer,
                "products"
            );

            cloudinaryImage = uploadResult.secure_url;
        }

        const ProductAdd = await addProduct({
            productName,
            optionList: optionList ?? null,
            category: category ?? null,
            image: cloudinaryImage,
            price: price ? Number(price) : null,
            stock: stock ? Number(stock) : null,
            Status: Status ?? status ?? null
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: ProductAdd
        });

    } catch (error) {
        console.error("Error adding product:", error);

        return res.status(500).json({
            success: false,
            message: "Product not added",
            error: error.message
        });
    }
};

// GET ALL PRODUCTS
export const Getallproduct = async (req, res) => {
    try {
        const products = await GetallProduct();

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET PRODUCT BY ID
export const GetallproductById = async (req, res) => {
    try {
        const product = await GetallProductBYid(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE ALL PRODUCTS
export const DeletedGetallproduct = async (req, res) => {
    try {
        const result = await GetallProductDelete();

        return res.status(200).json({
            success: true,
            message: "All products deleted successfully",
            affectedRows: result.affectedRows
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE PRODUCT BY ID
export const DeleteProductById = async (req, res) => {
    try {
        const result = await GetallProductDeleteById(req.params.id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE PRODUCT
export const UpdateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            productName,
            category,
            price,
            stock,
            status,
            Status,
            optionList
        } = req.body ?? {};

        let cloudinaryImage = undefined;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(
                req.file.buffer,
                "products"
            );

            cloudinaryImage = uploadResult.secure_url;
        }

        const result = await updateproduct(id, {
            productName: productName ?? null,
            optionList: optionList ?? null,
            category: category ?? null,
            image: cloudinaryImage,
            price: price !== undefined ? Number(price) : null,
            stock: stock !== undefined ? Number(stock) : null,
            Status: Status ?? status ?? null
        });

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
        });

    } catch (error) {
        console.error("Error updating product:", error);

        return res.status(500).json({
            success: false,
            message: "Product not updated",
            error: error.message
        });
    }
};
