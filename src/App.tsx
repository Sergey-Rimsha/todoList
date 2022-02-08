import React, {useState} from 'react';
import './App.css';
import TodoList from "./commponents/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./commponents/AddItemForm";
// C
// R
// U
// D
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"



const App = () => {
    // BLL:
    // const todoListTitle: string = "What to learn"
    // const [filter, setFilter] = useState<FilterValuesType>("all")

    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const todoListID_3 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
        {id: todoListID_3, title: "What to read", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "REACT",  isDone: true},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Axios", isDone: true},
            {id: v1(), title: "React-redux",  isDone: false},
            {id: v1(), title: "Formik",  isDone: false},
        ],
        [todoListID_3]: [
            {id: v1(), title: "Learn JS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT",  isDone: true},
        ],

    })

    // console.log(tasks[todoListID_1][0].title);

    const removeTask = (taskID: string, todoListID: string) => {

        // const todoList = tasks[todoListID];
        // const filterTasks = todoList.filter(t => t.id !== taskID);
        // const copyTasks = {...tasks};
        // copyTasks[todoListID] = filterTasks;
        // setTasks(copyTasks)

        // короткий варриант
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})    }


    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType =  {id: v1(), title, isDone: false}
        const tasksTodoList = tasks[todoListID]
        const upDatedTasks = [newTask, ...tasksTodoList];
        const copyTasks = {...tasks};
        copyTasks[todoListID] = upDatedTasks
        setTasks(copyTasks)


    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {

        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }


	const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {

		setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)})
	}

	const changeTodolistTitle = (title: string, todoListID: string) => {
		setTodoLists([...todoLists].map(t => t.id === todoListID ? {...t, title} : t));
	}


    const changeFilter = (filter: FilterValuesType, todoListID: string) => {

        const upDatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl)

        setTodoLists(upDatedTodoList)

    }

    const removeTodolist = (todoListsID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsID))
        delete tasks[todoListsID]
    }


    const getTasksForRender = (todolist: TodoListType) => {
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todolist.id].filter(t => t.isDone)
            default:
                return tasks[todolist.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const tasksForRender = getTasksForRender(tl);
        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
				changeTaskTitle={changeTaskTitle}
				changeTodolistTitle={changeTodolistTitle}
            />
        )

    })

	const addTodoLists = (title: string) => {
		const newTodoListId = v1();
		const newTodoList: TodoListType = {
			id: newTodoListId, title, filter: 'all'
		};

		setTodoLists([...todoLists, newTodoList]);
		setTasks({...tasks, [newTodoListId]: []})
	}


    // const tasksForRender = getTasksForRender()
    // UI:
    return (
        <div className="App">
			<AddItemForm addItem={addTodoLists}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
