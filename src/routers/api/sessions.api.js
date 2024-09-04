import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, signout, google, profile, verifyCode } from "../../controllers/sessions.controller.js";
//import validator from "../../middlewares/joi.mid.js";
//import usersSchema from "../../schemas/user.schema.js";

class SessionsRouter extends CustomRouter {
    init() {
        // SE COMENTO VALIDATOR PARA FACILITAR PRUEBAS 
        this.create("/register", ["PUBLIC"], /*validator(usersSchema),*/ passportCb("register"), register);
        this.create("/login", ["PUBLIC"], passportCb("login"), login);
        //SE AÑADIO PREM 
        this.read("/online", ["USER", "ADMIN", "PREM"], passportCb("jwt"), profile);
        this.create("/signout", ["USER", "ADMIN", "PREM"], signout);
        this.read("/google",["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
        this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), google);
        this.create("/verify", ["PUBLIC"], verifyCode);
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();



