import CustomCheckbox from "./CustomCheckbox";

interface Props {
    title: string;
    items: string[];
    isSelected: (item: string) => boolean;
    updateFilter: (item: string) => void;
}

export default function Filter({ title, items, isSelected, updateFilter }: Props) {
    return (
        <div className="flex flex-col items-start gap-3">
            <h2 className="font-medium text-xl mb-2">{title}</h2>
            {items.map((item) => (
                <CustomCheckbox
                    key={item}
                    label={item}
                    checked={isSelected(item)}
                    onChange={() => updateFilter(item)}
                />
            ))}
        </div>
    );
}