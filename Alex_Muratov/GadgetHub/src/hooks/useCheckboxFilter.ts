import {useState} from "react";

interface UseFilterReturn{
    selectedItems: string[];
    updateFilter: (items: string) => void;
    isSelected: (item: string) => boolean;
    clear: () => void;
}

export default function useCheckboxFilter(): UseFilterReturn {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const updateFilter = (item:string) => {
        setSelectedItems((prev) =>
            prev.includes(item)
                ? prev.filter((c) => c !== item)
                : [...prev, item]
        );
    };

    const clear = () =>{
        setSelectedItems([]);
    }

    const isSelected = (item:string) => {return selectedItems.includes(item)};

    return { selectedItems, updateFilter, isSelected, clear };
}