import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js";

const persistence = argsUtil.persistence
let dao = {}

switch (persistence) {
    case "memory":
        console.log("Connected to Memory");
        const { default: usersManagerMem } = await import("./memory/UsersManager.memory.js");
        const { default: productsManagerMem } = await import("./memory/ProductsManager.memory.js");
        const { default: cartsManagerMem } = await import("./memory/CartsManager.memory.js");
        dao = { users: usersManagerMem, products: productsManagerMem, carts: cartsManagerMem };
        break;
    case "fs":
        console.log("Connected to File System");
        const { default: usersManagerFs } = await import("./fs/UsersManager.fs.js");
        const { default: productsManagerFs } = await import("./fs/ProductsManager.fs.js");
        const { default: cartsManagerFs } = await import("./fs/CartsManager.fs.js");
        dao = { users: usersManagerFs, products: productsManagerFs, carts: cartsManagerFs };
        break;
    default:
        console.log("Connected to MongoDB");
        dbConnect();
        const { default: usersManagerMongo } = await import("./mongo/manager/UsersManager.mongo.js");
        const { default: productsManagerMongo } = await import("./mongo/manager/ProductsManager.mongo.js");
        const { default: cartsManagerMongo } = await import("./mongo/manager/CartsManager.mongo.js");
        dao = { users: usersManagerMongo, products: productsManagerMongo, carts: cartsManagerMongo };
        break;
}

export default dao;