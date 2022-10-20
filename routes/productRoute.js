import express from "express";
const router = express.Router();

import {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/product/new", isAuthenticated, createProduct);
router.get("/myproducts", isAuthenticated, getMyProducts);
router.put("/product/:id/update", isAuthenticated, updateProduct);
router.delete("/product/:id/delete", isAuthenticated, deleteProduct);
router.get("/products", getAllProducts);

export default router;
