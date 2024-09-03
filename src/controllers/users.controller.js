import { createService, readService, readOneService, updateService, destroyService, readByEmailService } from "../services/users.service.js";

class UsersController {
    async create (req, res, next) {
        try {
            const data = req.body;
            const one = await createService(data);
            return res.message201("CREATED ID: " + one._id);
        } catch (error) {
            return next(error);
        }
    };

    async read( req, res, next) {
        try {
            const { role } = req.query;
            const all = await readService(role);
            if (all.length > 0) {
                return res.response200(all);
            } else {
                const error = new Error("Not found");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    }

    async readOne( req, res, next) {
        try {
            const { uid } = req.params;
            const one = await readOneService(uid);
            if (one) {
                return res.response200(one);
            } else {
                const error = new Error("Not found");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    }

    async readByEmail( req, res, next) {
        try {
            const { email } = req.params;
            const one = await readByEmailService(email);
            if (one) {
                return res.response200(one);
            } else {
                const error = new Error("Not found");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            return next (error);
        }
    }

    async update (req, res, next) {
        try {
            const { uid } = req.params
            const data = req.body
            const one = await updateService(uid,data);
            if (one) {
                return res.response200(one);
            } else {
                const error = new Error("Not found!");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    };

    async destroy (req, res, next) {
        try {
            const { uid } = req.params
            const one = await destroyService(uid);
            if (one) {
                return res.response200(one);
            } else {
                const error = new Error("Not found!");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    }

}

const usersController = new UsersController();
const { create, read, readOne, readByEmail, update, destroy } = usersController;
export { create, read, readOne, readByEmail, update, destroy };