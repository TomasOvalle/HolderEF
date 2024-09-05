import CustomRouter from "../CustomRouter.js";
//import usersManager from "../../data/mongo/manager/UsersManager.mongo.js"
import { create, read, readOne, /*readByEmail,*/ update, destroy } from "../../controllers/users.controller.js";

//Se cambio todos los ["USER"] por ["PUBLIC"], para realizar las pruebas de Fs
class UsersRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "ADMIN", "PREM"], create);
        this.read("/", ["USER", "ADMIN", "PREM", "PUBLIC"], read);
        //this.read("/:email", ["PUBLIC"], readByEmail);
        this.read("/:uid", ["USER", "ADMIN", "PREM"], readOne);
        this.update("/:uid", ["USER", "ADMIN", "PREM"], update);
        this.destroy("/:uid", ["USER", "ADMIN", "PREM"], destroy);
    }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

