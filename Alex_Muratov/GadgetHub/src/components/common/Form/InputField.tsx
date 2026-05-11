import { ChangeEvent } from "react";

interface InputFieldProps {
    label: string;
    type?: string;
    value: string;
    placeholder?: string;
    error?: string;
    onChange: (value: string) => void;
    isRequired?: boolean;

}

export default function InputField({ label, type = "text", value, placeholder, error, onChange, isRequired }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="relative text-sm">{label}
                {isRequired &&
                    <div className="absolute -bottom-4 -right-2 text-xl text-pink-def">
                        *
                    </div>
                }
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                className={` h-12 px-4 py-3 bg-gray-2 border rounded-lg text-base focus:outline-blue-dis 
                    ${error ? "border-pink-def" : "border-gray-200"}`}
            />

            {error && <span className="text-pink-def text-xs">{error}</span>}
        </div>
    );
}