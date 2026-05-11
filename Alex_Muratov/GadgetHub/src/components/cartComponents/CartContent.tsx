import { useState } from "react";
import ImageContainer from "../common/ImageContainer";
import Counter from "../common/Counter";
import CloseIcon from "../../icons/CloseIcon";
import CustomCheckbox from "../common/CustomCheckbox";
import useCartSelect from "../../hooks/useCartSelect";
import EmptyCartIcon from "../../icons/EmptyCart";
import { useNavigate } from "react-router-dom";
import OrderForm, { OrderData } from "./OrderForm";
import api from "../../api/api";
import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";

export default function CartContent() {
    const {
        itemsArray, allSelected, selectedIds,
        selectedItems, selectedTotalPrice, selectedTotalQuantity,
        toggleSelect, deleteItem, deleteSelected, selectAll,
    } = useCartSelect();

    const navigate = useNavigate();

    const [orderId,setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ id: number; name: string } | null>(null);

    const handleOrderSubmit = async (formData: OrderData) => {
        if (selectedItems.length === 0) return;
        setLoading(true);
        const order = {
            items: selectedItems.map(item => ({
                goodId: item.id,
                quantity: item.quantity,
            })),
            totalPrice: selectedTotalPrice,
            totalQuantity: selectedTotalQuantity,
            ...formData,
        };
        try {
            const res =  await api.post("/orders", order);

            setOrderId (res.data.orderNumber);
            deleteSelected();
            setOrderSuccess(true);
        } catch (err) {
            console.error("Ошибка оформления заказа:", err);
        } finally {
            setLoading(false);
        }
    };

    if (itemsArray.length === 0) {
        return (
            <div className="flex flex-col items-start gap-3 p-8 w-[440px] h-fit">
                <div className="py-4">
                    <EmptyCartIcon />
                </div>
                <h1 className="font-medium text-3xl">Пока пусто</h1>
                <p className="text-base py-2">
                    Ознакомьтесь с новинками и хитами на главной или найдите нужное в каталоге
                </p>
                <div className="flex gap-3 py-2 text-base whitespace-nowrap">
                    <button onClick={() => navigate("/catalog")} className="btn-primary text-white bg-blue-def">
                        Перейти в каталог
                    </button>
                    <button onClick={() => navigate("/")} className="btn-primary text-blue-def">
                        Главная страница
                    </button>
                </div>

                {orderSuccess && (<SuccessModal myOrderId = {orderId} onClose={() => setOrderSuccess(false)} />)}
            </div>


        );
    }

    return (
        <div className="flex flex-col items-start gap-3">
            <div className="w-[1300px] bg-white rounded-md p-10 mt-5">
                <div className="flex gap-4">
                    <CustomCheckbox label="Выбрать все" checked={allSelected} onChange={selectAll} />
                    {selectedIds.size > 0 && (
                        <button onClick={deleteSelected} className="flex items-center gap-2 text-pink-def ml-4 hover:underline">
                            <CloseIcon />
                            Удалить {selectedIds.size === itemsArray.length ? "все" : selectedIds.size}
                        </button>
                    )}
                </div>

                <div className="flex flex-col w-full">
                    {itemsArray.map(item => (
                        <div key={item.id} className="flex items-center gap-2 h-[220px] py-10 border-b border-gray-200">
                            <CustomCheckbox checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} />
                            <div className="shrink-0">
                                <ImageContainer name={item.name} id={item.id} height="h-[148px]" width="w-[148px]" />
                            </div>
                            <div className="flex gap-32 items-start justify-around w-full h-full mr-6">
                                <div className="flex-1 flex flex-col">
                                    <span>{item.name}</span>
                                </div>
                                <Counter id={item.id} />
                                <span className="font-medium">{item.price * item.quantity} ₽</span>
                                <button className="flex items-center gap-2 text-pink-def px-10" onClick={() => setItemToDelete(item)}>
                                    <CloseIcon />
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}

                    {itemToDelete && (
                        <ConfirmModal
                            title="Удаление товара"
                            message={`Вы действительно хотите удалить «${itemToDelete.name}» из корзины?`}
                            onConfirm={() => deleteItem(itemToDelete.id)}
                            onClose={() => setItemToDelete(null)}
                        />
                    )}
                </div>

                <div className="flex justify-end font-medium mt-4 mr-60 mb-6">
                    {selectedTotalQuantity > 0
                        ? `${selectedTotalQuantity} товара на ${selectedTotalPrice}₽`
                        : "Ни один товар не выбран"}
                </div>
            </div>

            <div className="my-14">
                <h1 className="font-medium text-3xl px-6 pb-6">Оформление заказа</h1>
                <div className="w-[1300px] bg-white rounded-md p-10">
                    <OrderForm
                        itemsArray={itemsArray}
                        totalPrice={selectedTotalPrice}
                        totalQuantity={selectedTotalQuantity}
                        onSubmit={handleOrderSubmit}
                        loading={loading}
                        selectedIds={selectedIds}
                    />
                </div>
            </div>


            {orderSuccess && (<SuccessModal myOrderId = {orderId} onClose={() => setOrderSuccess(false)} />)}
        </div>
    );
}