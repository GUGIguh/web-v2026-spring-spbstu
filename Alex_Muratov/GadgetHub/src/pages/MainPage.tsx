import SitePerksCard from "../components/mainComponents/SitePerksCard";
import DeliveryIcon from "../icons/DeliveryIcon";
import RefundIcon from "../icons/RefundIcon";
import OriginalIcon from "../icons/OriginalIcon";
import MobileIcon from "../icons/MobileIcon";
import LetterIcon from "../icons/LetterIcon";
import AddressIcon from "../icons/AdressIcon";
import ContactsCard from "../components/mainComponents/ContactsCard";
import { useEffect, useState } from "react";
import { ProductType } from "../types/goods";
import api from "../api/api";
import ProductCarousel from "../components/mainComponents/ProductCarousel";
import HitIcon from "../icons/HitIcon";
import NewIcon from "../icons/NewIcon";

export default function MainPage() {
    const sitePerks = [
        { icon: DeliveryIcon, text: "Утром заказали, вечером получили" },
        { icon: RefundIcon, text: "С товаром что-то не так? Вернем деньги" },
        { icon: OriginalIcon, text: "Только оригинальные товары" },
    ];

    const siteContacts = [
        { icon: MobileIcon, text: "8 (800) 678-34-24" },
        { icon: LetterIcon, text: "gadget@hub.ru" },
        { icon: AddressIcon, text: "Санкт-Петербург, ул. Барочная, д.7, корпус 2" },
    ];

    const [hits, setHits] = useState<ProductType[]>([]);
    const [newProducts, setNewProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/goods?limit=20");
                const allGoods: ProductType[] = res.data.goods;
                setHits(allGoods.filter(p => p.isHit));
                setNewProducts(allGoods.filter(p => p.isNewProd));
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <div className="flex justify-center w-full h-full bg-white">
            <div className="flex flex-col items-center gap-20 w-[1300px] min-h-[2300px]">
                <img className="w-full h-fit" alt="Умный робот-друг Red solution Reddy Air по скидке 27990 ₽" src="/banners/saleBanner.png" />

                <ProductCarousel
                    icon={<HitIcon />}
                    title="Хиты продаж"
                    description="Тысячи покупателей уже одобрили эти товары. Самые популярные, проверенные и надежные гаджеты!"
                    products={hits}
                />

                <ProductCarousel
                    icon={<NewIcon />}
                    title="Новинки"
                    description="Их только произвели - они уже у нас! Все самое новое и свежее на рынке электроники"
                    products={newProducts}
                />

                <div className="flex flex-col gap-10">
                    <h1 className="font-medium text-3xl">Преимущества</h1>
                    <div className="flex gap-8">
                        {sitePerks.map((perk) => (
                            <SitePerksCard key={perk.text} Icon={perk.icon} text={perk.text} />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-10 mb-36">
                    <h1 className="font-medium text-3xl">Работаем 24/7</h1>
                    <div className="flex gap-8">
                        {siteContacts.map((contact) => (
                            <ContactsCard key={contact.text} Icon={contact.icon} text={contact.text} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}