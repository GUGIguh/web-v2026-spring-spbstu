import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addItem } from "../../store/cartSlice";
import Counter from "../common/Counter";
import CartIcon from "../../icons/CartIcon";
import CloseIcon from "../../icons/CloseIcon";
import FavoriteIcon from "../../icons/FavoriteIcon";
import ImageContainer from "../common/ImageContainer";
import { ProductType } from "../../types/goods";
import Characteristics, {parseCharacteristics} from "./Characteristic";
import useModal from "../../hooks/useModal";

interface ProductPopupProps {
    product: ProductType;
    onClose: () => void;
}

export default function ProductPopup({ product, onClose }: ProductPopupProps) {
    const dispatch = useAppDispatch();
    const quantity = useAppSelector(state => state.cart.items[product.id]?.quantity ?? 0);

    useModal(onClose);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="relative flex flex-col items-end p-32 rounded-[40px]  max-w-[1300px] max-h-[773px] h-fit bg-white overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-def z-10"
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
                <div className="flex ">
                    <ImageContainer
                        id={product.id}
                        name={product.name}
                        isNewProd={product.isNewProd}
                        isHit={product.isHit}
                        padding="p-10"
                        width="w-[392px]"
                        height="h-fit"
                    />

                    <div className="max-w-[600px] p-4 flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <div className="flex items-center gap-1 text-sm">
                            <FavoriteIcon />
                            <span>{product.rating}</span>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed break-words">{product.description}</p>

                        <div className="text-sm">
                            <span className="font-medium mb-2 block">Характеристики:</span>
                            <Characteristics items={parseCharacteristics(product.characteristics)} />
                        </div>

                    </div>
                </div>
                <div  className="flex flex-col items-end gap-5">
                    <div className="text-2xl font-bold">{product.price} ₽</div>

                    <div className="mt-auto">
                        {quantity === 0 ? (
                            <button className="btn-primary bg-blue-def text-white w-full" onClick={() => dispatch(addItem({ id: product.id, name: product.name, price: product.price }))}>
                                <CartIcon />
                                <span>В корзину</span>
                            </button>
                        ) : (
                            <div className="flex gap-5 items-center">
                                <Counter id={product.id} />
                                <div className="btn-primary bg-pink-def text-white">
                                    <CartIcon />
                                    <span>В корзине {quantity} шт.</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}