import { createService, getProductsBySupplier, readService, paginateService, readOneService, updateService, destroyService } from "../services/products.service.js";

async function create (req, res, next) {
    try {
        const data = req.body;
        //console.log(data);
        const one = await createService(data);
        return res.message201("CREATED ID: " + one._id);
    } catch (error) {
        return next(error);
    }
};

//ESTO ES NUEVO 
async function readPrem(req, res ,next) {
    try {
        const user_id = req.user._id;
        const premProducts = await getProductsBySupplier({ supplier_id: user_id});
        return res.response200(premProducts);
    } catch (error) {
        return next(error);
    }
}

async function read( req, res, next) {
    try {
        const { category } = req.query;
        const all = await readService(category);
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

async function paginate (req, res, next) {
    try {
        const filter = {}; 
        const opts = {}; 
        if (req.query.limit) {
            opts.limit = req.query.limit
        }
        if (req.query.page) {
            opts.page = req.query.page
        }
        if (req.query.category) {
            filter.category = req.query.category
        }
        const all = await paginateService( {filter, opts} )
        const info = {
            totalDocs: all.totalDocs,
            page: all.page,
            totalPages: all.totalPages,
            limit: all.limit,
            prevPage: all.prevPage,
            nextPage: all.nextPage,
        };
        return res.paginate(all.docs, info);
    } catch (error) {
        return next (error)
    }
}

async function readOne( req, res, next) {
    try {
        const { pid } = req.params;
        const one = await readOneService(pid);
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

async function update (req, res, next) {
    try {
        const { pid } = req.params
        const data = req.body
        const one = await updateService(pid, data)
        if (one) {
            return res.response200(one);
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
};

async function destroy (req, res, next) {
    try {
        const { pid } = req.params
        const one = await destroyService(pid)
        if (one) {
            return res.response200(one);
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
}


export { create, readPrem, read, paginate, readOne, update, destroy};