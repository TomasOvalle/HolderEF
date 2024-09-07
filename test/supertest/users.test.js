import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080/api");

describe("Testeando MangaHaven API - Usuarios", function() {
    this.timeout(20000);

    let token = "";
    let createdUserId = "";

    const user = {
        email: "tomas@coder.com",
        password: "hola1234",
        role: 1,
        verify: true
    };

    const updatedUser = {
        email: "tomas@gmail.com",
        role: 2
    };


    //1. Registro de un usuario
    it("Registro de usuario", async () => {
        const response = await requester.post("/sessions/register").send(user);
        const { _body } = response;
        createdUserId = _body.response._id;
        expect(_body.statusCode).to.be.equals(201);
    });

    // 2. Iniciar sesión
    it("Inicio de sesión de un usuario", async () => {
        const response = await requester.post("/sessions/login").send(user);
        const { _body, headers } = response;
        token = headers["set-cookie"][0].split(";")[0];
        expect(_body.statusCode).to.be.equals(200);
    });

    // 3. Obtener todos los usuarios (Solo admin)
    it("Obtener todos los usuarios", async () => {
        const response = await requester.get("/users").set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response).to.be.an("array");
    });

    // 4. Obtener usuario por ID
    it("Obtener un usuario por ID", async () => {
        const response = await requester.get("/users/" + createdUserId).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.email).to.be.equals(user.email);
    });

    // 5. Actualizar un usuario
    it("Actualizar un usuario", async () => {
        const response = await requester.put("/users/" + createdUserId).send(updatedUser).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.response.email).to.be.equals(updatedUser.email);
    });

    // 6. Eliminar un usuario
    it("Eliminar un usuario", async () => {
        const response = await requester.delete("/users/" + createdUserId).set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
        expect(_body.message).to.be.equals("User deleted successfully");
    });
});