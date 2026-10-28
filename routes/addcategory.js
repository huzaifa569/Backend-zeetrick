import express from "express";
import { addcategory,Getallcategories ,GetByIdcategory,DeleteallCategory,DeleteByIdCategory,Updatecategory} from "../controllers/addcategory.js";
const router = express.Router();

router.post("/",addcategory)
router.put("/:id",Updatecategory)
router.get("/",Getallcategories)
router.get("/:id",GetByIdcategory)
router.delete("/",DeleteallCategory)
router.delete("/:id",DeleteByIdCategory)







export default router;