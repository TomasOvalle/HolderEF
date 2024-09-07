import { expect } from "chai";
import supertest from "supertest";
import productsRepository from "../../src/repositories/products.rep.js"; // Asegúrate de tener acceso al repositorio de productos

const requester = supertest("http://localhost:8080/api");

describe("Testeando MangaHaven API - Carrito", function () {
    this.timeout(20000);

    let token = "";
    let createdCartId = "";
    let createdProductId = "";
    
    const user = {
        email: "batik@coder.com",
        password: "hola1234",
        role: 1,
        verify: true
    };

    const product = {
        title: "Attack on Titan 01",
        price: 12990,
        stock: 10
    };

    before(async () => {
        // Registro y login de usuario antes de iniciar los tests
        await requester.post("/sessions/register").send(user);
        const loginResponse = await requester.post("/sessions/login").send(user);
        token = loginResponse.headers["set-cookie"][0].split(";")[0];

        // Crear un producto antes de empezar los tests
        const productResponse = await requester.post("/products").send(product).set("Cookie", token);
        createdProductId = productResponse._body.response._id;
    });

    after(async () => {
        // Limpiar: eliminar producto después de las pruebas
        await requester.delete(`/products/${createdProductId}`).set("Cookie", token);
    });

    const cartItem = {
        products: [
            {
                productId: createdProductId,
                quantity: 2,
            },
        ],
    };

    it("Agregar productos al carrito", async () => {
        const response = await requester.post("/carts").send(cartItem).set("Cookie", token);
        const { _body } = response;
        createdCartId = _body.response._id;
        expect(_body.statusCode).to.be.equals(201);
        expect(_body.response.products).to.be.an("array").that.is.not.empty;
    });

    it("Obtener un carrito por ID", async () => {
        const response = await requester.get(`/carts/${createdCartId}`).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.products).to.be.an("array").that.is.not.empty;
    });

    it("Actualizar el carrito (modificar la cantidad de productos)", async () => {
        const updatedCartItem = {
            products: [
                {
                    productId: createdProductId,
                    quantity: 3, // Cambiamos la cantidad a 3
                },
            ],
        };
        const response = await requester.put(`/carts/${createdCartId}`).send(updatedCartItem).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.products[0].quantity).to.be.equals(3); // Verificamos que se haya actualizado la cantidad
    });

    it("Eliminar un producto del carrito", async () => {
        const response = await requester.delete(`/carts/${createdCartId}/products/${createdProductId}`).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.products).to.be.an("array").that.is.empty;
    });

    it("Eliminar el carrito completo", async () => {
        const response = await requester.delete(`/carts/${createdCartId}`).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
    });
});
