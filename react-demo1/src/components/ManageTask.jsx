import AddTask from "./AddTask"
import TaskCount from "./TaskCount"
import TaskList from "./TaskList"
import { useState } from "react"

function ManageTask() {
    let [tasks, setTasks] = useState([]);

    //add new task
    const addTask = (taskObj) => {
        setTasks([...tasks, taskObj]);
    }

    return (
        <div className="text-center ">
            <h1 className="text-4xl">Manage Task</h1>
            <div className="flex justify-around mt-3 bg-amber-100 p-1">
                <AddTask addTask={addTask} />
                <TaskList tasks={tasks} />
                <TaskCount tasks={tasks} />
            </div>
        </div>
    )
}

export default ManageTask