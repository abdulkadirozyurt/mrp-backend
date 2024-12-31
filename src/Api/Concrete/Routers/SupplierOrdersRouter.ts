import express from "express";
import iocContainer from "../../IoC/Container";
import SupplierOrdersController from "../Controllers/SupplierOrdersController";
const router = express.Router();

const supplierOrdersController = iocContainer.resolve(SupplierOrdersController);

router.get("/", (req, res) => {supplierOrdersController.GetAll(req, res)});
router.post("/", (req, res) => {supplierOrdersController.Create(req, res)});
router.post("/id", (req, res) => {supplierOrdersController.GetById(req, res)});
router.put("/", (req, res) => {supplierOrdersController.Update(req, res)});
router.delete("/", (req, res) => { supplierOrdersController.Delete(req, res)});

export default router;
