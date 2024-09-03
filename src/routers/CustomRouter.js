import { Router } from "express";
//import usersManager from "../data/mongo/manager/UsersManager.mongo.js";
import { verifyToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import winston from "../utils/winston.util.js"

class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    init() {}

  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }

response = (req, res, next) => {
  res.message200 = (message) => res.json({ statusCode: 200, message });
  res.response200 = (response) => res.json({ statusCode: 200, response });
  res.paginate = (response, info) => res.json({ statusCode: 200, response, info });
  res.message201 = (message) => res.json({ statusCode: 201, message });

  res.error400 = (message) => {
    const errorMessage = `${req.method} ${req.url} 400 - ${new Date().toLocaleTimeString()} - ${message}`;
    winston.ERROR(errorMessage);
    return res.json({ statusCode: 400, message: message });
  };

  res.error401 = () => {
    const errorMessage = `${req.method} ${req.url} 401 - ${new Date().toLocaleTimeString()} - Bad auth from poliecies!`;
    winston.ERROR(errorMessage);
    return res.json({ statusCode: 401, message: "Bad auth from poliecies!" });
  };

  res.error403 = () => {
    const errorMessage = `${req.method} ${req.url} 403 - ${new Date().toLocaleTimeString()} - Forbidden from poliecies!`;
    winston.ERROR(errorMessage);
    return res.json({ statusCode: 403, message: "Forbidden from poliecies!" });
  }

  res.error404 = () => {
    const errorMessage = `${req.method} ${req.url} 404 - ${new Date().toLocaleTimeString()} - Not found docs`;
    winston.ERROR(errorMessage);
    return res.json({ statusCode: 404, message: "Not found docs" });
  }
  return next();
};

    policies = (policies) => async (req, res, next) => {
        if (policies.includes("PUBLIC")) return next();
        else {
          let token = req.cookies["token"];
          if (!token) return res.error401();
          else {
            try {
              token = verifyToken(token);
              const { role, email } = token;
              if (
                (policies.includes("USER") && role === 0) ||
                (policies.includes("ADMIN") && role === 1) ||
                (policies.includes("PREM") && role === 2)
              ) {
                //En lugar de llamar al manager hay que llamar a la capa de repositorio
                //const user = await usersManager.readByEmail(email);
                const user = await usersRepository.readByEmailRepository(email);
                req.user = user;
                return next();
              } else return res.error403();
            } catch (error) {
              return res.error400(error.message);
            }
          }
        }
      };

    create(path, arrayOfPolicies, ...callbacks) {
        this.router.post(path, this.response, this.policies(arrayOfPolicies), this.applyCbs(callbacks))
    }
    read(path, arrayOfPolicies, ...callbacks) {
        this.router.get(path, this.response, this.policies(arrayOfPolicies), this.applyCbs(callbacks))
    }
    update(path, arrayOfPolicies, ...callbacks) {
        this.router.put(path, this.response, this.policies(arrayOfPolicies), this.applyCbs(callbacks))
    }
    destroy(path, arrayOfPolicies, ...callbacks) {
        this.router.delete(path, this.response, this.policies(arrayOfPolicies), this.applyCbs(callbacks))
    }
    use(path, ...callbacks) {
        this.router.use(path, this.response, this.applyCbs(callbacks));
    }
}

export default CustomRouter;