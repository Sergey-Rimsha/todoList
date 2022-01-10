import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType = 'All' | 'Active' | 'Completed'

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

function App() {

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]

	const [tasks, setTask] = useState(tasks1)
	const [filter, setFilter] = useState<FilterType>('All')

	let filteredT = tasks

	if (filter === 'Active') {
		filteredT = tasks.filter(f => f.isDone)
	}
	if (filter === 'Completed') {
		filteredT = tasks.filter(f => !f.isDone)
	}

	const removeTasks = (TasksId: number) => {
		setTask(tasks.filter(f => f.id !== TasksId))
		// console.log(TasksId)
	}

	const filteredTasks = (filterTask: FilterType) => {
		setFilter(filterTask)
	}



    return (
        <div className="App">
            <Todolist
				title="What to learn"
				tasks={filteredT}
				removeTasks ={removeTasks}
				filteredTasks={filteredTasks}
			/>
        </div>
    );
}

export default App;
