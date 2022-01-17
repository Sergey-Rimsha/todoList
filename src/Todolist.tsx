import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskID: string) => void
    filteredTasks:(filterValue:FilterType)=>void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('');

    // const [filter, setFilter] = useState('All')
    //
    // let filteredT = tasks
    // if (filter === 'Active') {
    //     filteredT = tasks.filter(f => f.isDone)
    // }
    // if (filter === "Completed") {
    //     filteredT = tasks.filter(f => !f.isDone)
    // }
    //
    // const filteredTasks = (filterValue: filterType) => {
    //     console.log(filterValue)
    //     setFilter(filterValue)
    // }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
		if (title) {
			title.trim();
			props.addTask(title)
		}
		setTitle('')
    }

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onClickHandler()
		}
	}

	const onClickFilterHandler = (value: FilterType) => {
		props.filteredTasks(value)
	}

	const removeTaskHandler = (id: string) => {
		props.removeTasks(id)
	}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyPress={onKeyPressHandler} value={title} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map((t, i) => {
                return (
                    <li key={i}>
                        <button onClick={()=>removeTaskHandler(t.id)}>X</button>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>

                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>onClickFilterHandler('All')}>All</button>
            <button onClick={()=>onClickFilterHandler('Active')}>Active</button>
            <button onClick={()=>onClickFilterHandler('Completed')}>Completed</button>
        </div>
    </div>
}
