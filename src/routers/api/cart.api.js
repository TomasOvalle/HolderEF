import CustomRouter from "../CustomRouter.js";
//import cartsManager from "../../data/mongo/manager/CartsManager.mongo.js";
import { create, read, readOne, update, destroy} from "../../controllers/carts.controller.js";

// Todo estaba con ["USER"] y se cambio ["USER"] POR ["PUBLIC"] para la pruebas de fs
class CartsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER"], create);
        this.read("/", ["USER"], read);
        this.read("/:uid", ["USER"], readOne);
        this.update("/:uid", ["USER"], update);
        this.destroy("/:uid", ["USER"], destroy);
    }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();


