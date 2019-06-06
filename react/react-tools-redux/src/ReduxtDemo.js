import React, { useState } from 'react';
import { connect } from 'react-redux';
import { add, addSync } from './store';

const ItemAdd = connect(null, {
	addSync
})(({ addSync }) => {
	const [ txt, setTxt ] = useState('');
	const onChange = (ev) => setTxt(ev.target.value);
	const onAdd = () => {
		addSync(txt);
		setTxt(' ');
	};

	return (
		<div>
			<input type="text" defaultValue={txt} onChange={onChange} />
			<button onClick={onAdd}>add</button>
		</div>
	);
});

const ItemList = (props) => {
	const { list = [] } = props;

	return (
		<div>
			{list.map((m) => <div>{m}</div>)}

			<ItemAdd />
		</div>
	);
};

export default connect(
	(state) => ({
		list: state
	}),
	{
		add,
		addSync
	}
)(ItemList);
