import {useState, useEffect} from "react";

interface PriceRangeProps {
    min: number;
    max: number;
    onChange: (from: number, to: number) => void;
    reset: boolean;
}

export default function PriceSlider({ min, max,reset, onChange }: PriceRangeProps) {
    const [from, setFrom] = useState(min);
    const [to, setTo] = useState(max);

    const handleFromChange = (value: number) => {
        if (isNaN(value)) return;
        const clampedFrom = Math.max(min, Math.min(value, to - 1));
        setFrom(clampedFrom);
        onChange(clampedFrom, to);
    };

    const handleToChange = (value: number) => {
        if (isNaN(value)) return;
        const clampedTo = Math.min(max, Math.max(value, from + 1));
        setTo(clampedTo);
        onChange(from, clampedTo);
    };

    useEffect(() => {
        setFrom(min);
        setTo(max);
    },[reset])

   //переводим условные единицы в проценты для рэнжирования на отрезке
    const fromPercent = ((from - min) / (max - min)) * 100;
    const toPercent = ((to - min) / (max - min)) * 100;

    const safeFromPercent = Math.max(0, fromPercent);
    const safeToPercent = Math.min(100, toPercent);
    const widthPercent = safeToPercent - safeFromPercent;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-medium text-xl mb-2">Цена, ₽</h1>
            <div className="flex items-center gap-5">
                <div>
                    <span>От</span>
                    <input
                        type="number"
                        value={from}
                        onChange={(e) => handleFromChange(Number(e.target.value))}
                        className="price-input w-full h-10 px-3 border bg-gray-2 border-none rounded-lg text-xl text-[#B9B9B9]
                                   focus:outline-none focus:border-blue-def"
                        placeholder="От"
                    />
                </div>
                <div>
                    <span>До</span>
                    <input
                        type="number"
                        value={to}
                        onChange={(e) => handleToChange(Number(e.target.value))}
                        className="price-input w-full h-10 px-3 border bg-gray-2 border-none rounded-lg text-xl text-[#B9B9B9]
                                   focus:outline-none focus:border-blue-def"
                        placeholder="До"
                    />
                </div>

            </div>

            <div className="relative h-1 mt-2">
                <div className="absolute w-full h-full rounded-full bg-gray-200" />

                <div
                    className="absolute h-full rounded-full bg-green"
                    style={{
                        left: `${safeFromPercent}%`,
                        width: `${widthPercent}%`,
                    }}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={from}
                    onChange={(e) => handleFromChange(Number(e.target.value))}
                    className="range-slider"

                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={to}
                    onChange={(e) => handleToChange(Number(e.target.value))}
                    className="range-slider"

                />
            </div>


        </div>
    );
}