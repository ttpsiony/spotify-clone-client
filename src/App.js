import React, { useContext, useEffect } from 'react';
import { Switch } from 'react-router-dom';

import context from './store/context';
import { ErrorBoundary, Layout, Login, Modal } from './components';
import Routes, { RouterWrapper } from './routes/routes';
import { GlobalStyle } from './components/styles/Layout.style';

//
import { actions } from './store/action';

function App() {
	const { state, dispatch } = useContext(context);
	const {
		auth: { authLoading, token, user_id },
	} = state || {};

	useEffect(() => {
		if (user_id && token) {
			dispatch(actions.postUserPlayLists({ user_id, limit: 50, offset: 0 }));
			dispatch(actions.getUserCollectionTracks({ limit: 50, offset: 0 }));
		}
	}, [dispatch, token, user_id]);

	return (
		<ErrorBoundary>
			<GlobalStyle />
			<Switch>
				<RouterWrapper exact path="/login" Component={Login} login={false} />
				<LayoutComponent token={token} authLoading={authLoading} />
			</Switch>
			<Modal />
		</ErrorBoundary>
	);
}

function LayoutComponent(props) {
	return (
		<Layout token={props.token} authLoading={props.authLoading}>
			<Routes />
		</Layout>
	);
}

export default App;
