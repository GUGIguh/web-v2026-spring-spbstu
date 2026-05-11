export default function Label({text,color}:{text:string, color:string}) {
    return (<div className={`flex justify-center items-center w-fit py-1 px-2 text-white rounded-[20px] ${color} `}>
        {text}
    </div>)
}