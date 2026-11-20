import express from "express";
import {
  addcustomer,
  Getallcustomer,
  GetAllSpecificCustomerById,
  GetDeleteByAll,
  GetDeleteById,
  GetUpdateById,
} from "../controllers/addcustomer.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), addcustomer);
router.get("/", Getallcustomer);
router.get("/:id", GetAllSpecificCustomerById);
router.delete("/", GetDeleteByAll);
router.delete("/:id", GetDeleteById);
router.put("/:id", upload.single("image"), GetUpdateById);

export default router;