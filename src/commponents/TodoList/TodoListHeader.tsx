import React from 'react';
// import Button from "../Button";
import {EditableSpan} from "../EditableSpan";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

type TodoListHeaderPropsType = {
    title: string
    removeTodoList: () => void
    changeTitle:(newTitle: string) => void
}

const TodoListHeader: React.FC<TodoListHeaderPropsType> = (props) => {

    return (
        <h3>
            <EditableSpan title={props.title} changeTitle={props.changeTitle} />
            <Tooltip title="Delete">
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => props.removeTodoList()} />
                </IconButton>
            </Tooltip>

        </h3>
    )
};

export default TodoListHeader;