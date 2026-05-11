interface TabButtonProps {
    name: string;
    active: boolean;
    onClick: () => void;
}

export default function TabButton({ name, active, onClick }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`relative py-2 px-3 font-medium transition-colors rounded-lg
                       hover:bg-gray-2 hover:text-blue-def
                       ${active ? "border-transparent  bg-blue-dis text-white " 
                : " border-blue-def text-blue-def"
            }`}
        >
            <span className={`${active ?  "border-none" :"border-b-1  border-dashed"} `}>
                    {name}
            </span>
        </button>
    );
}