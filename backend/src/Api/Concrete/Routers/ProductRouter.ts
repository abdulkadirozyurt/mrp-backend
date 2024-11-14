import express from "express";
import ProductsController from "../Controllers/ProductsController";
import ProductManager from "../../../Business/Concrete/ProductManager";
import ProductDal from "../../../DataAccess/Concrete/Mongoose/ProductDal";

const router = express.Router();

const productsController = new ProductsController(new ProductManager(new ProductDal()));

router.get("/", productsController.GetAll);
router.post("/");
router.put("/");
router.delete("/");

export default router;
