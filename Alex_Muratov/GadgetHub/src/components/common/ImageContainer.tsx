import Label from "./Label";

interface ProductImageProps {
    id: number;
    name: string;
    isNewProd?: boolean;
    isHit?: boolean;
    padding?: string;
    width?: string;
    height?: string;

}

export default function ImageContainer({id, name, isNewProd, isHit, padding = "p-6", width = "w-full", height = "h-80",}: ProductImageProps) {
    return (
        <div
            className={`relative flex justify-center items-center ${padding} ${width} ${height} rounded-[12px] bg-gray-2`}
        >
            <img
                alt={name}
                src={`./goods/image_${id}.png`}
                className="mix-blend-multiply object-contain w-full h-full"
            />
            <div className="absolute top-0 right-0 flex flex-col items-end gap-2 m-2">
                {isNewProd && <Label text="Новинка" color="bg-green" />}
                {isHit && <Label text="Хит" color="bg-pink-def" />}
            </div>
        </div>
    );
}