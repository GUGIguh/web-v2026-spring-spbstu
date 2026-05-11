import {ComponentType} from "react";

interface Props {
    Icon: ComponentType;
    text: string;
}

export default function ContactsCard({Icon, text}: Props) {
    return (
        <div className="flex gap-8 items-start box-content w-[392px] h-fit  rounded-4xl">
            <div>
                <Icon />
            </div>
            <h2 className="text-2xl font-medium">
                {text}
            </h2>
        </div>

    )
}