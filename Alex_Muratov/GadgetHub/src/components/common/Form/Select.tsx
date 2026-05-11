interface SelectProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}

export default function Select({ label, value, options, onChange }: SelectProps) {
    return (
        <div className="flex max-w-[438px] flex-col gap-2">
            <label className="text-sm">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 px-4 py-3 bg-gray-2 border border-gray-200 rounded-lg text-base focus:outline-blue-dis"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}