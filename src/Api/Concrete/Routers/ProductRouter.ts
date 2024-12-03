import express from "express";
import ProductsController from "../Controllers/ProductsController";
import ProductManager from "../../../Business/Concrete/ProductManager";
import ProductDal from "../../../DataAccess/Concrete/Mongoose/ProductDal";
import iocContainer from "../../IoC/Container";

const router = express.Router();

// const productsController = new ProductsController(new ProductManager(new ProductDal()));
const productsController = iocContainer.resolve(ProductsController);

router.get("/", productsController.GetAll);
router.post("/",productsController.Create);
router.put("/",productsController.Update);
router.delete("/",productsController.Delete);

export default router;
