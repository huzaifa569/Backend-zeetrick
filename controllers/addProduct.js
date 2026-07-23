import express from "express";
import {
    productAlreadyExists,
    addProduct,
    GetallProduct,
    GetallProductBYid,
    GetallProductDelete,
    GetallProductDeleteById,
    updateproduct
}
    from
    "../models/addProduct.js";

export const addproduct = async (req, res) => {
    const { productName, image, optionList, price, stock } = req.body;
    if (!productName || !optionList || price == null || stock == null) {
        return res.status(400).json({
            message: "All fields are required",
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
            image,
            optionList,
            price,
            stock
        });
        return res.status(201).json({
            message: "Product added successfully",
            product: ProductAdd,
            success: true,
            createdAt: new Date()
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Product not added",
            success: false
        });
    }
};


export const Getallproduct = async (req, res) => {
    try {
        const products = await GetallProduct();
        return res.status(200).json({
            message: "Products retrieved successfully",
            products: products,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error retrieving products",
            success: false
        });
    }
}


export const GetallproductById = async (req, res) => {
    try {
        const products = await GetallProductBYid(req.params.id);
        return res.status(200).json({
            message: "Products retrieved successfully",
            products: products,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error retrieving products",
            success: false
        });
    }
}

export const DeletedGetallproduct = async (req, res) => {
    try {
        const products = await GetallProductDelete();
        return res.status(200).json({
            message: "Products Deletd successfully",
            products: products,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error retrieving products",
            success: false
        });
    }
}


export const DeleteProductById = async (req, res) => {
    try {
        const products = await GetallProductDeleteById(req.params.id);
        return res.status(200).json({
            message: "Product deleted successfully",
            products: products,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error retrieving products",
            success: false
        });
    }
}

export const UpdateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, image, optionList, price, stock } = req.body;

    if (!productName || !optionList || price == null || stock == null) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }

    try {
        const result = await updateproduct(id, {
            productName,
            image,
            optionList,
            price,
            stock
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
        console.error(error);

        return res.status(500).json({
            message: "Product not updated",
            success: false
        });
    }
};