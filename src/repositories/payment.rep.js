import cartsManager from "../data/mongo/manager/CartsManager.mongo.js"
import Stripe from "stripe";
import CheckoutProduct from "../dto/checkoutProduct.dto.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paymentRepository = async (user_id) => {
    try {
        let productsOnCart = cartsManager.read({ user_id })
        console.log(productsOnCart);
        productsOnCart = productsOnCart.map((product) => new CheckoutProduct(product));
        console.log(productsOnCart);
        const line_items = productsOnCart
        const mode = "payment";
        const success_url = "http://localhost:8080/thanks.html";
        const intent = await stripe.checkout.sessions.create({
        line_items,
        mode,
        success_url,
        });
        return intent;
    } catch (error) {
        throw error;
    }
}

export { paymentRepository };