import React, {useEffect, useState} from 'react';
import Board from "./Board";

// const [boardState,setBoardState] = useState(new Array(9).fill(null));



const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <Board />
        </div>
    );
};

export default App; // Экспортируем, чтобы использовать в index.tsx