import React, {ChangeEvent} from 'react';
import {TaskType} from "../../App";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {Checkbox, FormControlLabel, Tooltip} from "@material-ui/core";

type TaskPropsType = TaskType & {
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

const Task: React.FC<TaskPropsType> = React.memo((
    {
        id,
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
    const onClickRemoveTask = () => removeTask(id);
    const onChangeHandlerTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(id, e.currentTarget.checked);

    const changeTitle = (title: string) => {
        changeTaskTitle(id, title);
    }

    return (
        <div className={isDone ? "is-done" : ""}>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isDone}
                        onChange={onChangeHandlerTaskStatus}
                        color="primary"
                        name={title}
                    />
                }
                label={<EditableSpan title={title} changeTitle={changeTitle} />}
            />
            <Tooltip title="Delete">
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={onClickRemoveTask} />
                </IconButton>
            </Tooltip>
        </div>
    );
});

export default Task;

// 1. Функция принимает параметром массив чисел и возвращает max значение.
// getMax1([1,4,6,8]) => 8
// 2. Функция принимает параметром массив чисел и возвращает массив с двумя макс значениями
// getMax2([1,4,6,8]) => [8, 6]
// 3. Функция принимает параметром массив чисел и количество max,
// которые надо найти и возвращает массив  max значениями
// getMax3([1,4,6,8],1) => [8, 6, 4]
// math.max и sort не используем!