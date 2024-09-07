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
        role: 1,
        verify: true,
    };
    const manga = {
        title: "Konosuba 05",
        price: 9990
    };
    const updatedManga = {
        title: "Konosuba 05",
        price: 14990
    }
    let token = "";
    //Test para registrar un usuario
    it("Registro de un usuario", async () => {
        const response = await requester.post("/sessions/register").send(user);
        const { _body } = response;
        //console.log(_body);
        expect(_body.statusCode).to.be.equals(201);
        expect(_body.message).to.be.equals("User registered!");
    });
    //Test para iniciar sesión
    it("Inicio de sesión de un usuario", async () => {
        const response = await requester.post("/sessions/login").send(user);
        const { _body, headers } = response;
        //console.log(_body);
        //console.log(headers);
        token = headers["set-cookie"][0].split(";")[0];
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.email).to.be.equals(user.email);
    });
    //Test para crear un producto
    it("Creación de un producto por parte de un administrador", async () => {
        const response = await requester.post("/products").send(manga).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(201);
        expect(_body.response.title).to.be.equals(manga.title);
    });
    //Test para leer los productos
    it("Lectura de los productos", async () => {
        const response = await requester.get("/products");
        const { _body } = response;
        //console.log(_body);
        expect(_body.response).to.be.an("array");
        expect(_body.response).to.have.lengthOf.at.least(1);
    });
    //Test para actualizar un producto
    it("Actualización de un producto", async () => {
        const foundProduct = await productsRepository.readOneRepository( manga.title);
        const response = await requester.put("/products/" +foundProduct._id ).send(updatedManga).set("Cookie", token);
        const { _body } = response;
        //console.log(_body);
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.price).to.be.equals(updatedManga.price);
    })
    //Test para la eliminación de un producto
    it("Eliminación de un producto por parte de un administrador", async () => {
        const foundProduct = await productsRepository.readOneRepository( manga.title);
        const response = await requester.delete("/products/" + foundProduct._id).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.message).to.be.equals("Product deleted successfully");
        
    });
    //Test para cerrar sesión
    it("Cerrado se sesión", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.message).to.be.equals("User signed out successfully");
    });
    //Test para eliminar un usuario
    it("Eliminación de un usuario", async () => {
        const foundUser = await usersRepository.readByEmailRepository(user.email);
        const response = await requester.delete("/sessions/"+foundUser._id);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.message).to.be.equals("User deleted successfully");
    });
     // Test para casos de errores
    it("Intentar crear un producto sin autorización (sin token)", async () => {
        const response = await requester.post("/products").send(manga);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(401);
        expect(_body.message).to.be.equals("Unauthorized");
    });
});