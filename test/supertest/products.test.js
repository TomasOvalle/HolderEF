import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080/api");

describe("Testeando MangaHaven API - Productos", function () {
    this.timeout(20000);

    const user = {
        email: "tomas@coder.com",
        password: "hola1234",
        role: 1,
        verify: true,
    };

    const product = {
        title: "One Piece 01",
        price: 9990,
        stock: 10,
    };
    const updatedProduct = {
        title: "One Piece 01",
        price: 8990,
        stock: 7
    };

    let token = "";
    let createdProductId = "";

    it("Registro de un usuario", async () => {
        const response = await requester.post("/sessions/register").send(user);
        const { _body } = response;
        //console.log(_body);
        expect(_body.statusCode).to.be.equals(201);
        //expect(_body.message).to.be.equals("User registered!");
    });
    //Test para iniciar sesión
    it("Inicio de sesión de un usuario", async () => {
        const response = await requester.post("/sessions/login").send(user);
        const { _body, headers } = response;
        //console.log(_body);
        //console.log(headers);
        token = headers["set-cookie"][0].split(";")[0];
        expect(_body.statusCode).to.be.equals(200);
        //expect(_body.response.email).to.be.equals(user.email);
    });

    it("Crear un producto", async () => {
        const response = await requester.post("/products").send(product).set("Cookie", token);
        const { _body } = response;
        //createdProductId = _body.response._id;
        expect(_body.statusCode).to.be.equals(201);
        expect(_body.response.title).to.be.equals(product.title);
    });

    // 2. Obtener todos los productos
    it("Obtener todos los productos", async () => {
        const response = await requester.get("/products").set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response).to.be.an("array");
    });

    // 3. Obtener un producto por ID
    it("Obtener un producto por ID", async () => {
        const response = await requester.get("/products/" + createdProductId).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.title).to.be.equals(product.title);
    });

    // 4. Actualizar un producto
    it("Actualizar un producto", async () => {
        const response = await requester.put("/products/" + createdProductId).send(updatedProduct).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.title).to.be.equals(updatedProduct.title);
    });

    // 5. Eliminar un producto
    it("Eliminar un producto", async () => {
        const response = await requester.delete("/products/" + createdProductId).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.message).to.be.equals("Product deleted successfully");
    });
});
