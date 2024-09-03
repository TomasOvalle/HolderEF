import { expect } from "chai";
import supertest from "supertest";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";

const requester = supertest("http://localhost:8080/api")

describe("Testeando MangaHaven API", function () {
    this.timeout(20000);
    const user = {
        email: "tomas@coder.com",
        password: "hola1234",
        role: "1",
        verify: true,
    };
    const manga = {
        title: "Konosuba 05",
    };
    const updatedManga = {
        title: "Konosuba 05",
        price: 14990
    }
    let token = "";
    it("Registro de un usuario", async () => {
        const response = await requester.post("/sessions/register").send(user);
        const { _body } = response;
        //console.log(_body);
        expect(_body.statusCode).to.be.equals(201);
    });
    it("Inicio de sesión de un usuario", async () => {
        const response = await requester.post("/sessions/login").send(user);
        const { _body, headers } = response;
        //console.log(_body);
        //console.log(headers);
        token = headers["set-cookie"][0].split(";")[0];
        expect(_body.statusCode).to.be.equals(200);
    });
    it("Creación de un producto por parte de un administrador", async () => {
        const response = await requester.post("/products").send(manga).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(201);
    });
    it("Lectura de los productos", async () => {
        const response = await requester.get("/products");
        const { _body } = response;
        //console.log(_body);
        expect(_body.statusCode).to.be.equals(200);
    });
    it("Actualización de un producto", async () => {
        const foundProduct = await productsRepository.readOneRepository( manga.title);
        const response = await requester.put("/products/" +foundProduct._id ).send(updatedManga).set("Cookie", token);
        const { _body } = response;
        //console.log(_body);
        expect(_body.statusCode).to.be.equals(200);
    })
    it("Eliminación de un producto por parte de un administrador", async () => {
        const foundProduct = await productsRepository.readOneRepository( manga.title);
        const response = await requester.delete("/products/" + foundProduct._id).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
    });
    it("Cerrado se sesión", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
    });
    it("Eliminación de un usuario", async () => {
        const foundUser = await usersRepository.readByEmailRepository(user.email);
        const response = await requester.delete("/sessions/"+foundUser._id);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
    });
});