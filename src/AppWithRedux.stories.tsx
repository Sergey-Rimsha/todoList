import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
	title: 'AppWithRedux',
	component: AppWithRedux,
	// продикарируем для получение доступа к контексту "store redux"
	decorators: [ReduxStoreProviderDecorator],
}

// const callback =  action("change value");


export const EditableSpanBaseExample = () => {
	return (
		<>
			<AppWithRedux/>
		</>
	)
};


