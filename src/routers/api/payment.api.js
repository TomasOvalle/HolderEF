import CustomRouter from "../CustomRouter";
import { paymentController } from "../../controllers/payment.controller";

class PaymentRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER", "ADMIN", "PREM"], paymentController);
    }
}

const paymentRouter = new PaymentRouter();
export default paymentRouter.getRouter();