import React, {ChangeEvent, KeyboardEvent, useState} from "react";
// import Button from "./Button";
import {TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {

    console.log('addItemForm is called');

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem();
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false);
        setTitle(e.currentTarget.value)
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
                // size="small"
                label="Title"
                variant="outlined"/>

            <IconButton color="primary" onClick={()=>onClickAddItem()}>
                <AddBox />
            </IconButton>
            {errorMessage}

        </div>
    )
})