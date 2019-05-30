import { createStore, applyMiddleware } from '../v-redux';
// import { applyMiddleware } from 'redux'

// import thunk from 'redux-thunk';
import { thunk, logger } from '../v-redux/v-redux-thunk';

const goodReducer = (state = [ 'tom' ], action) => {
	switch (action.type) {
		case 'add':
			return [ ...state, action.payload ];
		default:
			return state;
	}
};

export const add = (payload) => {
	return {
		type: 'add',
		payload
	};
};

export const addSync = (payload) => {
	return (dispatch, getState) => {
		dispatch({
			type: 'add',
			payload
		});

		return getState();
	};
};

export default createStore(goodReducer, applyMiddleware(logger, thunk));
