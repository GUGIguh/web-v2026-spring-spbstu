import { ReactNode } from "react";

interface HeaderButtonProps {
    icon: ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
    count?: number;
}

export default function HeaderButton({ icon, label, active, onClick, count }: HeaderButtonProps) {
    return (
        <button onClick={onClick} className={`btn-primary ${active ? "bg-[#F3F6FA]" : ""}`}>
            {icon}
            <span className="flex gap-2">
                {label}
                {
                    (count != null && count > 0) &&
                     <span className="flex justify-center items-center  px-2 rounded-full bg-pink-def text-white"> {count} </span>
                }
            </span>
        </button>
    );
}