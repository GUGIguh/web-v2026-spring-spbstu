interface SegmentedControlProps {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
}

export default function SegmentedControl({ options, selected, onChange }: SegmentedControlProps) {
    return (
        <div className="segmented-control">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onChange(option)}
                    className={`text-2xl px-10 py-4 ${option === selected ? "active" : ""}`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}