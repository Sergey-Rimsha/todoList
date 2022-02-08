import React, {ChangeEvent} from 'react';
import {TaskType} from "../../App";
import {EditableSpan} from "../EditableSpan";

type TaskPropsType = TaskType & {
    todoListID: string
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

const Task: React.FC<TaskPropsType> = (
    {
        id,
        todoListID,
        title,
        isDone,
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    }
) => {
    // const id = props.id
    // const isDone = props.isDone
    // const title = props.title
    const onClickRemoveTask = () => removeTask(id, todoListID)
    const onChangeChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(id, e.currentTarget.checked, todoListID);

    const changeTitle = (title: string) => {
        changeTaskTitle(id, title, todoListID);
    }

    return (
        <li className={isDone ? "is-done" : ""}>
            <input
                type="checkbox"
                onChange={onChangeChangeTaskStatus}
                checked={isDone}/>
            <EditableSpan title={title} changeTitle={changeTitle} />
            <button onClick={onClickRemoveTask}>x</button>
        </li>
    );
};

export default Task;

// 1. Функция принимает параметром массив чисел и возвращает max значение.
// getMax1([1,4,6,8]) => 8
// 2. Функция принимает параметром массив чисел и возвращает массив с двумя макс значениями
// getMax2([1,4,6,8]) => [8, 6]
// 3. Функция принимает параметром массив чисел и количество max,
// которые надо найти и возвращает массив  max значениями
// getMax3([1,4,6,8],1) => [8, 6, 4]
// math.max и sort не используем!