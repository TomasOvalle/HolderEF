import dao from "../data/dao.factory.js";
const { usersManager } = dao;

class SessionsRepository {
    constructor() {
        this.model = usersManager;
    }

    createRepository = async (data) => {
        try {
            const one = await this.model.create(data);
            return one;
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

    readOneRepository = async (id) => {
        try {
            const one = await this.model.readOne(id);
            return one;
        } catch (error) {
            throw error;
        }
    };

    readByEmailRepository = async (email) => {
        try {
            const one = await this.model.readByEmail(email);
            return one;
        } catch (error) {
            throw error;
        }
    };

    updateRepository = async (id, data) => {
        try {
            const one = await this.model.update(id, data);
            return one;
        } catch (error) {
            throw error;
        }
    };

    destroyRepository = async (id) => {
        try {
            const one = await this.model.destroy(id);
            return one;
        } catch (error) {
            throw error;
        }
    };
}

const sessionsRepository = new SessionsRepository();
export default sessionsRepository;