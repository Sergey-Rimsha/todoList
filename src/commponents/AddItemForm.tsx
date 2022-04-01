import React, {ChangeEvent, KeyboardEvent, useState} from "react";
// import Button from "./Button";
import {Grid, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

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


    return (
        <div>
            <TextField
                value={title}
                onKeyPress={onKeyPressAddItem}
                onChange={onChangeSetTitle}
                id="filled-size-small"
                size="small"
                label="Title"
                variant="outlined"/>
            <Button onClick={() => onClickAddItem()} variant="contained" color="secondary">
                +
            </Button>

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