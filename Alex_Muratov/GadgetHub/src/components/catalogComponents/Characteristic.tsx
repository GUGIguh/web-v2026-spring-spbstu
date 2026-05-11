interface Characteristic {
    label: string;
    value: string;
}

interface CharacteristicsProps {
    items: Characteristic[];
}

export function parseCharacteristics(str: string): Characteristic[] {
    return str.split(";").map(item => {
        const [label, ...rest] = item.split(":");
        return {
            label: label.trim(),
            value: rest.join(":").trim(),
        };
    });
}

export default function Characteristics({ items }: CharacteristicsProps) {
    return (
        <div className="flex flex-col gap-1">
            {items.map((item, index) => (
                <div key={index} className="flex gap-2 text-sm">
                    <span className=" whitespace-nowrap">{item.label}</span>
                    <span className="flex-1 border-b border-solid border-gray-300" />
                    <span className=" whitespace-nowrap">{item.value}</span>
                </div>
            ))}
        </div>
    );
}