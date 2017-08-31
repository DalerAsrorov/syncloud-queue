import React, { Component } from 'react';
import BaseView from '../components/BaseView';

export default class Base extends Component {
	state = {
		searchTerm: ''
	};

	render() {
		return <BaseView />;
	}
}
