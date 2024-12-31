import express from "express";
import iocContainer from "../../IoC/Container";
import OrdersController from "../Controllers/OrdersController";

const router = express.Router();

const ordersController = iocContainer.resolve(OrdersController);

router.get("/", (req, res) => {  ordersController.GetAll(req, res);});
router.post("/", (req, res) => {  ordersController.Create(req, res);});
router.post("/id", (req, res) => {  ordersController.GetById(req, res);});
router.put("/", (req, res) => {  ordersController.Update(req, res);});
router.post("/", (req, res) => {  ordersController.Delete(req, res);});

export default router;
