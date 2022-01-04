import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


let arrForTodolist1=[
	{id:1, title:'HTML&CSS', isDone:false},
	{id:2, title:'JS', isDone:true},
	{id:3, title:'React', isDone:false},
];

let arrForTodolist2=[
	{id:1, title:'HTML&CSS22222', isDone:true},
	{id:2, title:'JS22222', isDone:false},
	{id:3, title:'React222222', isDone:true},
];


export const App = () => {
    return (
        <div className="App">
            <Todolist ogurec={'What to learn111'} arrForTodolist1={arrForTodolist1} />
            <Todolist pom={'What to learn222'} arrForTodolist1={arrForTodolist2} />
            {/*<Todolist ogurec={`What to learn`}/>*/}
        </div>
    );
}
