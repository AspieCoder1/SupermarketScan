export default (state, action) => {
	switch (action.type) {
		case 'SET_PRED':
			return {
				...state,
				predictions: action.payload,
			};
		default:
			return state;
	}
};
