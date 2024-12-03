import { container as iocContainer } from "tsyringe";
import ProductsController from "../Concrete/Controllers/ProductsController";
import MaterialsController from "../Concrete/Controllers/MaterialsController";
import ProductManager from "../../Business/Concrete/ProductManager";
import IProductService from "../../Business/Abstract/IProductService";
import IProductDal from "../../DataAccess/Abstract/IProductDal";
import ProductDal from "../../DataAccess/Concrete/Mongoose/ProductDal";
import IMaterialService from "../../Business/Abstract/IMaterialService";
import MaterialManager from "../../Business/Concrete/MaterialManager";
import IMaterialDal from "../../DataAccess/Abstract/IMaterialDal";
import MaterialDal from "./../../DataAccess/Concrete/Mongoose/MaterialDal";

// singleton sadece bir kere oluşturulur ve her seferinde aynı nesne döner
iocContainer.registerSingleton(ProductsController);
iocContainer.registerSingleton(MaterialsController);

// business
iocContainer.registerSingleton<IProductService>("IProductService", ProductManager);
iocContainer.registerSingleton<IMaterialService>("IMaterialService", MaterialManager);

//data access
iocContainer.registerSingleton<IProductDal>("IProductDal", ProductDal);
iocContainer.registerSingleton<IMaterialDal>("IMaterialDal", MaterialDal);

export default iocContainer;
