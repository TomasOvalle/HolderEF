import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import productsRepository from "../repositories/products.rep.js";

async function createData() {
    try {
        dbConnect();
        for (let i = 1; i < 852; i++) {
            const products = {
                title: faker.commerce.product(),
                price: faker.commerce.price({ min: 5490, max: 17990, dec: 0 })
            };
            await productsRepository.createRepository(products);
        };
        console.log("Products Created");
    } catch (error) {
        console.log(error);
        throw error;
    }
};

createData();