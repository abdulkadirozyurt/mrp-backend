import express from "express";
import iocContainer from "../../IoC/Container";
import ProductsController from "../Controllers/ProductsController";

const router = express.Router();

// const productsController = new ProductsController(new ProductManager(new ProductDal()));
const productsController = iocContainer.resolve(ProductsController);

router.get("/", productsController.GetAll);

router.get("/id", productsController.GetById);

router.post("/", (req, res) => {
  productsController.Create(req, res);
});

router.put("/", (req, res) => {
  productsController.Update(req, res);
});

router.delete("/", (req, res) => {
  productsController.Delete(req, res);
});

export default router;
