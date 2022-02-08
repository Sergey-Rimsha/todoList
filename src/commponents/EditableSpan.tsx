import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
	title: string
	changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {

	const [newTitle, setNewTitle] = useState<string>(props.title);

	const [editMode, setEditMode] = useState<boolean>(false);


	const onChangeSetUserText = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value);
	};

	const onEditMode = () => {
		setEditMode(true)
	}

	const offEditMode = () => {
		props.changeTitle(newTitle);
		setEditMode(false)
	}

	const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode();

	return (
		editMode
			? <input
				value={newTitle}
				onChange={onChangeSetUserText}
				onBlur={offEditMode}
				onKeyPress={onKeyPressOffEditMode}
				autoFocus/>
			: <span onDoubleClick={onEditMode}>{props.title}</span>
	)


}