import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';

// import RoutePage from './RoutePage';
import ReduxDemo from './ReduxtDemo';

function App() {
	return (
		<div className="App">
			{/*<RoutePage/>*/}
			<Provider store={store}>
				<ReduxDemo />
			</Provider>
		</div>
	);
}

export default App;
