import Service from "./service.js";
//import productsManager from "../data/memory/ProductsManager.memory.js"
//import productsManager from "../data/fs/ProductsManager.fs.js"
//import productsManager from "../data/mongo/manager/ProductsManager.mongo.js";

import productsRepository from "../repositories/products.rep.js";

const productsService = new Service(productsRepository);
const { createService, getProductsBySupplier, readService, paginateService, readOneService, updateService, destroyService } = productsService;
export { createService, getProductsBySupplier, readService, paginateService, readOneService, updateService, destroyService };