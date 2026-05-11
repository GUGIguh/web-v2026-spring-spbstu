import express, { Request, Response } from "express";
import Good from "../models/Good.js";

const router = express.Router();

const defaultGoods = [
    {
        id: 1,
        name: "Внешний аккумулятор 10000mAh, белый",
        rating: 4.6,
        isHit: false,
        isNewProd: true,
        price: 2490,
        type: "Портативная акустика",
        color: "Белый",
        description: "Внешний аккумулятор ёмкостью 10000 мАч в белом корпусе. Компактный и лёгкий, идеально подходит для зарядки смартфонов и планшетов в дороге.",
        characteristics: "Ёмкость: 10000 мАч; Разъёмы: USB-A, USB-C; Вес: 200 г; Цвет: белый"
    },
    {
        id: 2,
        name: "Внешний аккумулятор 10000mAh, черный",
        rating: 4.5,
        isHit: true,
        isNewProd: false,
        price: 2490,
        type: "Портативная акустика",
        color: "Черный",
        description: "Внешний аккумулятор 10000 мАч в чёрном корпусе. Поддержка быстрой зарядки, два USB-выхода для одновременной зарядки устройств.",
        characteristics: "Ёмкость: 10000 мАч; Разъёмы: 2× USB-A; Вес: 205 г; Цвет: чёрный"
    },
    {
        id: 3,
        name: "Bluetooth гарнитура, черный",
        rating: 4.3,
        isHit: false,
        isNewProd: false,
        price: 1890,
        type: "Портативная акустика",
        color: "Черный",
        description: "Bluetooth-гарнитура с шумоподавлением. Удобная посадка, до 6 часов работы от одного заряда. Подходит для звонков и музыки.",
        characteristics: "Версия Bluetooth: 5.0; Время работы: 6 ч; Радиус действия: 10 м; Цвет: чёрный"
    },
    {
        id: 4,
        name: "Bluetooth гарнитура, серый",
        rating: 4.2,
        isHit: false,
        isNewProd: true,
        price: 1890,
        type: "Портативная акустика",
        color: "Серый",
        description: "Серая Bluetooth-гарнитура с эргономичным дизайном. Лёгкая, влагозащищённая, с магнитным креплением.",
        characteristics: "Версия Bluetooth: 5.0; Время работы: 5 ч; Влагозащита: IPX4; Цвет: серый"
    },
    {
        id: 5,
        name: "Беспроводная акустика",
        rating: 4.8,
        isHit: true,
        isNewProd: false,
        price: 5490,
        type: "Портативная акустика",
        color: null,
        description: "Портативная беспроводная колонка с мощным звуком и глубокими басами. Водонепроницаемый корпус, до 12 часов работы.",
        characteristics: "Мощность: 20 Вт; Версия Bluetooth: 5.2; Время работы: 12 ч; Защита: IPX7; Вес: 540 г"
    },
    {
        id: 6,
        name: "Смартфон 256 ГБ фиолетовый",
        rating: 4.9,
        isHit: true,
        isNewProd: true,
        price: 89990,
        type: "Смартфоны",
        color: "Фиолетовый",
        description: "Флагманский смартфон с 6.7-дюймовым AMOLED-дисплеем, процессором Snapdragon 8 Gen 2 и тройной камерой 108 Мп.",
        characteristics: "Экран: 6.7\" AMOLED 120 Гц; Процессор: Snapdragon 8 Gen 2; Память: 12/256 ГБ; Камера: 108+12+10 Мп; Аккумулятор: 5000 мАч"
    },
    {
        id: 7,
        name: "Смартфон 256 ГБ черный",
        rating: 4.8,
        isHit: false,
        isNewProd: false,
        price: 87990,
        type: "Смартфоны",
        color: "Черный",
        description: "Производительный смартфон с мощным процессором, отличной камерой и ёмким аккумулятором. Чёрный матовый корпус.",
        characteristics: "Экран: 6.5\" OLED 120 Гц; Процессор: Snapdragon 8+ Gen 1; Память: 8/256 ГБ; Камера: 50+12+10 Мп; Аккумулятор: 4800 мАч"
    },
    {
        id: 8,
        name: "Смартфон 256 ГБ белый",
        rating: 4.8,
        isHit: false,
        isNewProd: false,
        price: 87990,
        type: "Смартфоны",
        color: "Белый",
        description: "Элегантный белый смартфон с топовыми характеристиками. Идеальный баланс производительности и стиля.",
        characteristics: "Экран: 6.5\" OLED 120 Гц; Процессор: Snapdragon 8+ Gen 1; Память: 8/256 ГБ; Камера: 50+12+10 Мп; Аккумулятор: 4800 мАч"
    },
    {
        id: 9,
        name: "Часы с GPS трекером черные",
        rating: 4.4,
        isHit: false,
        isNewProd: false,
        price: 12990,
        type: "Умные часы",
        color: "Черный",
        description: "Умные часы со встроенным GPS, пульсометром и AMOLED-экраном. Отслеживание тренировок и уведомления со смартфона.",
        characteristics: "Экран: 1.4\" AMOLED; Пульсометр: встроенный; Водозащита: 5 АТМ; Время работы: 14 дней"
    },
    {
        id: 10,
        name: "Часы с GPS трекером синие",
        rating: 4.5,
        isHit: true,
        isNewProd: false,
        price: 12990,
        type: "Умные часы",
        color: "Синий",
        description: "Стильные синие часы с GPS и расширенным набором спортивных режимов. Лёгкий корпус из алюминия.",
        characteristics: "Экран: 1.4\" AMOLED; Пульсометр: встроенный; Водозащита: 5 АТМ; Время работы: 14 дней"
    },
    {
        id: 11,
        name: "Фитнес-браслет ASK-B19 зеленый",
        rating: 4.2,
        isHit: false,
        isNewProd: true,
        price: 3990,
        type: "Фитнес браслеты",
        color: "Зеленый",
        description: "Фитнес-браслет с цветным дисплеем и мониторингом сна, шагов, калорий. Влагозащита IP68, до 7 дней без подзарядки.",
        characteristics: "Экран: 1.1\" TFT; Пульсометр: встроенный; Защита: IP68; Время работы: 7 дней"
    },
    {
        id: 12,
        name: "Фитнес-браслет ASK-B19 черный",
        rating: 4.3,
        isHit: false,
        isNewProd: false,
        price: 3990,
        type: "Фитнес браслеты",
        color: "Черный",
        description: "Чёрный фитнес-браслет с базовыми функциями отслеживания активности. Удобный силиконовый ремешок.",
        characteristics: "Экран: 1.1\" TFT; Пульсометр: встроенный; Защита: IP68; Время работы: 7 дней"
    },
    {
        id: 13,
        name: "Наушники белые",
        rating: 4.1,
        isHit: false,
        isNewProd: true,
        price: 2990,
        type: "Портативная акустика",
        color: "Белый",
        description: "Беспроводные TWS-наушники в белом цвете. Компактный кейс с быстрой зарядкой, сенсорное управление.",
        characteristics: "Версия Bluetooth: 5.3; Время работы: 5 ч (+20 ч кейс); Защита: IPX5; Управление: сенсорное"
    },
    {
        id: 14,
        name: "Наушники синие",
        rating: 4.0,
        isHit: false,
        isNewProd: false,
        price: 2990,
        type: "Портативная акустика",
        color: "Синий",
        description: "Синие TWS-наушники с чистым звуком и удобной посадкой. Подходят для спорта и повседневного использования.",
        characteristics: "Версия Bluetooth: 5.3; Время работы: 4.5 ч (+18 ч кейс); Защита: IPX5; Управление: сенсорное"
    },
    {
        id: 15,
        name: "Наушники черные",
        rating: 4.2,
        isHit: true,
        isNewProd: false,
        price: 2990,
        type: "Портативная акустика",
        color: "Черный",
        description: "Чёрные TWS-наушники с активным шумоподавлением и прозрачным режимом. Глубокий бас.",
        characteristics: "Версия Bluetooth: 5.3; Шумоподавление: активное; Время работы: 4 ч (+16 ч кейс); Защита: IPX4"
    },
    {
        id: 16,
        name: "Видеокамера для блогера",
        rating: 4.7,
        isHit: true,
        isNewProd: false,
        price: 34990,
        type: "Электротранспорт",
        color: null,
        description: "Компактная 4K-видеокамера с оптической стабилизацией и откидным экраном. Идеальна для видеоблогов и съёмки на ходу.",
        characteristics: "Разрешение: 4K 60fps; Стабилизация: оптическая; Экран: 3\" поворотный; Память: microSD до 512 ГБ; Вес: 400 г"
    },
    {
        id: 17,
        name: "Микрофон с разъемом Type-C",
        rating: 4.5,
        isHit: false,
        isNewProd: true,
        price: 5990,
        type: "Портативная акустика",
        color: null,
        description: "Петличный микрофон с разъёмом Type-C для смартфонов и планшетов. Чистый звук, фильтрация шумов.",
        characteristics: "Тип: конденсаторный; Подключение: Type-C; Длина кабеля: 1.5 м; Частотный диапазон: 20 Гц – 20 кГц"
    },
    {
        id: 18,
        name: "Чехол-подвеска силиконовый с карабином, красный",
        rating: 3.9,
        isHit: false,
        isNewProd: false,
        price: 990,
        type: null,
        color: "Красный",
        description: "Силиконовый чехол-подвеска с карабином для ключей или брелоков. Яркий красный цвет, прочный материал.",
        characteristics: "Материал: силикон; Цвет: красный; Крепление: карабин; Размеры: 80×40 мм"
    },
    {
        id: 19,
        name: "Чехол-подвеска силиконовый с карабином, белый",
        rating: 4.0,
        isHit: false,
        isNewProd: false,
        price: 990,
        type: null,
        color: "Белый",
        description: "Белый силиконовый чехол-подвеска. Надёжный карабин, мягкий на ощупь материал.",
        characteristics: "Материал: силикон; Цвет: белый; Крепление: карабин; Размеры: 80×40 мм"
    },
    {
        id: 20,
        name: "Чехол-подвеска силиконовый с карабином, серый",
        rating: 4.0,
        isHit: false,
        isNewProd: false,
        price: 990,
        type: null,
        color: "Серый",
        description: "Серый силиконовый чехол-подвеска. Практичный и стильный аксессуар для ключей.",
        characteristics: "Материал: силикон; Цвет: серый; Крепление: карабин; Размеры: 80×40 мм"
    },
    {
        id: 21,
        name: "Чехол-подвеска силиконовый с карабином, желтый",
        rating: 4.1,
        isHit: true,
        isNewProd: true,
        price: 990,
        type: null,
        color: "Желтый",
        description: "Жёлтый силиконовый чехол-подвеска. Поднимает настроение и легко находится в сумке.",
        characteristics: "Материал: силикон; Цвет: жёлтый; Крепление: карабин; Размеры: 80×40 мм"
    },
    {
        id: 22,
        name: "Беспроводная акустика, серый",
        rating: 4.6,
        isHit: false,
        isNewProd: false,
        price: 5990,
        type: "Портативная акустика",
        color: "Серый",
        description: "Портативная колонка в сером цвете с объёмным звуком 360°. Защита от брызг, идеальна для пикника.",
        characteristics: "Мощность: 15 Вт; Версия Bluetooth: 5.1; Время работы: 10 ч; Защита: IPX5; Вес: 620 г"
    },
    {
        id: 23,
        name: "Беспроводная акустика, голубой",
        rating: 4.7,
        isHit: true,
        isNewProd: true,
        price: 5990,
        type: "Портативная акустика",
        color: "Голубой",
        description: "Яркая голубая колонка с мощным басом и встроенным микрофоном для звонков.",
        characteristics: "Мощность: 20 Вт; Версия Bluetooth: 5.2; Время работы: 12 ч; Защита: IPX6; Вес: 580 г"
    },
    {
        id: 24,
        name: "Беспроводная акустика, бежевый",
        rating: 4.6,
        isHit: false,
        isNewProd: false,
        price: 5990,
        type: "Портативная акустика",
        color: null,
        description: "Стильная бежевая колонка с мягким звучанием. Идеально впишется в интерьер.",
        characteristics: "Мощность: 18 Вт; Версия Bluetooth: 5.0; Время работы: 8 ч; Защита: IPX4; Вес: 550 г"
    },
    {
        id: 25,
        name: "Умная лампа",
        rating: 4.3,
        isHit: false,
        isNewProd: true,
        price: 3490,
        type: null,
        color: null,
        description: "Умная светодиодная лампа с голосовым управлением. 16 миллионов цветов, настройка яркости.",
        characteristics: "Мощность: 9 Вт; Цоколь: E27; Wi-Fi: 2.4 ГГц; Голосовые ассистенты: Алиса, Google Assistant"
    },
    {
        id: 26,
        name: "Аппаратный ключ аутентификации NFC",
        rating: 4.7,
        isHit: false,
        isNewProd: false,
        price: 3990,
        type: null,
        color: null,
        description: "Аппаратный ключ безопасности с поддержкой NFC и USB-A. Двухфакторная аутентификация для защиты аккаунтов.",
        characteristics: "Интерфейсы: USB-A, NFC; Протоколы: FIDO2, U2F; Совместимость: Windows, macOS, Android, iOS"
    },
    {
        id: 27,
        name: "Аппаратный криптокошелек",
        rating: 4.8,
        isHit: true,
        isNewProd: true,
        price: 12990,
        type: null,
        color: null,
        description: "Аппаратный криптокошелёк с цветным сенсорным экраном. Хранение приватных ключей в изолированной среде.",
        characteristics: "Экран: 2.8\" сенсорный; Поддержка: Bitcoin, Ethereum, ERC-20; Подключение: USB-C, Bluetooth"
    },
    {
        id: 28,
        name: 'Очки виртуальной реальности, смартфоны до 6,5"',
        rating: 4.2,
        isHit: false,
        isNewProd: false,
        price: 7990,
        type: "Очки виртуальной реальности",
        color: null,
        description: "VR-очки для смартфонов с диагональю до 6.5 дюймов. Регулируемые линзы, мягкая обивка для комфорта.",
        characteristics: "Совместимость: Android/iOS; Линзы: асферические 40 мм; Регулировка: IPD; Вес: 360 г"
    },
    {
        id: 29,
        name: "Шлем виртуальной реальности 128GB",
        rating: 4.9,
        isHit: true,
        isNewProd: true,
        price: 49990,
        type: "Очки виртуальной реальности",
        color: null,
        description: "Автономный VR-шлем с разрешением 4K и процессором XR2. Встроенная память 128 ГБ, удобные контроллеры.",
        characteristics: "Экран: 3664×1920 (4K); Процессор: Snapdragon XR2; Память: 6/128 ГБ; Контроллеры: в комплекте"
    },
    {
        id: 30,
        name: "Умный чемодан-скутер серый",
        rating: 4.4,
        isHit: false,
        isNewProd: false,
        price: 24990,
        type: "Электротранспорт",
        color: "Серый",
        description: "Умный чемодан на колёсах, который превращается в электроскутер. Максимальная скорость 10 км/ч, запас хода 8 км.",
        characteristics: "Максимальная скорость: 10 км/ч; Запас хода: 8 км; Аккумулятор: 2000 мАч; Вес: 6.5 кг"
    },
    {
        id: 31,
        name: "Умный чемодан-скутер черный",
        rating: 4.5,
        isHit: true,
        isNewProd: false,
        price: 24990,
        type: "Электротранспорт",
        color: "Черный",
        description: "Чёрный умный чемодан-скутер с усиленной рамой и возможностью перевозки до 120 кг.",
        characteristics: "Максимальная скорость: 10 км/ч; Запас хода: 8 км; Аккумулятор: 2500 мАч; Вес: 7 кг"
    },
    {
        id: 32,
        name: "Дыхательный тренажер",
        rating: 4.3,
        isHit: false,
        isNewProd: true,
        price: 5490,
        type: null,
        color: null,
        description: "Дыхательный тренажёр для тренировки лёгких. Регулируемое сопротивление, подходит для спортсменов и восстановления.",
        characteristics: "Материал: медицинский пластик; Уровней сопротивления: 5; Вес: 120 г"
    }
];

// GET /api/goods
router.get("/", async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 9;
        const sort = (req.query.sort as string) || "new";
        const colors = (req.query.colors as string)?.split(",") || [];
        const types = (req.query.types as string)?.split(",") || [];
        const from = parseInt(req.query.from as string) || 0;
        const to = parseInt(req.query.to as string) || 999999;

        const count = await Good.countDocuments();
        if (count === 0) {
            await Good.insertMany(defaultGoods);
        }

        const conditions: any[] = [];

        conditions.push({ price: { $gte: from, $lte: to } });

        if (colors.length > 0) {
            conditions.push({
                $or: colors.flatMap((color) => [
                    { color: color },
                    { name: { $regex: color, $options: "i" } },
                ]),
            });
        }

        if (types.length > 0) {
            conditions.push({
                $or: types.flatMap((type) => [
                    { type: type },
                    { name: { $regex: type, $options: "i" } },
                ]),
            });
        }

        const filter = conditions.length > 0 ? { $and: conditions } : {};

        let sortQuery: any;
        switch (sort) {
            case "new":       sortQuery = { isNewProd: -1, id: -1 }; break;
            case "popular":   sortQuery = { isHit: -1,id: -1 }; break;
            case "cheap":     sortQuery = { price: 1 }; break;
            case "expensive": sortQuery = { price: -1 }; break;
            default:          sortQuery = { id: 1 };
        }

        const total = await Good.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const skip = (page - 1) * limit;

        const goods = await Good.find(filter)
            .sort(sortQuery)
            .skip(skip)
            .limit(limit)
            .lean();

        res.json({
            goods,
            currentPage: page,
            totalPages,
            total,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

export default router;