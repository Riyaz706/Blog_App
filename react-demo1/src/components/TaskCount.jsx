function TaskCount({tasks}) {
  return (
    <div>
        <h3 className="text-4xl text-amber-300">Tasks Count</h3>
        <p className="text-4xl text-amber-300 text-center">{tasks.length}</p>
    </div>
  )
}

export default TaskCount