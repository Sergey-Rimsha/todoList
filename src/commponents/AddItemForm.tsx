import React, {ChangeEvent, KeyboardEvent, useState} from "react";
// import Button from "./Button";
import {Fab, TextField, Tooltip} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState<string>("");

    const [error, setError] = useState<boolean>(false);


    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem();
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    };

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    };

    const errorMessageStyle = {color: "white", backgroundColor: "red"};
    const errorMessage = error
        ? <div style={errorMessageStyle}>Title is required!</div>
        : null;


    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            fab: {
                margin: theme.spacing(1),
            },
            absolute: {
                position: 'absolute',
                bottom: theme.spacing(2),
                right: theme.spacing(3),
            },
        }),
    );
    const classes = useStyles();

    return (

        <div>
            <TextField
                value={title}
                onKeyPress={onKeyPressAddItem}
                onChange={onChangeSetTitle}
                id="filled-size-small"
                // size="small"
                label="Title"
                variant="outlined"/>
            <Tooltip title="Add" aria-label="add">
                <Fab color="primary" size="small" className={classes.fab}>
                    <AddIcon onClick={() => onClickAddItem()} />
                </Fab>
            </Tooltip>

            {/*<Button onClick={() => onClickAddItem()} variant="contained" color="secondary">*/}
            {/*    +*/}
            {/*</Button>*/}

            {errorMessage}

            {/*<input*/}
            {/*	value={title}*/}
            {/*	onChange={onChangeSetTitle}*/}
            {/*	onKeyPress={onKeyPressAddItem}*/}
            {/*	className={error ? "error" : ""}*/}
            {/*/>*/}

            {/*<Button active={true} title={'+'} onClickHandler={onClickAddItem}/>*/}
        </div>
    )
}