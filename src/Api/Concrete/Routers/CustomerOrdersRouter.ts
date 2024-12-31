import express from "express";
import iocContainer from "../../IoC/Container";
import CustomerOrdersController from "../Controllers/CustomerOrdersController";
const router = express.Router();

const customerOrdersController = iocContainer.resolve(CustomerOrdersController);

router.get("/", (req, res) => {customerOrdersController.GetAll(req, res)});
router.post("/", (req, res) => {customerOrdersController.Create(req, res)});
router.post("/id", (req, res) => {customerOrdersController.GetById(req, res)});
router.put("/", (req, res) => {customerOrdersController.Update(req, res)});
router.delete("/", (req, res) => {customerOrdersController.Delete(req, res)});

export default router;
