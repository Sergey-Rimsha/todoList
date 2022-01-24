import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from "./components/CheckBox";

import style from './components/Todolist.module.css';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    CheckBoxChangeStatus:(id: string, value: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("");

    let [error, setError] = useState(false);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");


    console.log(props.filter);

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? style.error : ''}
                   value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            {error && <div className={style.errorMessage}>Title is require!!</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)

                    const CheckBoxChangeStatusHandler=(value: boolean)=>{
                        props.CheckBoxChangeStatus(t.id,value)
                    }

                    return <li className={t.isDone ? style.isDone : ''} key={t.id}>
                        <CheckBox isDone={t.isDone} CheckBoxChangeStatus={CheckBoxChangeStatusHandler}/>
                        {/*<input type="checkbox" checked={t.isDone}/>*/}
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? style.activeFilter: ''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? style.activeFilter: ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? style.activeFilter: ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
