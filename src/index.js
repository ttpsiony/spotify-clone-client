import React, { useEffect, useReducer, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useHistory } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import App from './App';

import { createThunkMiddleware } from './store/action';
import Context, { reducer, initialState } from './store/context';
import Player from './store/player';

import theme from './utils/theme';

export const player = new Player();
const thunk = createThunkMiddleware({ player }); // 模擬 redux-thunk

const ContextProvider = (props) => {
	// BrowserRouter 裡才能產生 history 物件
	const history = useHistory();
	// 與 Redux 不同，沒有 middleware 可以使用
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = async () => {
			console.log('onSpotifyWebPlaybackSDKReady...');

			player.init();
			await player.connect();
		};

		return () => {
			player.disconnect();

			delete window.onSpotifyWebPlaybackSDKReady;
			delete window.__SpotifyClonePlayer;
		};
	}, []);

	// 呼叫 useContext 的 component 總是會在 context 值更新時重新 render。
	// 使用 useMemo(or useCallback)，不然非同步完更新資料後，會產生新的 dispatch，造成無限迴圈
	const newState = useMemo(() => state, [state]);
	const newDispatch = useMemo(() => thunk({ dispatch, history }), [history]);
	window.__store__ = {
		dispatch: newDispatch,
		getState: () => newState,
	};

	return (
		<Context.Provider value={{ state: newState, dispatch: newDispatch }}>
			{props.children}
		</Context.Provider>
	);
};

const ClientIndex = () => {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<ContextProvider>
						<App />
					</ContextProvider>
				</ThemeProvider>
			</BrowserRouter>
		</React.StrictMode>
	);
};

ReactDOM.render(<ClientIndex />, document.getElementById('root'));
