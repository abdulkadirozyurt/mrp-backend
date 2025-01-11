import { container as iocContainer } from "tsyringe";
import IAuthService from "../../Business/Abstract/IAuthService";
import IInventoryMovementService from "../../Business/Abstract/IInventoryMovementService";
import IMaterialService from "../../Business/Abstract/IMaterialService";
import IProductService from "../../Business/Abstract/IProductService";
import ISupplierService from "../../Business/Abstract/ISupplierService";
import IUserService from "../../Business/Abstract/IUserService";
import AuthManager from "../../Business/Concrete/AuthManager";
import InventoryMovementManager from "../../Business/Concrete/InventoryMovementManager";
import MaterialManager from "../../Business/Concrete/MaterialManager";
import ProductManager from "../../Business/Concrete/ProductManager";
import SupplierManager from "../../Business/Concrete/SupplierManager";
import UserManager from "../../Business/Concrete/UserManager";
import IInventoryMovementDal from "../../DataAccess/Abstract/IInventoryMovementDal";
import IMaterialDal from "../../DataAccess/Abstract/IMaterialDal";
import IProductDal from "../../DataAccess/Abstract/IProductDal";
import ISupplierDal from "../../DataAccess/Abstract/ISupplierDal";
import IUserDal from "../../DataAccess/Abstract/IUserDal";
import InventoryMovementDal from "../../DataAccess/Concrete/Mongoose/InventoryMovementDal";
import MaterialDal from "../../DataAccess/Concrete/Mongoose/MaterialDal";
import ProductDal from "../../DataAccess/Concrete/Mongoose/ProductDal";
import SupplierDal from "../../DataAccess/Concrete/Mongoose/SupplierDal";
import UserDal from "../../DataAccess/Concrete/Mongoose/UserDal";
import AuthController from "../Concrete/Controllers/AuthController";
import MaterialsController from "../Concrete/Controllers/MaterialsController";
import ProductsController from "../Concrete/Controllers/ProductsController";
import SuppliersController from "../Concrete/Controllers/SuppliersController";
import UsersController from "../Concrete/Controllers/UsersController";
import ContainerTypes from "./ContainerTypes";
import SupplierOrdersController from "../Concrete/Controllers/SupplierOrdersController";
import CustomerOrdersController from "../Concrete/Controllers/CustomerOrdersController";
import ICustomerOrderService from "../../Business/Abstract/ICustomerOrderService";
import CustomerOrderManager from "../../Business/Concrete/CustomerOrderManager";
import SupplierOrderManager from "../../Business/Concrete/SupplierOrderManager";
import ISupplierOrderService from "../../Business/Abstract/ISupplierOrderService";
import SupplierOrderDal from "../../DataAccess/Concrete/Mongoose/SupplierOrderDal";
import ISupplierOrderDal from "../../DataAccess/Abstract/ISupplierOrderDal";
import ICustomerOrderDal from "../../DataAccess/Abstract/ICustomerOrderDal";
import CustomerOrderDal from "../../DataAccess/Concrete/Mongoose/CustomerOrderDal";
import ICustomerService from "../../Business/Abstract/ICustomerService";
import CustomerManager from "../../Business/Concrete/CustomerManager";
import CustomerDal from "../../DataAccess/Concrete/Mongoose/CustomerDal";
import ICustomerDal from "../../DataAccess/Abstract/ICustomerDal";
import CustomersController from "../Concrete/Controllers/CustomersController";
import MrpController from "../Concrete/Controllers/MrpController";

// singleton sadece bir kere oluşturulur ve her seferinde aynı nesne döner
iocContainer.registerSingleton(ContainerTypes.AuthController, AuthController);
iocContainer.registerSingleton(ContainerTypes.UsersController, UsersController);
iocContainer.registerSingleton(ContainerTypes.ProductsController, ProductsController);
iocContainer.registerSingleton(ContainerTypes.MaterialsController, MaterialsController);
iocContainer.registerSingleton(ContainerTypes.SuppliersController, SuppliersController);
iocContainer.registerSingleton(ContainerTypes.CustomersController, CustomersController);
iocContainer.registerSingleton(ContainerTypes.CustomerOrdersController, CustomerOrdersController);
iocContainer.registerSingleton(ContainerTypes.SupplierOrdersController, SupplierOrdersController);
iocContainer.registerSingleton(ContainerTypes.MrpController, MrpController);

// iocContainer.registerSingleton(ContainerTypes.InventoryMovementsController, InventoryMovementsController)

// business
iocContainer.registerSingleton<IUserService>(ContainerTypes.IUserService, UserManager);
iocContainer.registerSingleton<IAuthService>(ContainerTypes.IAuthService, AuthManager);
iocContainer.registerSingleton<IProductService>(ContainerTypes.IProductService, ProductManager);
iocContainer.registerSingleton<IMaterialService>(ContainerTypes.IMaterialService, MaterialManager);
iocContainer.registerSingleton<ISupplierService>(ContainerTypes.ISupplierService, SupplierManager);
iocContainer.registerSingleton<ICustomerService>(ContainerTypes.ICustomerService, CustomerManager);
iocContainer.registerSingleton<ICustomerOrderService>(ContainerTypes.ICustomerOrderService, CustomerOrderManager);
iocContainer.registerSingleton<ISupplierOrderService>(ContainerTypes.ISupplierOrderService, SupplierOrderManager);
iocContainer.registerSingleton<IInventoryMovementService>(ContainerTypes.IInventoryMovementService, InventoryMovementManager);

//data access
iocContainer.registerSingleton<IUserDal>(ContainerTypes.IUserDal, UserDal);
iocContainer.registerSingleton<IProductDal>(ContainerTypes.IProductDal, ProductDal);
iocContainer.registerSingleton<IMaterialDal>(ContainerTypes.IMaterialDal, MaterialDal);
iocContainer.registerSingleton<ISupplierDal>(ContainerTypes.ISupplierDal, SupplierDal);
iocContainer.registerSingleton<ICustomerDal>(ContainerTypes.ICustomerDal, CustomerDal);
iocContainer.registerSingleton<ICustomerOrderDal>(ContainerTypes.ICustomerOrderDal, CustomerOrderDal);
iocContainer.registerSingleton<ISupplierOrderDal>(ContainerTypes.ISupplierOrderDal, SupplierOrderDal);
iocContainer.registerSingleton<IInventoryMovementDal>(ContainerTypes.IInventoryMovementDal, InventoryMovementDal);

export default iocContainer;
