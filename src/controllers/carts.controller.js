import { createService, readService, readOneService, updateService, destroyService } from "../services/carts.service.js";

async function create (req, res, next) {
    try {
        const data = req.body;
        //Se comento la siguiente porque al probar la persistencia de Fs req.user._id era undefined
        data.user_id = req.user._id;
        const one = await createService(data);
        return res.message201("CREATED ID: " + one._id);
    } catch (error) {
        return next(error)
    }
};

async function read(req, res, next) {
    try {
        const user_id = req.user_id;
        const all = await readService({ user_id });
        if (all.length > 0) {
            return res.response200(all);
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
};

async function readOne(req, res, next) {
    try {
        const { uid } = req.params;
        console.log("User ID from Params:", uid);
        const one =  await readOneService(uid);
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
};

async function update (req, res, next) {
    try {
        const { uid } = req.params
        const data = req.body
        const one = await updateService(uid, data)
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

async function destroy (req, res, next) {
    try {
        const { uid } = req.params
        const one = await destroyService(uid)
        if (one) {
            return res.response200(one);
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next (error);
    }
};

export { create, read, readOne, update, destroy};