import environment from "./src/utils/env.util.js";
import express from "express"
//import morgan from "morgan";
//import cluster from "cluster";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express"; 
//import { cpus } from "os";

import argsUtil from "./src/utils/args.util.js";

import winston from "./src/middlewares/winston.mid.js";
import indexRouter from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import __dirname from "./utils.js"
import configs from "./src/utils/swagger.util.js";

console.log("Todas las variables de entorno " + process.env);
console.log(process.env.MONGO_URI);

//http server
const server = express();
const port = environment.PORT || argsUtil.p;
const ready = async () => {
    //console.log("Server ready on port " + port);
    //await dbConnect();
}
server.listen(port, ready);

//http server
/*const server = express();
const port = environment.PORT || argsUtil.p;
const ready = async () => {};
const numOfProc = cpus().length
if (cluster.isPrimary) {
    for (let i = 1; i <= numOfProc; i++) {
        cluster.fork();
    }
    console.log("Proceso primario");
} else {
    console.log("Proceso worker" + process.pid);
    console.log("Server ready on port " + port);
    server.listen(port, ready);
}*/

const specs = swaggerJSDoc(configs);

// middlewares
server.use(express.json());
server.use(express.urlencoded({extended: true }));

server.use(express.static(__dirname + "/public"));

server.use(winston);
server.use(cookieParser(environment.SECRET_COOKIE));
server.use(compression({ brotli: { enabled: true, zlib: {} },}));
server.use("/api/docs", serve, setup(specs));

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

