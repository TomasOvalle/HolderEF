import CustomRouter from "../CustomRouter.js";
import { create, readPrem, read, paginate, readOne, update, destroy } from "../../controllers/products.controller.js";
//import productsManager from "../../data/mongo/manager/ProductsManager.mongo.js"
//import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
//DE AQUI HACIA ABAJO SON NUEVOS MIDDLEWARES CREADOS PARA LA ENTREGA FINAL
//import authorizeProductPurchase from "../../middlewares/authorizeProductPurchase.mid.js";
//import filterProducts from "../../middlewares/FilterProducts.mid.js";
//import isValidPrem from "../../middlewares/isValidPrem.mid.js";

// se cambio el ["ADMIN"] de create, update, destroy, por ["PUBLIC"] para realizar pruebas en Fs, además de comentar el middleware isvalidAdmin
class ProductsRouter extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], /*filterProducts,*/ read);
        // HAY UNA NUEVA RUTA PARA QUE PREM LEA SOLOMANETE SUS PRODUCTOS 
        // SE AGREGO PREM A CREATE, DESTROY Y UPDATE PARA QUE PUEDA GESTIONAR SUS PRODUCTOS
        this.read("/me", ["PREM"], /*isValidPrem,*/ readPrem);
        this.read("/paginate", ["PUBLIC"], paginate);
        this.read("/:pid", ["PUBLIC"], readOne);
        this.create("/", ["ADMIN", "PREM"], create );
        this.update("/:pid", ["ADMIN", "PREM"], /*authorizeProductPurchase,*/ update);
        this.destroy("/:pid", ["ADMIN", "PREM"], /*authorizeProductPurchase,*/ destroy);
    }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();




