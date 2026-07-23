import express from "express";
import { addcustomer, Getallcustomer, GetAllSpecificCustomerById, GetDeleteByAll , GetDeleteById,GetUpdateById} from "../controllers/addcustomer.js";

const router = express.Router();

router.post("/", addcustomer);
router.get("/", Getallcustomer);
router.get("/:id", GetAllSpecificCustomerById);
router.delete("/", GetDeleteByAll);
router.delete("/:id", GetDeleteById);
router.put("/:id", GetUpdateById);





export default router;