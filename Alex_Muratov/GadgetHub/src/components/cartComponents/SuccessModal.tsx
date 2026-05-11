import useModal from "../../hooks/useModal";
import CloseIcon from "../../icons/CloseIcon";
import CompleteOrderIcon from "../../icons/CompleteOrderIcon";

interface Props {
    onClose: () => void;
    myOrderId: string;
}

export default function SuccessModal({ myOrderId,onClose }: Props) {
    useModal(onClose);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="relative flex flex-col justify-center items-start gap-4 p-10 w-[556px] bg-white rounded-[40px] "
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute text-3xl top-10 right-10 text-gray-400 hover:text-blue-def"
                >
                    <CloseIcon />
                </button>

                <CompleteOrderIcon />
                <h1 className="font-bold text-3xl">Спасибо за заказ!</h1>
                <p className="text-base"> Номер заказа {myOrderId}.</p>
                <p className="text-base">Мы свяжемся с вами в течение 10 минут, чтобы уточнить удобное для вас время доставки</p>
                <div className="flex justify-end w-full">
                    <button className="btn-primary text-white bg-blue-def" onClick={onClose}>
                        Ок
                    </button>
                </div>
            </div>
        </div>
    );
}