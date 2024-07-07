import express from "express";

import authRouter from "./routes/auth.js";
import { defaultHeaders } from "./util/defaultHeaders.js";
import connectDB from "./connectors/database.js";
import errorHandler from "./util/errorHandler.js";

const app = express();

app.use(defaultHeaders);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);

connectDB();
app.use(errorHandler);

export default app;
