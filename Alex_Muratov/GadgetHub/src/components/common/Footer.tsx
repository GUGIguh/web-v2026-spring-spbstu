import MobileIcon from "../../icons/MobileIcon";

export default function Footer() {
    return (
        <div className="flex justify-center w-full h-52 bg-blue-hov">
            <div className="flex justify-between w-[1300px] p-10 text-[#B7CEFF]">
                <div className="flex gap-10 flex-col">
                    <div>
                        <h1 className="font-medium text-2xl">Gadget Hub</h1>
                        <span className="font-light"> Магазин надежных гаджетов</span>
                    </div>

                    <h3 className="text-base font-light">  © 2024 ООО “Гаджет Хаб”. Все права защищены</h3>
                </div>


                <div className="flex gap-5 font-medium text-3xl">
                    <MobileIcon/>
                    <h1>8 (800) 678-34-24</h1>
                </div>

                <div className="flex gap-5 ">
                    <img className="w-9 h-9" alt="Telegram" src="/telegram.png" />
                    <img className="w-9 h-9" alt="Vk" src="/vk.png" />
                    <img className="w-9 h-9" alt="Whatsapp" src="/whatsapp.png" />
                </div>
            </div>
        </div>

    )
}