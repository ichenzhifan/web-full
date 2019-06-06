import React, { Component, useState, useReducer } from 'react';
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom';

const goodReducer = (state, action) => {
	switch (action.type) {
		case 'init':
			return action.payload;
		case 'add':
			return [ ...state, action.payload ];
		default:
			return state;
	}
};

const userReducer = (state, action) => {
	switch (action.type) {
		case 'init':
			return action.payload;
		case 'login':
			return true;
		case 'logout':
			return false;
		default:
			return state;
	}
};

const Detail = ({ match, goods }) => {
	const id = match.params.id;
	const good = goods.find((m) => m.name === id);

	return good ? (
		<h1>
			{good.name} - {good.age}
		</h1>
	) : (
		''
	);
};

const ComponentAddItem = (props) => {
	const [ name, setName ] = useState('');
	const [ age, setAge ] = useState(18);

	const onChangeName = (ev) => {
		const val = ev.target.value;
		setName(val);
	};

	const onChangeAge = (ev) => {
		const val = ev.target.value;
		setAge(val);
	};

	const onAdd = (ev) => {
		if (name && age) {
			props.onAdd({
				name,
				age
			});
			setName('');
			setAge(18);
		}
	};

	return (
		<div>
			<p>
				name: <input type="text" name="name" onChange={onChangeName} />
			</p>
			<p>
				age: <input type="number" name="age" min="1" max="120" onChange={onChangeAge} />
			</p>
			<p>
				<button onClick={onAdd}>add</button>
			</p>
		</div>
	);
};

const ComponentLogin = ({ isLogin, login, location }) => {
	const redirect = location.state.redirect || '/'; // 重定向地址

	if (isLogin) return <Redirect to={redirect} />;

	return (
		<div>
			<button onClick={login}>login</button>
		</div>
	);
};

// 路由劫持.
const AuthRoute = ({ component: WrappedComponent, isLogin, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				return isLogin ? (
					<WrappedComponent {...props} />
				) : (
					<Redirect
						to={{
							path: '/login',
							state: {
								redirect: props.location.pathname
							}
						}}
					/>
				);
			}}
		/>
	);
};

export default (props) => {
	// const [goods, setGoods] = useState([{name: 'tom', age: 10}, {name: 'kala', age: 20}]);
	const [ goods, dipatch ] = useReducer(goodReducer, [ { name: 'tom', age: 10 }, { name: 'kala', age: 20 } ]);
	const [ isLogin, userDispatch ] = useReducer(userReducer, false);

	const logText = isLogin ? 'logout' : 'login';

	return (
		<BrowserRouter>
			{goods.map((m) => (
				<h2>
					<Link to={`/detail/${m.name}`}>{m.name}</Link>
				</h2>
			))}

			<Link to="/add">add</Link>

			<button onClick={() => userDispatch({ type: logText })}>{logText}</button>

			<Route path="/detail/:id" render={(props) => <Detail {...props} goods={goods} />} />
			<AuthRoute
				path="/add"
				isLogin={isLogin}
				component={(props) => (
					<ComponentAddItem {...props} onAdd={(payload) => dipatch({ type: 'add', payload })} />
				)}
			/>
			<Route
				path="/login"
				component={(props) => <ComponentLogin {...props} login={() => userDispatch({ type: 'login' })} />}
			/>
		</BrowserRouter>
	);
};
