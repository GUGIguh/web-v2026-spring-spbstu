import ProductsContainer from "../components/catalogComponents/ProductsContainer";
import useCheckboxFilter from "../hooks/useCheckboxFilter";
import useSliderFilter from "../hooks/useSliderFilter";
import { useState } from "react";

export default function CatalogPage() {
    const minPrice = 0;
    const maxPrice = 100000;

    const { selectedItems: selectedColors, updateFilter: updateColorFilter, isSelected: isColorSelected, clear: clearColorsFilter } = useCheckboxFilter();
    const { selectedItems: selectedTypes, updateFilter: updateTypeFilter, isSelected: isTypeSelected, clear: clearTypeFilter } = useCheckboxFilter();
    const { price, updatePrice } = useSliderFilter();

    const [appliedColors, setAppliedColors] = useState<string[]>([]);
    const [appliedTypes, setAppliedTypes] = useState<string[]>([]);
    const [appliedPrice, setAppliedPrice] = useState<number[]>([minPrice, maxPrice]);
    const [reset, setReset] = useState(false);

    const handleApply = () => {
        setAppliedColors(selectedColors);
        setAppliedTypes(selectedTypes);
        setAppliedPrice(price);
    };

    const handleClear = () => {
        clearColorsFilter();
        clearTypeFilter();
        updatePrice(minPrice, maxPrice);
        setAppliedColors([]);
        setAppliedTypes([]);
        setAppliedPrice([minPrice, maxPrice]);
        setReset(prev => !prev);
    };

    const productTypes = [
        "Смартфоны",
        "Фитнес браслеты",
        "Портативная акустика",
        "Очки виртуальной реальности",
        "Электротранспорт",
        "Умные часы",
    ];

    const colors = [
        "Красный",
        "Оранжевый",
        "Желтый",
        "Зеленый",
        "Голубой",
        "Синий",
        "Фиолетовый",
    ];

    return (
        <div className="flex justify-center mt-5 w-full h-fit min-h-3/4 ">
            <ProductsContainer
                selectedColors={appliedColors}
                selectedTypes={appliedTypes}
                price={appliedPrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                reset={reset}
                productTypes={productTypes}
                colors={colors}
                tempColors={selectedColors}
                tempTypes={selectedTypes}
                updateColorFilter={updateColorFilter}
                updateTypeFilter={updateTypeFilter}
                isColorSelected={isColorSelected}
                isTypeSelected={isTypeSelected}
                updatePrice={updatePrice}
                onApply={handleApply}
                onClear={handleClear}
            />
        </div>
    );
}