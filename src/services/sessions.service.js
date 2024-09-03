import Service from "./service.js";
import sessionsRepository from "../repositories/sessions.rep.js";


const sessionsService = new Service(sessionsRepository);
export const { createService, readService, readByEmailService, readOneService, updateService, destroyService } = sessionsService;