import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const app = express();

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "My API",
		version: "1.0.0",
		description:
			"Money Manager which helps you to manage your incomes and expenses",
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "Development server",
		},
	],
};

const options = {
	swaggerDefinition,
	apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
