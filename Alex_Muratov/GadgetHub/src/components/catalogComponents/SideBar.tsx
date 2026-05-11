import PriceSlider from "../common/PriceSlider";
import Filter from "../common/Filter";

interface SideBarProps {
    minPrice: number;
    maxPrice: number;
    reset: boolean;
    productTypes: string[];
    colors: string[];
    updateColorFilter: (item: string) => void;
    updateTypeFilter: (item: string) => void;
    isColorSelected: (item: string) => boolean;
    isTypeSelected: (item: string) => boolean;
    updatePrice: (from: number, to: number) => void;
    onApply: () => void;
    onClear: () => void;
}

export default function SideBar({
                                    minPrice, maxPrice, reset, productTypes,colors, updateColorFilter,updateTypeFilter,
                                    isColorSelected, isTypeSelected, updatePrice, onApply, onClear,
                                }: SideBarProps) {
    return (
        <div className="flex flex-col w-80 mt-4 gap-5">
            <PriceSlider max={maxPrice} min={minPrice} reset={reset} onChange={updatePrice} />
            <Filter title="Тип товара" items={productTypes} updateFilter={updateTypeFilter} isSelected={isTypeSelected} />
            <Filter title="Цвет" items={colors} updateFilter={updateColorFilter} isSelected={isColorSelected} />
            <div className="flex items-center gap-3 mt-4">
                <button onClick={onApply} className="btn-primary hover:bg-blue-hov bg-blue-def text-white">
                    Применить
                </button>
                <button onClick={onClear} className="btn-primary hover:text-pink-hov text-pink-def">
                    Сбросить
                </button>
            </div>
        </div>
    );
}