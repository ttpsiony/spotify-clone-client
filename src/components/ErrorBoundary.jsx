import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error) {
		console.error(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<h2 style={{ textAlign: 'center', fontSize: '30px', marginTop: '60px' }}>
					應用程式發生錯誤，請重新整理，或是<Link to="/">前往首頁</Link>
				</h2>
			);
		}

		return <>{this.props.children}</>;
	}
}

export default ErrorBoundary;
