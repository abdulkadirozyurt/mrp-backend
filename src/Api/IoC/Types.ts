const TYPES = {
  // Business Layer
  IProductService: Symbol.for("IProductService"),
  IMaterialService: Symbol.for("IMaterialService"),
  IUserService: Symbol.for("IUserService"),
  IAuthService: Symbol.for("IAuthService"),
  ISupplierService: Symbol.for("ISupplierService"),

  // Data Access Layer
  IProductDal: Symbol.for("IProductDal"),
  IMaterialDal: Symbol.for("IMaterialDal"),
  IUserDal: Symbol.for("IUserDal"),
  ISupplierDal: Symbol.for("ISupplierDal"),

  // Controllers
  ProductsController: Symbol.for("ProductsController"),
  MaterialsController: Symbol.for("MaterialsController"),
  UsersController: Symbol.for("UsersController"),
  AuthController: Symbol.for("AuthController"),
  SuppliersController: Symbol.for("SuppliersController"),
};

export default TYPES;
