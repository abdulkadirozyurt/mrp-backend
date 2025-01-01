import express from "express";
import iocContainer from "../../IoC/Container";
import CustomersController from "../Controllers/CustomersController";

const router = express.Router();
const customersController = iocContainer.resolve(CustomersController);

// Get all customers
router.get("/", (req, res) => {
  customersController.GetAll(req, res);
});

// Get customer by ID
router.post("/id", (req, res) => {
  customersController.GetById(req, res);
});

// Create a new customer
router.post("/", (req, res) => {
  customersController.Create(req, res);
});

// Update an existing customer
router.put("/", (req, res) => {
  customersController.Update(req, res);
});

// Delete a customer
router.delete("/", (req, res) => {
  customersController.Delete(req, res);
});

export default router;
