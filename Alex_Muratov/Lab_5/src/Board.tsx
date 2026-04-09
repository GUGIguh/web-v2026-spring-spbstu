import {useEffect, useRef, useState} from "react";

export default function Board(){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [newSession, setNewSession] = useState(true);
    const [isCross,setIsCross] = useState(true);
    const [boardState,setBoardState] = useState(new Array(9).fill(null));

    const gridSize = 3;
    const width = 600;
    const cellSize = width / gridSize;
    const padding = cellSize * 0.2;


    const checkWinner=(index:number) => {
        for (let i = 0; i < boardState.length; i++) {
            // if ()
        }
    }

    const gridStroke = (ctx:CanvasRenderingContext2D,gridSize:number) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        for(let i = 0; i <= gridSize; i++) {
            let curPos = cellSize * i;
            ctx.moveTo(curPos, 0);
            ctx.lineTo(curPos, height);

            ctx.moveTo(0, curPos);
            ctx.lineTo(width,curPos);
        }
        ctx.stroke();
    }

    const drawCross = (ctx:CanvasRenderingContext2D, cellX: number,cellY: number) => {
        const left = cellX * cellSize + padding;
        const right = (cellX + 1) * cellSize - padding;
        const top = cellY * cellSize + padding;
        const bottom = (cellY + 1) * cellSize - padding;

        ctx.beginPath();
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";

        ctx.moveTo(left, top);
        ctx.lineTo(right, bottom);

        ctx.moveTo(right, top);
        ctx.lineTo(left, bottom);

        ctx.stroke();
    }

    const drawCircle = (ctx:CanvasRenderingContext2D, cellX: number,cellY: number) => {

        const centerX = cellX * cellSize + cellSize / 2;
        const centerY = cellY * cellSize + cellSize / 2;

        const radius = cellSize / 2 - padding;

        ctx.beginPath();
        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 6;

        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext("2d");
        if(!ctx) return;

        if (newSession) {
            gridStroke(ctx,gridSize);
        }

        const handleClick = (e: MouseEvent) =>{


            // const rect = canvas.getBoundingClientRect();
            //
            // const cellX = Math.floor(( e.clientX - rect.left) / cellSize);
            // const cellY = Math.floor(( e.clientY - rect.top) / cellSize);
            // if (isCross){
            //     drawCross(ctx,cellX,cellY);
            // }
            // else drawCircle(ctx,cellX,cellY);
        }

        canvas.addEventListener("click", handleClick);

        return () => canvas.removeEventListener('click', handleClick);
    },[])


    return(
        <canvas className="bg-pink-100" ref={canvasRef} width={width} height={width}> </canvas>
    )
}