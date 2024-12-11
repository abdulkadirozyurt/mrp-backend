import express from "express";
import iocContainer from "../../IoC/Container";
import ProductsController from "../Controllers/ProductsController";

const router = express.Router();

// const productsController = new ProductsController(new ProductManager(new ProductDal()));
const productsController = iocContainer.resolve(ProductsController);

router.get("/", productsController.GetAll);
router.get("/id", productsController.GetById);
router.post("/", productsController.Create);
router.put("/", productsController.Update);
router.delete("/", productsController.Delete);

export default router;
