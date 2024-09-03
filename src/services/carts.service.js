import Service from "./service.js";
//import cartsManager from "../data/memory/CartsManager.memory.js"
//import cartsManager from "../data/fs/CartsManager.fs.js";
//import cartsManager from "../data/mongo/manager/CartsManager.mongo.js";

import cartsRepository from "../repositories/carts.rep.js";

const cartsService = new Service(cartsRepository);
const { createService, readService, readOneService, updateService, destroyService } = cartsService;
export { createService, readService, readOneService, updateService, destroyService};