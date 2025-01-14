const ContainerTypes = {
  // Business Layer
  IUserService: Symbol.for("IUserService"),
  IAuthService: Symbol.for("IAuthService"),
  IProductService: Symbol.for("IProductService"),
  IMaterialService: Symbol.for("IMaterialService"),
  ISupplierService: Symbol.for("ISupplierService"),
  ICustomerService: Symbol.for("ICustomerService"),
  ICustomerOrderService: Symbol.for("ICustomerOrderService"),
  ISupplierOrderService: Symbol.for("ISupplierOrderService"),
  IInventoryMovementService: Symbol.for("IInventoryMovementService"),
  IWarehouseService: Symbol.for("IWarehouseService"),



  // Data Access Layer
  IUserDal: Symbol.for("IUserDal"),
  IProductDal: Symbol.for("IProductDal"),
  IMaterialDal: Symbol.for("IMaterialDal"),
  ISupplierDal: Symbol.for("ISupplierDal"),
  ICustomerDal: Symbol.for("ICustomerDal"),
  ICustomerOrderDal: Symbol.for("ICustomerOrderDal"),
  ISupplierOrderDal: Symbol.for("ISupplierOrderDal"),
  IInventoryMovementDal: Symbol.for("IInventoryMovementDal"),
  IWarehouseDal: Symbol.for("IWarehouseDal"),


  // Controllers
  AuthController: Symbol.for("AuthController"),
  UsersController: Symbol.for("UsersController"),
  ProductsController: Symbol.for("ProductsController"),
  MaterialsController: Symbol.for("MaterialsController"),
  SuppliersController: Symbol.for("SuppliersController"),
  CustomersController: Symbol.for("CustomersController"),
  CustomerOrdersController: Symbol.for("CustomerOrdersController"),
  SupplierOrdersController: Symbol.for("SupplierOrdersController"),
  InventoryMovementsController: Symbol.for("InventoryMovementsController"),
  MrpController: Symbol.for("MrpController"),
  WarehouseController: Symbol.for("WarehouseController"),
};

export default ContainerTypes;
