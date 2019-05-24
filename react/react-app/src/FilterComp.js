import React, { Component } from 'react';

function FilterComp(props) {
	const { tag = 'div' } = props;

	return React.Children.map(props.children, (m) => {
		if (m.type === tag) {
			return m;
		}

		return null;
	});
}

export { FilterComp };
