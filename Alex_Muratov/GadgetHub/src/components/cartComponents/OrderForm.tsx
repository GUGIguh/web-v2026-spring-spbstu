import { useState, FormEvent } from "react";
import InputField from "../common/Form/InputField";
import RadioButton from "../common/Form/RadioButton";
import Select from "../common/Form/Select";
import CustomCheckbox from "../common/CustomCheckbox";

interface OrderFormProps {
    itemsArray: { id: number; name: string; price: number; quantity: number }[];
    totalPrice: number;
    totalQuantity: number;
    onSubmit: (data: OrderData) => void;
    loading: boolean;
    selectedIds: Set<number>;
}

export interface OrderData {
    phone: string;
    email: string;
    delivery: "pickup" | "delivery";
    address: string;
    payment: string;
    needPack: boolean;
}

interface FormErrors {
    phone?: string;
    email?: string;
    address?: string;
}

export default function OrderForm({ itemsArray, onSubmit, loading, selectedIds }: OrderFormProps) {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("card");
    const [needPack, setNeedPack] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showSelectionError, setShowSelectionError] = useState(false);

    const hasSelectedItems = itemsArray.filter(item => selectedIds.has(item.id)).length > 0;

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!email.trim()) {
            newErrors.email = "Укажите email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = "Некорректный email";
        }

        if (delivery === "delivery" && !address.trim()) {
            newErrors.address = "Укажите адрес доставки";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!hasSelectedItems) {
            setShowSelectionError(true);
            return;
        }

        if (!validate()) return;

        setShowSelectionError(false);
        onSubmit({ phone: phone.trim(), email: email.trim(), delivery, address: address.trim(), payment, needPack });
    };

    const clearError = (field: keyof FormErrors) => {
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const paymentOptions = [
        { value: "card", label: "Банковская карта" },
        { value: "cash", label: "Наличные при получении" },
        { value: "online", label: "Онлайн-оплата" },
    ];

    return (
        <div className="w-fit">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div className="flex gap-4">
                    <InputField
                        label="Телефон"
                        value={phone}
                        onChange={setPhone}
                        isRequired={false}
                    />
                    <InputField
                        label="E-mail"
                        value={email}
                        onChange={(v) => { setEmail(v); clearError("email"); }}
                        isRequired={true}
                        error={errors.email}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-500">Способ получения</span>
                    <div className="flex gap-6">
                        <RadioButton name="delivery" value="pickup" checked={delivery === "pickup"} label="Самовывоз" onChange={(v) => setDelivery(v as "pickup")} />
                        <RadioButton name="delivery" value="delivery" checked={delivery === "delivery"} label="Доставка" onChange={(v) => setDelivery(v as "delivery")} />
                    </div>
                </div>

                {delivery === "delivery" && (
                    <InputField
                        label="Адрес доставки"
                        value={address}
                        onChange={(v) => { setAddress(v); clearError("address"); }}
                        isRequired={true}
                        error={errors.address}
                    />
                )}

                <Select label="Способ оплаты" value={payment} options={paymentOptions} onChange={setPayment} />

                <CustomCheckbox label="Нужна упаковка" checked={needPack} onChange={() => setNeedPack(!needPack)} />

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary text-white bg-blue-def hover:bg-blue-hov disabled:opacity-50 w-fit"
                    >
                        {loading ? "Оформление..." : "Оформить заказ"}
                    </button>

                    {showSelectionError && (
                        <span className="text-pink-def text-sm">
                            Выберите товары для оформления заказа
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}