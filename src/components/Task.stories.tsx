import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


export default {
    title: 'Task Components',
    component: Task
}

const changeTaskStatus = action("Change Task Status");
const changeTaskTitle = action("Change Task Title");
const removeTask = action("Remove Task");

const task = {
    id: '1',
    isDone: true,
    title: 'CSS'
}

const task2 = {
    id: '2',
    isDone: false,
    title: 'JS'
}


export const TaskBaseExample = () => {
    return (
        <>
            <Task
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTask}
                task={task}
                todolistId={"todolistId1"}
            />
            <Task
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTask}
                task={task2}
                todolistId={"todolistId2"}
            />
        </>
    )
};