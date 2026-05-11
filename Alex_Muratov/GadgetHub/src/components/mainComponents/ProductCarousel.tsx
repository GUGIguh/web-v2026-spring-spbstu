import { useRef, ReactNode } from "react";
import ProductCard from "../catalogComponents/ProductCard";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import RightArrowIcon from "../../icons/RightArrowIcon";
import { ProductType } from "../../types/goods";

interface ProductCarouselProps {
    products: ProductType[];
    icon: ReactNode;
    title: string;
    description: string;
}

export default function ProductCarousel({ products, icon, title, description }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const cardWidth = 314 + 16;

        if (direction === "left") {
            if (container.scrollLeft <= 0) {
                container.scrollTo({ left: container.scrollWidth / 3, behavior: "instant" });
                setTimeout(() => container.scrollBy({ left: -cardWidth, behavior: "smooth" }), 10);
            } else {
                container.scrollBy({ left: -cardWidth, behavior: "smooth" });
            }
        } else {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                container.scrollTo({ left: container.scrollWidth / 3, behavior: "instant" });
                setTimeout(() => container.scrollBy({ left: cardWidth, behavior: "smooth" }), 10);
            } else {
                container.scrollBy({ left: cardWidth, behavior: "smooth" });
            }
        }
    };

    if (products.length === 0) return null;

    const loopedProducts = [...products, ...products, ...products];

    return (
        <div className="flex justify-center w-full gap-8">
            <div className="w-[200px] pt-12 flex flex-col gap-3 flex-shrink-0">
                {icon}
                <h2 className="font-medium text-2xl">{title}</h2>
                <p className="text-gray-500 text-sm">{description}</p>
            </div>

            <div className="relative w-[1000px]">
                <button
                    onClick={() => scroll("left")}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center w-10 h-10 text-blue-def hover:cursor-pointer hover:bg-gray-2 hover:rounded-full"
                >
                    <LeftArrowIcon />
                </button>

                <div ref={scrollRef} className="w-[1000px] flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8">
                    {loopedProducts.map((product, index) => (
                        <div key={`${product.id}-${index}`} className="shrink-0 w-[314px]">
                            <ProductCard product={product} variant="carousel" />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center w-10 h-10 text-blue-def hover:cursor-pointer hover:bg-gray-2 hover:rounded-full"
                >
                    <RightArrowIcon />
                </button>
            </div>
        </div>
    );
}