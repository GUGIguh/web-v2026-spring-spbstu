import { useState } from "react";
import SegmentedControl from "../components/cartComponents/SegmentedControl";
import CartContent from "../components/cartComponents/CartContent";
import OrdersHistory from "../components/cartComponents/OrdersHistory";

export default function CartPage() {
    const [cartTab, setCartTab] = useState<string>("Корзина");

    return (
        <div className="relative flex flex-col items-center w-full h-fit min-h-[1000px] bg-gray-2">
            <div className="flex flex-col w-[1300px] mt-5 items-start justify-center">
                <SegmentedControl
                    options={["Корзина", "История заказов"]}
                    selected={cartTab}
                    onChange={setCartTab}
                />

                {cartTab === "Корзина" && <CartContent />}
                {cartTab === "История заказов" && <OrdersHistory />}
            </div>

        </div>
    );
}