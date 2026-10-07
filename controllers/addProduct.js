import {
    productAlreadyExists,
    addProduct,
    GetallProduct,
    GetallProductBYid,
    GetallProductDelete,
    GetallProductDeleteById,
    updateproduct
} from "../models/addProduct.js";

// ADD PRODUCT
export const addproduct = async (req, res) => {
    // 1. Express casing and fallback handling
    const productName = req.body.productName;
    const image = req.body.image || null;
    const optionList = req.body.optionList;
    const price = req.body.price;
    const stock = req.body.stock;
    
    // Support both 'category' / 'Category' & 'status' / 'Status'
    const category = req.body.category || req.body.Category;
    const status = req.body.status || req.body.Status;

    // 2. Exact field validation check
    if (!productName || !optionList || price == null || stock == null || !category || !status) {
        return res.status(400).json({
            message: "All required fields (productName, optionList, price, stock, category, status) must be provided",
            success: false,
            receivedData: req.body // Troubleshooting ke liye response mein received values
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
            image,
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

// GET ALL PRODUCTS
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

// GET PRODUCT BY ID
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

// DELETE ALL PRODUCTS
export const DeletedGetallproduct = async (req, res) => {
    try {
        const result = await GetallProductDelete();
        return res.status(200).json({
            message: "All products deleted successfully",
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

// DELETE PRODUCT BY ID
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

// UPDATE PRODUCT BY ID
export const UpdateProduct = async (req, res) => {
    const { id } = req.params;

    const productName = req.body.productName;
    const image = req.body.image || null;
    const optionList = req.body.optionList;
    const price = req.body.price;
    const stock = req.body.stock;
    
    // Support both lowercase and capital keys
    const category = req.body.category || req.body.Category;
    const status = req.body.status || req.body.Status;

    if (!productName || !optionList || price == null || stock == null || !category || !status) {
        return res.status(400).json({
            message: "All required fields (productName, optionList, price, stock, category, status) must be provided",
            success: false,
            receivedData: req.body
        });
    }

    try {
        const result = await updateproduct(id, {
            productName,
            image,
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