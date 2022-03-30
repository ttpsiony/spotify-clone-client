import { useEffect, useContext } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Home, Search, Playlists, Playlist, Tracks, Genre } from '../components';

import context from '../store/context';
import { checkAccessToken } from '../utils/requireAccessToken';

export const RouterWrapper = ({ path = '/', exact, Component = <></>, login = false }) => {
	const history = useHistory();
	const { pathname } = useLocation();
	const { dispatch, state } = useContext(context);
	const {
		auth: { token },
	} = state || {};

	useEffect(() => {
		checkAccessToken({ history, pathname, dispatch, storedToken: token, loginRequired: login });
	}, [history, pathname, dispatch, login, token]);

	return <Route exact={exact} path={path} component={Component} token={token} />;
};

const Routes = () => {
	return (
		<Switch>
			<RouterWrapper exact path="/" Component={Home} login={false} />
			<RouterWrapper exact path="/search" Component={Search} login={false} />
			<RouterWrapper exact path="/search/:query" Component={Search} login={false} />
			<RouterWrapper exact path="/playlist/:pUid" Component={Playlist} login={false} />
			<RouterWrapper exact path="/genre/:gUid" Component={Genre} login={false} />
			<RouterWrapper exact path="/collection/playlists" Component={Playlists} login={true} />
			<RouterWrapper exact path="/collection/tracks" Component={Tracks} login={true} />
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
