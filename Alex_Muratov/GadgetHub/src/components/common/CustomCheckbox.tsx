interface CheckboxProps {
    label?: string;
    checked: boolean;
    onChange: () => void;
}

export default function CustomCheckbox({ label, checked, onChange }: CheckboxProps) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <input
                className="hidden"
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />

            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors border-none
                ${checked
                ? "bg-blue-def border-blue-def"
                : "bg-gray-300 group-hover:border-blue-dis"
            }`}
            >
                {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>

            <span className="text-gray-700 select-none">{label}</span>
        </label>
    );
}