import React,{ useState } from "react";

function StateDemo() {
    // state
    let [counter,setCounter]=useState(10)
    let [marks,setMarks]=useState([1,4])
    let [user,setUser]=useState({name:"Riyaz"})

    const incrementCounter=()=>{
        setCounter(counter=>counter+1)   
        setCounter(counter=>counter+1)   
        setCounter(counter=>counter+1)   
    }

    const decrementCounter=()=>{
        setCounter(counter-1)
    }

    const resetCounter=()=>{
        setCounter(10)
    }

    const addMarks=()=>{
        marks=[8,...marks,7]
        setMarks(marks)
    }

    const addUserAge=()=>{
        user={...user,age:25}
        setUser(user)

    }
    return (


        <div className="text-center text-2xl p-12 bg-amber-200 border-2">
            <p>StateDemo</p>
            <p>{counter}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={incrementCounter}>Increment</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={decrementCounter}>Decrement</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={resetCounter}>Reset</button>
            <h1>Marks</h1>
            {
                marks.map((mark,index)=><p key={index}>{mark}</p>)
            }
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={addMarks}>Add Marks</button>


            <h1>User</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={addUserAge}>Add User Age</button>
        </div>
    )   
}

export default StateDemo
