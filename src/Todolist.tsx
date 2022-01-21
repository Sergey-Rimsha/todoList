import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./components/Button";

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

		// проверяем что-бы небыло пробелов при вводе данных

		let changeText = e.currentTarget.value;
		if (changeText[changeText.length - 1] !== ' ') {
			setTitle(changeText)
		}
        // setTitle(changeText)
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
			<Button name={'+'} callback={onClickHandler}/>
        </div>
        <ul>
            {props.tasks.map((t, i) => {
                return (
                    <li key={i}>
						<Button name={'X'} callback={()=>removeTaskHandler(t.id)}/>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>

                    </li>
                )
            })}
        </ul>
        <div>
        	<Button name={'All'} callback={()=>onClickFilterHandler('All')}/>
			<Button name={'Active'} callback={()=>onClickFilterHandler('Active')}/>
			<Button name={'Completed'} callback={()=>onClickFilterHandler('Completed')}/>
		</div>
    </div>
}
