import { ComponentType } from "react";

interface Props {
    Icon: ComponentType;
    text: string;
}

export default function SitePerksCard({Icon,text}:Props) {
    return (
        <div className="flex flex-col gap-5 items-start box-border w-[392px] h-[217px] p-8 bg-gray-2 rounded-4xl">
            <div>
                <Icon />
            </div>
            <h2 className="text-2xl font-medium">
                {text}
            </h2>
        </div>

    )
}