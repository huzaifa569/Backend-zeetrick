import {
    productAlreadyExists,
    addProduct,
    GetallProduct,
    GetallProductBYid,
    GetallProductDelete,
    GetallProductDeleteById,
    updateproduct
} from "../models/addProduct.js";

export const addproduct = async (req, res) => {
    const { productName, image, optionList, price, stock, category, status } = req.body;

    if (!productName || !optionList || price == null || stock == null || !category || !status) {
        return res.status(400).json({
            message: "All required fields (productName, optionList, price, stock, category, status) must be provided",
            success: false
        });
    }

    try {
        const exists = await productAlreadyExists(productName);

        if (exists) {
            return res.status(409).json({
                message: "Product already exists",
                success: false
            });
        }

        const ProductAdd = await addProduct({
            productName,
            image: image || null,
            optionList: typeof optionList === "object" ? JSON.stringify(optionList) : optionList,
            price: Number(price),
            stock: Number(stock),
            Category: category,
            Status: status
        });

        return res.status(201).json({
            message: "Product added successfully",
            product: ProductAdd,
            success: true,
            createdAt: new Date()
        });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({
            message: "Failed to add product",
            success: false
        });
    }
};

export const Getallproduct = async (req, res) => {
    try {
        const products = await GetallProduct();
        return res.status(200).json({
            message: "Products retrieved successfully",
            products,
            success: true
        });
    } catch (error) {
        console.error("Error retrieving products:", error);
        return res.status(500).json({
            message: "Error retrieving products",
            success: false
        });
    }
};

export const GetallproductById = async (req, res) => {
    try {
        const product = await GetallProductBYid(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product retrieved successfully",
            product,
            success: true
        });
    } catch (error) {
        console.error("Error retrieving product by ID:", error);
        return res.status(500).json({
            message: "Error retrieving product",
            success: false
        });
    }
};

export const DeletedGetallproduct = async (req, res) => {
    try {
        const result = await GetallProductDelete();
        return res.status(200).json({
            message: "All products deleted and AUTO_INCREMENT reset successfully",
            affectedRows: result.affectedRows,
            success: true
        });
    } catch (error) {
        console.error("Error deleting all products:", error);
        return res.status(500).json({
            message: "Error deleting all products",
            success: false
        });
    }
};

export const DeleteProductById = async (req, res) => {
    try {
        const result = await GetallProductDeleteById(req.params.id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found or already deleted",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({
            message: "Error deleting product",
            success: false
        });
    }
};

export const UpdateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, image, optionList, price, stock, category, status } = req.body;

    if (!productName || !optionList || price == null || stock == null || !category || !status) {
        return res.status(400).json({
            message: "All required fields must be provided",
            success: false
        });
    }

    try {
        const result = await updateproduct(id, {
            productName,
            image: image || null,
            optionList: typeof optionList === "object" ? JSON.stringify(optionList) : optionList,
            price: Number(price),
            stock: Number(stock),
            Category: category,
            Status: status
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            success: true
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({
            message: "Product not updated",
            success: false
        });
    }
};