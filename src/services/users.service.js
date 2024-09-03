import Service from "./service.js";
//import usersManager from "../data/memory/UsersManager.memory.js";
//import usersManager from "../data/fs/UsersManager.fs.js";
//import usersManager from "../data/mongo/manager/UsersManager.mongo.js";

import usersRepository from "../repositories/users.rep.js"

const usersService = new Service(usersRepository);
export const { createService, readService, readOneService, readByEmailService, updateService, destroyService } = usersService;