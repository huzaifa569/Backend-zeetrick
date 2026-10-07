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
    const {
        productName, 
        image, 
        optionList, 
        price, 
        stock, 
        category, 
        Category, 
        status, 
        Status 
    } = req.body ?? {};

    try {
        const exists = await productAlreadyExists(productName);

        if (exists) {
            return res.status(409).json({
                message: "Product already exists",
                success: false
            });
        }

        const ProductAdd = await addProduct({
            productName: productName ?? null,
            image: image || null,
            optionList: optionList ?? null,
            price: price ?? null,
            stock: stock ?? null,
            Category: category || Category || null,
            Status: status || Status || null
        });

        return res.status(201).json({
            message: "Product added successfully",
            product: ProductAdd,
            success: true,
            createdAt: new Date()
        });
    } catch (error) {
        console.error("Error adding product:", error);
        if (error?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Product already exists",
                success: false
            });
        }
        return res.status(500).json({
            message: "Product not added",
            error: error?.message || "An unexpected error occurred",
            success: false
        });
    }
};

// 2. GET ALL PRODUCTS
export const Getallproduct = async (req, res) => {
    try {
        const products = await GetallProduct();
        return res.status(200).json({
            message: "Products retrieved successfully",
            products: products,
            success: true
        });
    } catch (error) {
        console.error("Error retrieving products:", error);
        return res.status(500).json({
            message: "Error retrieving products",
            error: error?.message || "An unexpected error occurred",
            success: false
        });
    }
};

// 3. GET PRODUCT BY ID
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
            product: product,
            success: true
        });
    } catch (error) {
        console.error("Error retrieving product by ID:", error);
        return res.status(500).json({
            message: "Error retrieving product",
            error: error?.message || "An unexpected error occurred",
            success: false
        });
    }
};

// 4. DELETE ALL PRODUCTS
export const DeletedGetallproduct = async (req, res) => {
    try {
        const result = await GetallProductDelete();
        return res.status(200).json({
            message: "All products deleted successfully",
            affectedRows: result.affectedRows,
            success: true
        });
    } catch (error) {
        console.error("Error deleting products:", error);
        return res.status(500).json({
            message: "Error deleting products",
            error: error?.message || "An unexpected error occurred",
            success: false
        });
    }
};

// 5. DELETE PRODUCT BY ID
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
            error: error?.message || "An unexpected error occurred",
            success: false
        });
    }
};

export const UpdateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        productName, 
        image, 
        optionList, 
        price, 
        stock, 
        category, 
        Category, 
        status, 
        Status 
    } = req.body ?? {};

    try {
        const result = await updateproduct(id, {
            productName: productName ?? null,
            image: image || null,
            optionList: optionList ?? null,
            price: price ?? null,
            stock: stock ?? null,
            Category: category || Category || null,
            Status: status || Status || null
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
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
            error: error?.message || "An unexpected error occurred",
            success: false
        });
    }
};