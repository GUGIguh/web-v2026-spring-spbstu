import express, { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// POST /api/login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || username.trim().length < 3) {
            return res.status(400).json({ error: "Имя должно быть не менее 3 символов" });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ error: "Пароль должен быть не менее 6 символов" });
        }

        let user = await User.findOne({ username: username.trim() });

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({ error: "Неверный пароль" });
            }
        } else {
            return res.status(401).json({ error: "Такого пользователя нету" });
        }

        req.session.userId = user._id.toString();

        res.json({
            message: user.isNew ? "Регистрация выполнена" : "Вход выполнен",
            username: user.username,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// POST /api/logout
router.post("/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка при выходе" });
        }
        res.clearCookie("connect.sid");
        res.json({ message: "Вы вышли" });
    });
});

// GET /api/me
router.get("/me", (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Не авторизован" });
    }
    res.json({ userId: req.session.userId });
});

export default router;