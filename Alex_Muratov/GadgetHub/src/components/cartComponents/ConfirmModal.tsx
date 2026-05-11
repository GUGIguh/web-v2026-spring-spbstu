import useModal from "../../hooks/useModal";
import CloseIcon from "../../icons/CloseIcon";

interface ConfirmModalProps {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onClose: () => void;
}

export default function ConfirmModal({
                                         title,
                                         message,
                                         confirmLabel = "Да, Удалить",
                                         cancelLabel = "Отмена",
                                         onConfirm,
                                         onClose,
                                     }: ConfirmModalProps) {
    useModal(onClose);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="absolute bg-white rounded-2xl p-8 max-w-[400px] w-full mx-4 flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >

                <button onClick={onClose} className="relative text-gray-1 top-0 -right-0">
                    <CloseIcon/>
                </button>


                <h3 className="font-bold text-xl">{title}</h3>
                <p className="text-gray-600">{message}</p>
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="btn-primary text-pink-def">
                        {cancelLabel}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="btn-primary bg-blue-def text-white"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}