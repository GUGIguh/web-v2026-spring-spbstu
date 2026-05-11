import express, { Request, Response, NextFunction } from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Middleware авторизации
function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Не авторизован" });
    }
    next();
}

router.use(requireAuth);

// GET /api/orders
router.get("/", async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ userId: req.session.userId })
            .sort({ createdAt: -1 })
            .lean();
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// POST /api/orders
router.post("/", async (req: Request, res: Response) => {
    try {
        const { items,totalPrice,totalQuantity } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Список товаров пуст" });
        }

        const isValid = items.every(
            (item: any) =>
                typeof item.goodId === "number" &&
                typeof item.quantity === "number" &&
                item.quantity > 0
        );

        if (!isValid) {
            return res.status(400).json({
                error: "Каждый товар должен содержать goodId (number) и quantity (number > 0)",
            });
        }

        const orderNumber = Math.floor(10000000 + Math.random() * 90000000).toString();

        const order = await Order.create({
            userId: req.session.userId,
            items,
            itemsQuantity: totalQuantity,
            itemsPrice: totalPrice,
            orderNumber
        });

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при создании заказа" });
    }
});

export default router;