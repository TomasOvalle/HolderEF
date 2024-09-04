import assert from "assert";
//import environment from "../../src/utils/env.util.js";
import dao from "../../src/data/dao.factory.js";
const { productsManager } = dao;

//Describir el entorno de testeo
describe(
    "Testeando el recurso PRODUCTS",
    () => {
        const data = { title: "Bleach 17", category: "manga", image: "" }
        let id;
        it(
            "Testeando que la creación de un producto recibe un objeto con la propiedad name",
            () => {
                assert.ok(data.title);
            }
        );
        it(
            "Testeando que la creación de un producto recibe un objeto con la propiedad name y es de tipo string",
            () => {
                assert.strictEqual(typeof data.title, "string");
            }
        );
        it(
            "Testeando que la creación de un producto recibe un objeto con la propiedad category",
            () => {
                assert.ok(data.category);
            }
        );
        it(
            "Testeando que la creación de un producto recibe un objeto con la propiedad category y es de tipo string",
            () => {
                assert.strictEqual(typeof data.category, "string");
            }
        );
        it(
            "Testeando que la creación de un producto recibe un objeto con la propiedad opcional 'image'",
            () => {
                assert.ok(data.image || true);
            }
        );
        it(
            "Testeando que la creacion de una mascota devuelve un objeto _id",
            async () => {
                const response = await productsManager.create(data);
                id = response._id;
                assert.ok(response._id);
            }
        );
        it(
            "Testeando la eliminación de un producto ",
            async () => {
                await productsManager.destroy(id);
                const one = await productsManager.readOne({_id});
                console.log(one);
                assert.strictEqual(one, null);
            }
        );
        it("Testeando la actualización de una mascota", async () => {
            const one = await productsManager.readOne({ _id });
            const response = await productsManager.update(id, { title: "Bleach 18" });
            assert.notEqual(one.name, response.name);
        });
    }
);