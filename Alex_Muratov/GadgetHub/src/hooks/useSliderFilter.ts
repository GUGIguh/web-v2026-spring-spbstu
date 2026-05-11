import {useState} from "react";

interface useSliderFilterReturn {
    price:number[];
    updatePrice: (min: number, max: number) => void;
}

export  default function useSliderFilter():useSliderFilterReturn{

const [price,setPrice] = useState<number[]>([]);

const updatePrice = (min:number,max:number) =>{
    setPrice([min, max]);
}

return {price, updatePrice}

}