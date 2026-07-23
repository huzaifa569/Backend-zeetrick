import express from "express";
import {login} from "../controllers/login.js";

const route = express.Router();

route.post("/",login );

export default route;