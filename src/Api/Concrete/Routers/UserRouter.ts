import express from "express";
import iocContainer from "../../IoC/Container";
import ProductsController from "../Controllers/ProductsController";
import UsersController from "../Controllers/UsersController";

const router = express.Router();

// const productsController = new ProductsController(new ProductManager(new ProductDal()));
const usersController = iocContainer.resolve(UsersController);

router.get("/", usersController.GetAll);
router.get("/id", usersController.GetById);
router.post("/",usersController.Create);
router.put("/",usersController.Update);
router.delete("/",usersController.Delete);

export default router;
