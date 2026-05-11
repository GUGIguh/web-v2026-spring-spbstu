import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItem } from '../../store/cartSlice';
import Counter from "../common/Counter";
import ProductPopup from "./ProductPopup";
import { ProductType } from "../../types/goods";
import FavoriteIcon from "../../icons/FavoriteIcon";
import CartIcon from "../../icons/CartIcon";
import ImageContainer from "../common/ImageContainer";

interface ProductCardProps {
    product: ProductType;
    variant?: "catalog" | "carousel"; // catalog — с кнопкой, carousel — без
}

export default function ProductCard({ product, variant = "catalog" }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const quantity = useAppSelector(state => state.cart.items[product.id]?.quantity ?? 0);
    const inCart = quantity > 0;
    const [isOpen, setIsOpen] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(addItem({ id: product.id, name: product.name, price: product.price }));
    };

    return (
        <>
            <div className={`flex flex-col items-start w-[314px] p-5 rounded-2xl group bg-white
                        ${variant === "catalog" ? "cursor-pointer hover:shadow-2xl" : ""}min-h-[440px]`}
                onClick={() => variant === "catalog" && setIsOpen(true)}
            >

                <ImageContainer
                    id={product.id}
                    name={product.name}
                    isNewProd={product.isNewProd}
                    isHit={product.isHit}
                />

                <span className="text-2xl font-medium py-2">{product.price} ₽</span>
                <span className="group-hover:text-blue-def line-clamp-2 break-words">{product.name}</span>
                <span className="flex items-center gap-1 py-2 mt-auto">
                    <FavoriteIcon /> {product.rating}
                </span>

                {variant === "catalog" && (
                    <>
                        {!inCart ? (
                            <button className="btn-primary bg-blue-def text-white" onClick={handleAdd}>
                                <CartIcon /> <span>В корзину</span>
                            </button>
                        ) : (
                            <div className="flex justify-between w-full">
                                <div className="btn-primary bg-pink-def text-white">
                                    <CartIcon />
                                    <span>{quantity} шт.</span>
                                </div>
                                <Counter id={product.id} />
                            </div>
                        )}
                    </>
                )}
            </div>

            {variant === "catalog" && isOpen && (
                <ProductPopup
                    product={product}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}