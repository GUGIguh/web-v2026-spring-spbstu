import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { increaseQuantity, decreaseQuantity } from "../../store/cartSlice";
import AddIcon from "../../icons/AddIcons";
import RemoveIcon from "../../icons/RemoveIcon";

interface CounterProps {
    id: number;
}

export default function Counter({ id }: CounterProps) {
    const dispatch = useAppDispatch();
    const goodsQuantity = useAppSelector(state => state.cart.items[id]?.quantity ?? 0);

    const handleIncrease = (e:React.MouseEvent) => {
        e.stopPropagation()
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (e:React.MouseEvent) => {
        e.stopPropagation()
        dispatch(decreaseQuantity(id));
    };

    return (
        <div className="flex w-[130px] justify-between">
            <div className="flex items-center gap-5">
                <button className="counter-box" onClick={handleDecrease}>
                    <RemoveIcon />
                </button>

                <span>{goodsQuantity}</span>

                <button className="counter-box" onClick={handleIncrease}>
                    <AddIcon />
                </button>
            </div>
        </div>
    );
}