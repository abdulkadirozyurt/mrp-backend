import express from "express";
import ProductsController from "../Controllers/ProductsController";

const router = express.Router();

const productsController = new ProductsController();

router.get("/", productsController.GetAll);
router.post("/");
router.put("/");
router.delete("/");

export default router;
