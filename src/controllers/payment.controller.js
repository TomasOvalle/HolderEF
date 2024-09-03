import { paymentService } from "../services/payment.service.js";

const paymentController = async (req, res, next) => {
    try {
        const response = await paymentService(req.user_id);
        return res.response200(response);
    } catch (error) {
        return next(error);
    }
}

export { paymentController };