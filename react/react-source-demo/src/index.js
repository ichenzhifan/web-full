// import React, {Component} from './vreact/react';
// import ReactDOM from './vreact/vdom';
import React from './kkreact';
import ReactDOM from './kkreact/ReactDOM';

import './index.css';
// import App from './App';

class Comp2 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 1
		};

		// this.changeCount = this.changeCount.bind(this);
	}

	// changeCount(){
	//   this.setState({
	//     count: this.state.count + 1
	//   });

	//   // this.setState(state => {
	//   //   return {
	//   //     count: state.count + 1
	//   //   }
	//   // });
	// }

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				count: this.state.count + 1
			});
		}, 2000);
	}

	render() {
		return <h1 onClick={this.changeCount}>{this.state.count}</h1>;
	}
}

function Test({ name }) {
	return (
		<div>
			<h1>{name}</h1>
		</div>
	);
}

const items = [ { age: 1 }, { age: 2 } ];
const jsx = (
	<div className="App">
		<Comp2 />
	</div>
);

ReactDOM.render(jsx, document.getElementById('root'));
