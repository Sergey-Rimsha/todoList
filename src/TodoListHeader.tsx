import React from 'react';

type TodoListHeaderPropsType = {
    title: string
    removeTodoList: () => void
}

const TodoListHeader: React.FC<TodoListHeaderPropsType> = (props) => {
    return (
        <h3>
            {props.title}
            <button onClick={props.removeTodoList}>X</button>
        </h3>
    )
};

export default TodoListHeader;