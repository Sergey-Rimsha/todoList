import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {UniversalInputFull} from "./components/UniversalInputFull";
import {Input} from "./components/Input";
import {Button} from "./components/Button";

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
}

export function Todolist(props: PropsType) {
    let [localTitle, setLocalTitle] = useState("")


    // const addTask = () => {
    //     props.addTask(title);
    //     setTitle("");
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }



    const callBackHandlerForAddTask = () => {
        props.addTask(localTitle);
        setLocalTitle('')
    }

    const onClickHandler = (tID: string) => {
        props.removeTask(tID)
    }

    // const onAllClickHandler = () => props.changeFilter("all");
    // const onActiveClickHandler = () => props.changeFilter("active");
    // const onCompletedClickHandler = () => props.changeFilter("completed");

    const onClickHandlerForFilters=(value:FilterValuesType)=>{
        props.changeFilter(value)
    }

    return <div>
        <h3>{props.title}</h3>

        <Input title={localTitle} setTitle={setLocalTitle} callBack={callBackHandlerForAddTask} />
        <Button name={'+'} callBack={callBackHandlerForAddTask}/>

        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        {/*<button onClick={onClickHandler}>x</button>*/}

                        <Button name={'X'} callBack={() => {onClickHandler(t.id)}}/>
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button onClick={onAllClickHandler}>All</button>*/}
            <Button name={'All'} callBack={()=>onClickHandlerForFilters('all')}/>
            <Button name={'Active'} callBack={()=>onClickHandlerForFilters('active')}/>
            <Button name={'Completed'} callBack={()=>onClickHandlerForFilters('completed')}/>

            {/*<button onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button onClick={onCompletedClickHandler}>Completed</button>*/}
        </div>
    </div>
}
