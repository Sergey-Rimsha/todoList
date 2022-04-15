import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./commponents/TodoList/TodoList";
import {AddItemForm} from "./commponents/AddItemForm";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./commponents/store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./commponents/store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./commponents/store/store";
import {Container, Grid, Paper} from "@material-ui/core";
import ButtonAppBar from "./commponents/ButtonAppBar";
// C
// R
// U
// D
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"


const AppWithReducers = () => {
    console.log('App is called');

    // <AppRootStateType, TaskStateType> -- Дженерик => первый приходит тип, второй уходит тип

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);


    const dispatch = useDispatch()

    // удаляем Task
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID));
    },[dispatch])

    // добавляем новые Task
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID));
    },[dispatch])

    // изменяем status y Tasks -- true/false
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    },[dispatch])

    // изменяем title у Tasks
    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    },[dispatch])


    // удаляем Todolist
    const removeTodolist = useCallback((todoListsID: string) => {
        let action = RemoveTodoListAC(todoListsID);
        dispatch(action);
    },[dispatch])

    // изменяем title y TodoLists
    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListID));
    },[dispatch])

    // изменяем значение filter в TodoList на 'all' 'active' 'completed'
    const changeFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todoListID));
    },[dispatch])


    // создаём новый TodoList
    const addTodoLists = useCallback((title: string) => {
        let action = AddTodoListAC(title);
        dispatch(action);
    },[dispatch])


    // Отрисовываем все TodoLists --
    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper className={'paper_todoList'}>
                    <TodoList
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>

        )

    })


    // UI:
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container item xs={12} spacing={1}>
                    <Paper className={'paper_todoList'}>
                        <AddItemForm addItem={addTodoLists}/>
                    </Paper>
                    <Grid container item xs={12} spacing={1}>
                        {todoListsComponents}
                    </Grid>
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;
