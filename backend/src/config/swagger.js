const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title:
                "Smart Hotel & Traffic Intelligence API",
            version: "1.0.0",
            description:
                "API Documentation for Smart Hotel Platform",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
            },
        ],
    },

    apis: [
        path.join(
            __dirname,
            "../routes/authRoutes.js"
        ),
    ],

};

const specs =
    swaggerJsdoc(options);

console.log("Swagger Paths:");
console.log(specs.paths);
console.log(__dirname);

module.exports = specs;
