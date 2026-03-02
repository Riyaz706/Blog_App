import React,{ useState } from "react";

function StateDemo() {
    // state
    let [counter,setCounter]=useState(10)
    let [marks,setMarks]=useState([1,4,6,9])
    let [user,setUser]=useState({name:"Riyaz"})
    
    //increment counter
    const incrementCounter=()=>{
        setCounter(counter=>counter+1)   
        setCounter(counter=>counter+1)   
        setCounter(counter=>counter+1)   
    }
    //decrement counter
    const decrementCounter=()=>{
        setCounter(counter=>counter-1)
    }
    //reset counter
    const resetCounter=()=>{
        setCounter(10)
    }
    //add marks
    const addMarks=()=>{
        marks=[8,...marks,7]
        setMarks(marks)
    }
    //add a property to user
    const addUserAge=()=>{
        setUser(user=>({...user,age:25}))

    }
    //delete a mark
    const deleteMark=(index)=>{
        let results = marks.filter((m,i)=>i!==index)
        setMarks(results)
    }
    //add a property to user
    const addPropertyToUser=()=>{
        setUser(user=>({...user,city:"Hyderabad"}))
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
            <p>{user.name}</p>
            <p>{user.age}</p>
            <p>{user.city}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={addUserAge}>Add User Age</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded m-2" onClick={addPropertyToUser}>Add User City</button>
        </div>
    )   
}

export default StateDemo
