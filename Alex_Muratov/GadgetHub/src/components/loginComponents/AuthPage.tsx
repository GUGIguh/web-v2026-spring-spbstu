import { ReactNode } from "react";
import BannerIcon from "../../icons/BannerIcon";

interface AuthPageProps {
    children: ReactNode;
}

export default function AuthPage({ children }: AuthPageProps) {
    return (
        <div className="relative flex items-center justify-center w-full h-screen bg-[#E5EEFF] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <BannerIcon />
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}