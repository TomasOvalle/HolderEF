import CustomRouter from "../CustomRouter.js";
//import cartsManager from "../../data/mongo/manager/CartsManager.mongo.js";
import { create, read, readOne, update, destroy} from "../../controllers/carts.controller.js";

// Todo estaba con ["USER"] y se cambio ["USER"] POR ["PUBLIC"] para la pruebas de fs
class CartsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "PREM"], create);
        this.read("/", ["USER", "PREM"], read);
        this.read("/:uid", ["USER", "PREM"], readOne);
        this.update("/:uid", ["USER", "PREM"], update);
        this.destroy("/:uid", ["USER", "PREM"], destroy);
    }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();


