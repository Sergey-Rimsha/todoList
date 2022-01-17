import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | "Completed"
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

function App() {

    const [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])


    const [filter, setFilter] = useState('All')

    let filteredT = tasks
    if (filter === 'Active') {
        filteredT = tasks.filter(f => f.isDone)
    }
    if (filter === "Completed") {
        filteredT = tasks.filter(f => !f.isDone)
    }

    const filteredTasks = (filterValue: FilterType) => {
        console.log(filterValue)
        setFilter(filterValue)
    }

    const removeTasks = (taskID: string) => {
        console.log(taskID)
        setTask(tasks.filter(f=>f.id!==taskID))
    }

	const addTask = (title: string) => {
		let newTask = {id: v1(), title: title, isDone: false}
		setTask([newTask, ...tasks]);
	}

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredT}
                removeTasks={removeTasks}
                filteredTasks={filteredTasks}
				addTask={addTask}
            />
        </div>
    );
}

export default App;
