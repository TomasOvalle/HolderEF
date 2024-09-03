import productsRepository from "../repositories/products.rep.js"


async function filterProducts(req, res ,next) {
    try {
        const user = req.user;
        if (user.role === "PREM") {
            req.products = await productsRepository.readRepository({ supplier_id: { $ne: user._id }});
        } else {
            req.products = await productsRepository.readRepository();
        }
        return next();
    } catch (error) {
        return next(error);
    }
}

export default filterProducts;