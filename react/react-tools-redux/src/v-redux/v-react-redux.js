// Provider, connect
import React, { Component } from 'react';

const context = React.createContext();

class Provider extends Component {
	render() {
		const { store, children } = this.props;

		return <context.Provider value={{ store }}>{children}</context.Provider>;
	}
}

class connect extends Component {
  
}

export { Provider, connect };
