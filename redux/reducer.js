export default (state = {}, action) => {
	switch (action.type) {
		case 'SET_URI':
			return {
				...state,
				uri: action.payload,
			};
		default:
			return state;
	}
};
