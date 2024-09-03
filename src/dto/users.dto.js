import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js"

const persistance = argsUtil.persistance

class UsersDTO {
    constructor(data) {
        (persistance !== "mongo") && (this._id = crypto.randomBytes(12).toString("hex"));
        this.email = data.email;
        this.password = createHash(data.password);
        this.role = data.role || 0;
        this.age = data.age || 12;
        this.photo = data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png";
        this.verify = data.verify || false; //el cambio se hizo para que las cuentas creadas con fakerjs esten verificas y puedan utilizarce 
        this.verifyCode = crypto.randomBytes(12).toString("hex");
        (persistance !== "mongo") && (this.createdAt = new Date());
        (persistance !== "mongo") && (this.updatedAt = new Date());
    }
}

export default UsersDTO;