const ContainerTypes = {
  // Business Layer
  IProductService: Symbol.for("IProductService"),
  IMaterialService: Symbol.for("IMaterialService"),
  IUserService: Symbol.for("IUserService"),
  IAuthService: Symbol.for("IAuthService"),
  ISupplierService: Symbol.for("ISupplierService"),
  IInventoryMovementService: Symbol.for("IInventoryMovementService"),
  ICustomerOrderService: Symbol.for("ICustomerOrderService"),
  ISupplierOrderService: Symbol.for("ISupplierOrderService"),
  ICustomerService: Symbol.for("ICustomerService"),


  // Data Access Layer
  IProductDal: Symbol.for("IProductDal"),
  IMaterialDal: Symbol.for("IMaterialDal"),
  IUserDal: Symbol.for("IUserDal"),
  ISupplierDal: Symbol.for("ISupplierDal"),
  IInventoryMovementDal: Symbol.for("IInventoryMovementDal"),
  ICustomerOrderDal: Symbol.for("ICustomerOrderDal"),
  ISupplierOrderDal: Symbol.for("ISupplierOrderDal"),
  ICustomerDal: Symbol.for("ICustomerDal"),


  // Controllers
  ProductsController: Symbol.for("ProductsController"),
  MaterialsController: Symbol.for("MaterialsController"),
  UsersController: Symbol.for("UsersController"),
  AuthController: Symbol.for("AuthController"),
  SuppliersController: Symbol.for("SuppliersController"),
  InventoryMovementsController: Symbol.for("InventoryMovementsController"),
  CustomerOrdersController: Symbol.for("CustomerOrdersController"),
  SupplierOrdersController: Symbol.for("SupplierOrdersController"),
  CustomersController: Symbol.for("CustomersController"),
};

export default ContainerTypes;
