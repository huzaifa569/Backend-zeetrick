import express from "express"
import {
    PostAddReviews,
    GetAllReviwsFunc,
    GetReviewsByIdFunc,
    GetDeleteAll,
    GetDeleteAllById,
    GetUpdateReviewsById
} from 
"../controllers/reviews.js"

const route = express.Router()

route.post("/",PostAddReviews)
route.get("/",GetAllReviwsFunc)
route.get("/:id", GetReviewsByIdFunc);
route.delete("/",GetDeleteAll)
route.delete("/:id", GetDeleteAllById);
route.put("/:id", GetUpdateReviewsById);





export default route