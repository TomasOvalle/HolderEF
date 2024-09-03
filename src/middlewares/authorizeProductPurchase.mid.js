import Product from "../data/mongo/models/product.model.js"

async function authorizeProductPurchase (req, res, next) {
    const { role } = req.session;
    const { product_id } = req.params;

    try {
        const product = await Product.findById(product_id);
        if (!product) {
            return res.error404("Product not found");
        }
        if (role === 1 || "ADMIn") {
            return res.error403("Administrators cannot purchase products")
        }
        if (role === 2 || "PREM" && product.supplier_id.equals(user._id)) {
            return res.error403("You cannot purchase your own product")
        }
        return next();
    } catch (error) {
        return next(error);
    }
}

export default authorizeProductPurchase;