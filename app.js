import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Using Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Import Routes
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

export default app;
