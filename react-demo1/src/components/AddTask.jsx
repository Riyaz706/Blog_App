import { useForm } from 'react-hook-form'

function AddTask({ addTask }) {
    const { register, handleSubmit, reset } = useForm();
    const onFormSubmit = (taskObj) => {
        addTask(taskObj);
        reset(); 
    }
    return (
        <div>
            <h1 className="text-4xl text-amber-300 text-center">Add Task</h1>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                    <input type="text" {...register("task", { required: true })} name="task" className='border-1 border-black mt-2 p-1 rounded' placeholder='Add Task' />
                </div>
                <button type="submit" className='mt-2 bg-blue-300 p-1 rounded'>Add Task</button>
            </form>
        </div>
    )
}

export default AddTask