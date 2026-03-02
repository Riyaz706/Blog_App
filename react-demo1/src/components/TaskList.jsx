function TaskList({ tasks }) {
    return (
        <div>
            <h3 className="text-4xl text-amber-300 text-center">Tasks List</h3>
            {
                tasks.map((taskObj, index) => {
                    return (
                        <div key={index} className="bg-blue-300 p-2 my-2 rounded border border-amber-300">
                            <p>{taskObj.task}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default TaskList;

//if tasks is empty, display a message "No tasks found"
// condition ?