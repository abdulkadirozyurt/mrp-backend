const TYPES = {
  // Business Layer
  IProductService: Symbol.for("IProductService"),
  IMaterialService: Symbol.for("IMaterialService"),
  IUserService: Symbol.for("IUserService"),
  IAuthService: Symbol.for("IAuthService"),

  // Data Access Layer
  IProductDal: Symbol.for("IProductDal"),
  IMaterialDal: Symbol.for("IMaterialDal"),
  IUserDal: Symbol.for("IUserDal"),

  // Controllers
  ProductsController: Symbol.for("ProductsController"),
  MaterialsController: Symbol.for("MaterialsController"),
  UsersController: Symbol.for("UsersController"),
  AuthController: Symbol.for("AuthController"),
};

export default TYPES;
