// 高阶组件.
import React, { Component } from 'react';

function Hello(props) {
	return <h1>{props.name} - {props.text}</h1>;
}

function withLog(BaseComponent, name) {
	return props => <BaseComponent {...props} name={name} />;
}

export default withLog(Hello, 'Tom');
