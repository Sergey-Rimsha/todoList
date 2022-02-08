import React from 'react';
import Button from "../Button";
import {EditableSpan} from "../EditableSpan";

type TodoListHeaderPropsType = {
    title: string
    removeTodoList: () => void
    changeTitle:(newTitle: string) => void
}

const TodoListHeader: React.FC<TodoListHeaderPropsType> = (props) => {

    return (
        <h3>
            <EditableSpan title={props.title} changeTitle={props.changeTitle} />
            <Button title={'X'} active={true} onClickHandler={props.removeTodoList}/>
        </h3>
    )
};

export default TodoListHeader;