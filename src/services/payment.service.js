import { paymentRepository } from "../repositories/payment.rep.js";

const paymentService = async (user_id) => {
    try {
        const response = await paymentRepository(user_id);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export {paymentService};