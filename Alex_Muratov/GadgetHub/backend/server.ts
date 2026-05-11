import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import goodsRoutes from "./routes/goods.js";
import ordersRoutes from "./routes/orders.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI!,
        }),
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use("/api", authRoutes);
app.use("/api/goods", goodsRoutes);
app.use("/api/orders", ordersRoutes);

mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log("MongoDB подключена");
        app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
    })
    .catch((err) => console.error("Ошибка MongoDB:", err));