import swaggerJSDoc from "swagger-jsdoc";

const options= {
    definition: {
        openapi: '3.0.0',
        info:{title: "Product API", version: '1.0.0'},
        servers: [{url: "http://localhost:3001"}]
    },
    apis: ['./routes/*.js']
}

export default swaggerJSDoc(options);