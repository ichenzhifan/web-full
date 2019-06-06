function thunk({ dispatch, getState }) {
	return (next) => (action) => {
		if (typeof action === 'function') {
			return action(dispatch, getState);
		}

		return next(action);
	};
}

function logger({ dispatch, getState }) {
	return (next) => (action) => {
		return next(action);
	};
}

export {
  thunk,
  logger
}
