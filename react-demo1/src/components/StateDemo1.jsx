import React, { useState } from "react";

function MarksDemo() {

    const [marks, setMarks] = useState([10, 20, 30, 40]);

    const insertAtBeginning = () => {
        setMarks(prev => [5, ...prev]);
    };

    const insertAtEnd = () => {
        setMarks(prev => [...prev, 50]);
    };

    const insertAtIndex = () => {
        setMarks(prev => [...prev.slice(0, 2),25,...prev.slice(2)]);
    };

    const deleteAtIndex = (index) => {
        let results = marks.filter((m,i)=>i!==index)
        setMarks(results)
    };

    return (
        <div>
            <h2>Marks</h2>
            {marks.map((m, i) => <p key={i} className="text-xl">{m}</p>)}
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={insertAtBeginning}>Insert Beginning</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={insertAtEnd}>Insert End</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={insertAtIndex}>Insert Index</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={()=>deleteAtIndex(1)}>Delete Index(1)</button>
        </div>
    );
}

export default MarksDemo;