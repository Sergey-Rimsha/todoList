import React from "react";
import Button from "../Button";
import {FilterValuesType} from "../../App";

type ButtonsBlockPropsType = {
	filter: FilterValuesType
	setFilterValue: (filter: FilterValuesType) => void
}

export const ButtonsBlock = (props: ButtonsBlockPropsType) => {



	return (
		<div>
			<Button
				active={props.filter === "all"}
				title={"All"}
				onClickHandler={()=> props.setFilterValue('all')}
			/>
			<Button
				active={props.filter === "active"}
				title={"Active"}
				onClickHandler={()=> props.setFilterValue('active')}
			/>
			<Button
				active={props.filter === "completed"}
				title={"Completed"}
				onClickHandler={()=> props.setFilterValue('completed')}
			/>
		</div>
	)
}