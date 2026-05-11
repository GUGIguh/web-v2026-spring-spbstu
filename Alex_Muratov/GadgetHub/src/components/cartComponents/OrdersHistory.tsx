import { useEffect, useState } from "react";
import api from "../../api/api";
import {pluralize} from "../../utils/getWordForm";

interface OrderItem {
    goodId: number;
    quantity: number;
    _id: string;
}

interface Order {
    _id: string;
    items: OrderItem[];
    itemsPrice: number;
    itemsQuantity: number;
    createdAt: string;
    orderNumber: string;
}

export default function OrdersHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/orders");
                setOrders(res.data);
            } catch (err) {
                console.error("Ошибка загрузки заказов:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <div className="p-8 text-gray-500">Загрузка...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="p-8">
                <h1 className="font-medium text-3xl mb-4">История заказов</h1>
                <p className="text-gray-500">У вас пока нет заказов.</p>
            </div>
        );
    }

    return (
        <div className="p-8 w-full">
            <h1 className="font-medium text-3xl mb-6">История заказов</h1>
            <div className="flex flex-col bg-white px-4 rounded-md">
                {orders.map((order,index) => (
                    <div key={order._id} className={` ${index !== orders.length - 1 ? "border-b border-gray-200" : ""}
                                       flex justify-center border-b-1 border-gray-1 py-5 mx-5 text-base whitespace-nowrap text-black`}>
                        <div className="w-[300px] mr-auto">
                            № {order.orderNumber} от {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                        </div>
                        <div className="w-[200px] mr-auto">
                             {order.itemsQuantity + pluralize(order.itemsQuantity)}
                        </div>
                        <div className="w-[200px] mr-auto">
                            {order.itemsPrice} ₽
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}