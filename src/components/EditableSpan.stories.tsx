import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan',
    component: EditableSpan
}

const callback =  action("change value");


export const EditableSpanBaseExample = () => {
    return (
        <>
            <EditableSpan
                value={'start value'}
                onChange={callback}
            />
        </>
    )
};


