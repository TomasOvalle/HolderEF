import __dirname from "../../utils.js";

const options = {
    definition : {
        openapi: "3.1.0",
        info: {
            title: "MangaHaven",
            description: "Documentation of MangaHaven API"
        },
    },
    apis: [__dirname+"/src/docs/*.yaml"]
};

export default options;