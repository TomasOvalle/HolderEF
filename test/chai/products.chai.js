import chai from "chai";
const { expect } = chai;
//import environment from "../../src/utils/env.util.js";
import dao from "../../src/data/dao.factory.js";
const { productsManager } = dao;

describe("Testeando el recurso Products", () => {
    const data = { title: "Bleach 17", category: "manga" };
  let id;
  it("Testeando que la creación de un producto recibe un objeto con la propiedad 'name'", () => {
    expect(data).to.have.property("title");
  });
  it("Testeando que la creación de un producto recibe un objeto con la propiedad 'name' de tipo string", () => {
    expect(data.name).to.be.a("string");
  });
  it("Testeando que la creación de un producto recibe un objeto con la propiedad 'specie'", () => {
    expect(data).to.have.property("category");
  });
  it("Testeando que la creación de un producto recibe un objeto con la propiedad 'specie' de tipo string", () => {
    expect(data.specie).to.be.a("string");
  });
  /* it("Testeando que la creación de una mascota recibe un objeto con la propiedad opcional 'image'", () => {
    expect(data).to.have.property("image").that.exists;
  }); */
  it("Testeando que la creación de un producto devuelve un objeto con un _id", async () => {
    const response = await productsManager.create(data);
    id = response._id;
    expect(response).to.have.property("_id");
  });
  it("Testeando la actualización de un producto", async () => {
    const one = await productsManager.readOne({ _id: id });
    const response = await productsManager.update(id, { title: "Bleach 18" });
    expect(one.title).is.not.equal(response.title);
  });
  it("Testeando la eliminacion de un producto", async () => {
    await productsManager.destroy(id);
    const one = await productsManager.readOne({ _id: id });
    expect(one).not.exist;
  });
});