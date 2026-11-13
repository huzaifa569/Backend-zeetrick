import express from "express";

import {
    addproduct,
    Getallproduct,
    GetallproductById,
    DeletedGetallproduct,
    DeleteProductById,
    UpdateProduct
} from "../controllers/addProduct.js";

import upload from "../middleware/upload.js";

const route = express.Router();

route.post("/", upload.single("image"), addproduct);

route.put("/:id", upload.single("image"), UpdateProduct);

route.get("/", Getallproduct);

route.get("/:id", GetallproductById);

route.delete("/", DeletedGetallproduct);

route.delete("/:id", DeleteProductById);

export default route;
