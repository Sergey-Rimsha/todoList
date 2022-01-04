import React from "react";

type propsType = {
    ogurec?: string,
    pom?: string,
    arrForTodolist1: Array<inArray>
}

type inArray = {
     id: number,
     title: string,
     isDone: boolean
}

export const  Todolist = (props: propsType) => {
    return (
        <div>
            <h3>{props.pom || props.ogurec}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.arrForTodolist1.map(m => {
                        return (
                            <li id={`id${m.id}`}>
                                <input type="checkbox" checked={m.isDone}/>
                                <span>{m.title}</span>
                            </li>
                        );
                    })
                }
                {/*<li><input type="checkbox" checked={props.arrForTodolist1[0].isDone}/> <span>{props.arrForTodolist1[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.arrForTodolist1[1].isDone}/> <span>{props.arrForTodolist1[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.arrForTodolist1[2].isDone}/> <span>{props.arrForTodolist1[2].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
                {/*<li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}