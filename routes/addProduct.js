import express from "express";
import { 
    addproduct, 
    Getallproduct, 
    GetallproductById, 
    DeletedGetallproduct,
    DeleteProductById ,
    UpdateProduct
} 
from "../controllers/addProduct.js";

const route = express.Router();

route.post("/", addproduct);

route.put("/:id",UpdateProduct)

route.get("/",Getallproduct)

route.get("/:id",GetallproductById)

route.delete("/",DeletedGetallproduct)

route.delete("/:id",DeleteProductById)


export default route;