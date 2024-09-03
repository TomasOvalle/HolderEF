import dao from "../data/dao.factory.js";
import ProductsDTO from "../dto/products.dto.js";
const { products } = dao;

class ProductsRepository {
    constructor(manager) {
        this.model = manager;
    }

    createRepository = async (data) => {
        try {
            data = new ProductsDTO(data)
            const one = await this.model.create(data);
            return one;
        } catch (error) {
            throw error;
        }
    };

        //Esto es nuevo
    readBySupplierRepository = async (supplier_id) => {
        try {
            const products = await this.model.readBySupplier({ supplier_id });
            return products;
        } catch (error) {
            throw error;
        }
    };

    readRepository = async (role) => {
        try {
            const all = await this.model.read(role);
            return all;
        } catch (error) {
            throw error;
        }
    };

    // se elimino la desestructuración 
    paginateRepository = async ( filter, opts ) => {
        try {
            const all = await this.model.paginate( filter, opts );
            return all;
        } catch (error) {
            throw error;
        }
    };

    //se cambio id por uid
    readOneRepository = async (uid) => {
        try {
            const one = await this.model.readOne(uid);
            return one;
        } catch (error) {
            throw error;
        }
    };

    //se cambio id por uid
    updateRepository = async (uid, data) => {
        try {
            const one = await this.model.update(uid, data);
            return one;
        } catch (error) {
            throw error;
        }
    };

    //se cambio id por uid
    destroyRepository = async (uid) => {
        try {
            const one = await this.model.destroy(uid);
            return one;
        } catch (error) {
            throw error;
        }
    };

}

const productsRepository = new ProductsRepository(products);
export default productsRepository;