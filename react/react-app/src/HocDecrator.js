// npm install -D @babel/plugin-proposal-decorators
// 高阶组件.
import React, { Component } from 'react';

function withLog(BaseComponent) {
	return (props) => <React.Fragment>
		<p>this is withlog</p>
		<BaseComponent {...props} />
	</React.Fragment>;
}

function enhanceLog(name) {
	return BaseComponent => {
		return props => (
			<React.Fragment>
				<p>this is withlog</p>
				<BaseComponent {...props} name={name}/>
			</React.Fragment>
		);
	}
}

@withLog
@enhanceLog('joke')
class Hello extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h1>
				{this.props.name} - {this.props.text}
			</h1>
		);
	}
}

export default Hello;
