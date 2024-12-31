import { container as iocContainer } from "tsyringe";
import IUserDal from "../../DataAccess/Abstract/IUserDal";
import AuthManager from "../../Business/Concrete/AuthManager";
import UserManager from "../../Business/Concrete/UserManager";
import IAuthService from "../../Business/Abstract/IAuthService";
import IUserService from "../../Business/Abstract/IUserService";
import IProductDal from "../../DataAccess/Abstract/IProductDal";
import UserDal from "../../DataAccess/Concrete/Mongoose/UserDal";
import IMaterialDal from "../../DataAccess/Abstract/IMaterialDal";
import ISupplierDal from "../../DataAccess/Abstract/ISupplierDal";
import ProductManager from "../../Business/Concrete/ProductManager";
import AuthController from "../Concrete/Controllers/AuthController";
import IProductService from "../../Business/Abstract/IProductService";
import MaterialManager from "../../Business/Concrete/MaterialManager";
import SupplierManager from "../../Business/Concrete/SupplierManager";
import UsersController from "../Concrete/Controllers/UsersController";
import ProductDal from "../../DataAccess/Concrete/Mongoose/ProductDal";
import IMaterialService from "../../Business/Abstract/IMaterialService";
import ISupplierService from "../../Business/Abstract/ISupplierService";
import MaterialDal from "../../DataAccess/Concrete/Mongoose/MaterialDal";
import SupplierDal from "../../DataAccess/Concrete/Mongoose/SupplierDal";
import ProductsController from "../Concrete/Controllers/ProductsController";
import MaterialsController from "../Concrete/Controllers/MaterialsController";
import SuppliersController from "../Concrete/Controllers/SuppliersController";
import IInventoryMovementDal from "../../DataAccess/Abstract/IInventoryMovementDal";
import InventoryMovementDal from "../../DataAccess/Concrete/Mongoose/InventoryMovementDal";
import ContainerTypes from "./ContainerTypes";
import InventoryMovementManager from "../../Business/Concrete/InventoryMovementManager";
import IInventoryMovementService from "../../Business/Abstract/IInventoryMovementService";
import OrderManager from "../../Business/Concrete/OrderManager";
import IOrderService from "../../Business/Abstract/IOrderService";
import IOrderDal from "../../DataAccess/Abstract/IOrderDal";
import OrderDal from "../../DataAccess/Concrete/Mongoose/OrderDal";
import OrdersController from "../Concrete/Controllers/OrdersController";

// singleton sadece bir kere oluşturulur ve her seferinde aynı nesne döner
iocContainer.registerSingleton(ContainerTypes.ProductsController, ProductsController);
iocContainer.registerSingleton(ContainerTypes.MaterialsController, MaterialsController);
iocContainer.registerSingleton(ContainerTypes.UsersController, UsersController);
iocContainer.registerSingleton(ContainerTypes.AuthController, AuthController);
iocContainer.registerSingleton(ContainerTypes.SuppliersController, SuppliersController);
iocContainer.registerSingleton(ContainerTypes.OrdersController, OrdersController);
// iocContainer.registerSingleton(ContainerTypes.InventoryMovementsController, InventoryMovementsController)



// business
iocContainer.registerSingleton<IProductService>(ContainerTypes.IProductService, ProductManager);
iocContainer.registerSingleton<IMaterialService>(ContainerTypes.IMaterialService, MaterialManager);
iocContainer.registerSingleton<IUserService>(ContainerTypes.IUserService, UserManager);
iocContainer.registerSingleton<IAuthService>(ContainerTypes.IAuthService, AuthManager);
iocContainer.registerSingleton<ISupplierService>(ContainerTypes.ISupplierService, SupplierManager);
iocContainer.registerSingleton<IInventoryMovementService>(ContainerTypes.IInventoryMovementService, InventoryMovementManager);
iocContainer.registerSingleton<IOrderService>(ContainerTypes.IOrderService, OrderManager);

//data access
iocContainer.registerSingleton<IProductDal>(ContainerTypes.IProductDal, ProductDal);
iocContainer.registerSingleton<IMaterialDal>(ContainerTypes.IMaterialDal, MaterialDal);  
iocContainer.registerSingleton<IUserDal>(ContainerTypes.IUserDal, UserDal);
iocContainer.registerSingleton<ISupplierDal>(ContainerTypes.ISupplierDal, SupplierDal);
iocContainer.registerSingleton<IInventoryMovementDal>(ContainerTypes.IInventoryMovementDal, InventoryMovementDal);  
iocContainer.registerSingleton<IOrderDal>(ContainerTypes.IOrderDal, OrderDal);  

export default iocContainer;
