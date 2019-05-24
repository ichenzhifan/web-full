import React, { Component } from 'react';

class RadioGroup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{React.Children.map(this.props.children, (child) => {
					const clonedChild = React.cloneElement(child, { name: this.props.name });
					return clonedChild;
				})}
			</div>
		);
	}
}

function Radio(props) {
	return (
		<label style={{ display: 'block' }}>
			<input type="radio" name={props.name} checked={props.checked} />
			{props.children}
		</label>
	);
}

export { RadioGroup, Radio };
