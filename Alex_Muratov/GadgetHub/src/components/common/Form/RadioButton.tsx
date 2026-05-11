interface RadioButtonProps {
    name: string;
    value: string;
    checked: boolean;
    label: string;
    onChange: (value: string) => void;
}

export default function RadioButton({ name, value, checked, label, onChange }: RadioButtonProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className="hidden"
            />
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                ${checked ? "border-blue-def" : "border-gray-300"}
            `}>
                {checked && <span className="w-2.5 h-2.5 rounded-full bg-blue-def" />}
            </span>
            <span className="text-sm">{label}</span>
        </label>
    );
}