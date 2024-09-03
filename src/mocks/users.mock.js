import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import usersRepository from "../repositories/users.rep.js";

async function createData() {
    try {
        dbConnect();
        for (let index = 1; index < 48; index++) {
            const first_name = faker.person.firstName();
            const last_name = faker.person.lastName();
            const email = first_name + last_name + "@coder.com"
            const password = "hola1234"
            const verify = true
            const user = { first_name, last_name, email, password, verify};
            await usersRepository.createRepository(user);
        };
        console.log("User created");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

createData();