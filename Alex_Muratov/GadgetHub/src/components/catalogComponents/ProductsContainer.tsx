import { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import Pagination from "../common/Pagination";
import TabButton from "./TabButton";
import SideBar from "../catalogComponents/SideBar";
import api from "../../api/api";
import { ProductType } from "../../types/goods";

interface PaginatedResponse {
    goods: ProductType[];
    currentPage: number;
    totalPages: number;
    total: number;
}

interface ProductsContainerProps {
    selectedColors: string[];
    selectedTypes: string[];
    price: number[];
    minPrice: number;
    maxPrice: number;
    reset: boolean;
    productTypes: string[];
    colors: string[];
    tempColors: string[];
    tempTypes: string[];
    updateColorFilter: (item: string) => void;
    updateTypeFilter: (item: string) => void;
    isColorSelected: (item: string) => boolean;
    isTypeSelected: (item: string) => boolean;
    updatePrice: (from: number, to: number) => void;
    onApply: () => void;
    onClear: () => void;
}

type SortType = "new" | "popular" | "cheap" | "expensive";

const LIMIT = 9;

const tabs: { name: string; value: SortType }[] = [
    { name: "Новые", value: "new" },
    { name: "Популярные", value: "popular" },
    { name: "Подешевле", value: "cheap" },
    { name: "Подороже", value: "expensive" },
];

export default function ProductsContainer(props: ProductsContainerProps) {
    const { selectedColors, selectedTypes, price, minPrice, maxPrice, reset, productTypes, colors,
        updateColorFilter, updateTypeFilter, isColorSelected, isTypeSelected,
        updatePrice, onApply, onClear } = props;

    const [goods, setGoods] = useState<ProductType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState<SortType>("new");
    const [error, setError] = useState<string>();

    const fetchGoods = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            params.append("page", String(currentPage));
            params.append("limit", String(LIMIT));
            params.append("sort", sort);

            if (selectedColors.length > 0) params.append("colors", selectedColors.join(","));
            if (selectedTypes.length > 0) params.append("types", selectedTypes.join(","));
            params.append("from", String(price[0]));
            params.append("to", String(price[1]));

            const res = await api.get<PaginatedResponse>(`/goods?${params.toString()}`);
            setGoods(res.data.goods);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("Ошибка загрузки товаров:", err);
            setError("Неполадки с сервером");
        }
    }, [currentPage, sort, selectedColors, selectedTypes, price]);

    useEffect(() => {
        fetchGoods();
    }, [fetchGoods]);

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex min-h-[1600px] w-[1350px] box-border gap-10">
            <div className="flex flex-col items-start">
                <div className="flex flex-col gap-5 px-5">
                    <h1 className="font-medium text-3xl">Каталог товара</h1>
                    <div className="flex gap-1 text-blue-def">
                        {tabs.map(({ name, value }) => (
                            <TabButton
                                key={value}
                                name={name}
                                active={sort === value}
                                onClick={() => {
                                    if (value !== sort) {
                                        setSort(value);
                                        setCurrentPage(1);
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex gap-8">
                    <div>
                        <div className="grid grid-cols-3 gap-6 w-[942px]">
                            {goods.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </div>

                    </div>

                    <SideBar
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        reset={reset}
                        productTypes={productTypes}
                        colors={colors}
                        updateColorFilter={updateColorFilter}
                        updateTypeFilter={updateTypeFilter}
                        isColorSelected={isColorSelected}
                        isTypeSelected={isTypeSelected}
                        updatePrice={updatePrice}
                        onApply={onApply}
                        onClear={onClear}
                    />
                </div>


            </div>

        </div>
    );
}