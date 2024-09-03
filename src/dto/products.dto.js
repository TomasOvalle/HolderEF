import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
    constructor(data) {
        (persistence !== "mongo") && (this._id = crypto.randomBytes(12).toString("hex"));
        this.title = data.title;
        this.publisher = data.publisher || "publisher";
        this.category = data.category || "manga";
        this.price = data.price || 1;
        this.stock = data.stock || 10;
        this.photo = data.photo || "https://i.postimg.cc/kX8PKZpq/ipad.jpg";
        this.supplier_id = data.supplier_id; 
        (persistence !== "mongo") && (this.createdAt = new Date());
        (persistence !== "mongo") && (this.updatedAt = new Date());
    }
}

export default ProductsDTO;