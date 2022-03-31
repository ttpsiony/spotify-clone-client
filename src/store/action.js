import Cookies from 'universal-cookie';

import callAPI from '../utils/api';
import {
	DOMAIN,
	COOKIES_ACCESS_TOKEN_KEY,
	CSRF_STATE_STORED_KEY,
	queryStringGenerator,
	sleep,
} from '../utils/helper';

const cookies = new Cookies();

// TODO: error handling issue
// TODO: split reducer
export const ActionTypes = {
	LOADING: 'LOADING',
	AUTH_LOADING: 'AUTH_LOADING',
	TOGGLE_MODAL: 'TOGGLE_MODAL',

	USER_LOGIN: 'USER_LOGIN',
	USER_LOGOUT: 'USER_LOGOUT',
	AUTH_DATA: 'AUTH_DATA',
	DEVICE_ID: 'DEVICE_ID',

	SET_CURRENT_PLAY_TRACK: 'SET_CURRENT_PLAY_TRACK',
	PLAYER_PLAY: 'PLAYER_PLAY',
	PLAYER_PAUSE: 'PLAYER_PAUSE',
	PLAYER_POSITION: 'PLAYER_POSITION',

	GET_FEATURED_PLAYLISTS: 'GET_FEATURED_PLAYLISTS',
	GET_SEARCH_OUTCOME: 'GET_SEARCH_OUTCOME',
	REST_SEARCH_OUTCOME: 'REST_SEARCH_OUTCOME',
	GET_CATEGORY_LIST: 'GET_CATEGORY_LIST',
	GET_CATEGORY_PLAYLISTS_BY_ID: 'GET_CATEGORY_PLAYLISTS_BY_ID',
	RESET_CATEGORY_PLAYLISTS: 'RESET_CATEGORY_PLAYLISTS',
	GET_PLAYLIST_TRACKS_BY_ID: 'GET_PLAYLIST_TRACKS_BY_ID',
	RESET_PLAYLIST_TRACKS: 'RESET_PLAYLIST_TRACKS',

	//
	POST_USER_PROFILE: 'POST_USER_PROFILE',
	POST_USER_PLAYLISTS: 'POST_USER_PLAYLISTS',

	GET_USER_COLLECTION_TRACKS: 'GET_USER_COLLECTION_TRACKS',

	CHECK_USER_FOLLOWING_PLAYLIST: 'CHECK_USER_FOLLOWING_PLAYLIST',
};

// TODO: 跳出成功/失敗提示...
export const actions = {
	toggleLoadingState: (loading = false) => ({
		type: ActionTypes.LOADING,
		payload: {
			loading: !!loading,
		},
	}),

	toggleModal: ({ showModal = false, modalType = '' }) => ({
		type: ActionTypes.TOGGLE_MODAL,
		payload: { showModal, modalType },
	}),

	login: () => {
		return async ({ dispatch }) => {
			try {
				const { data = {} } = await callAPI.post('/v1/auth/login');
				const { url, csrf_state } = data;
				if (!url || !csrf_state) return;

				sessionStorage.setItem(CSRF_STATE_STORED_KEY, csrf_state);
				dispatch({ type: ActionTypes.USER_LOGIN, payload: { token: '', use_id: '' } });

				window.location.href = url;
				//
			} catch (error) {
				console.error(error);
			}
		};
	},
	toggleAuthLoading: (boolean = null) => ({
		type: ActionTypes.AUTH_LOADING,
		payload: {
			authLoading: !!boolean,
		},
	}),

	storeDeviceId: (device_id) => ({
		type: ActionTypes.DEVICE_ID,
		device_id,
	}),
	// 存 OAuth 的資料 (access_token、refresh_token、...)
	storeOAuthData: ({ payload }) => ({
		type: ActionTypes.AUTH_DATA,
		payload,
	}),
	postRetrieveAccessToken: ({ code, state }) => {
		return async ({ history, dispatch }) => {
			try {
				dispatch(actions.toggleAuthLoading(true));
				history.replace('/');
				await sleep(100);
				dispatch(actions.toggleAuthLoading(true));

				const { data = {} } = await callAPI.post('/v1/auth/callback', { code, state });
				const expires_timestamp = +new Date() + 3600 * 1000;
				const expires = new Date(expires_timestamp);
				const options = { path: '/', domain: DOMAIN, maxAge: data.expires_in || 3600, expires };
				cookies.set(COOKIES_ACCESS_TOKEN_KEY, data.access_token, options);

				//
				dispatch(actions.postUserProfile());
				dispatch(actions.storeOAuthData({ payload: data }));

				dispatch(actions.toggleAuthLoading(false));
			} catch (error) {
				console.error(error);
				dispatch(actions.toggleAuthLoading(false));
				history.push('/login');
			}
		};
	},
	putRetrieveAccessToken: () => {
		// TODO: retrieve access_token with refresh_token
		// TODO: store refresh_token and set timer (use Web Worker maybe...)
	},

	logout: ({ redirect }) => {
		return async ({ dispatch, history }, { player }) => {
			dispatch({ type: ActionTypes.USER_LOGOUT, payload: { token: '', user_id: '' } });

			const options = { path: '/', domain: DOMAIN };
			cookies.remove(COOKIES_ACCESS_TOKEN_KEY, options);

			if (redirect) {
				await sleep(500);
				await player.disconnect();

				history.push('/');
			}
		};
	},

	// 當前播放 track
	setPlayTrackPosition: (position_ms) => {
		return ({ dispatch }) => {
			dispatch({ type: ActionTypes.PLAYER_POSITION, position_ms });
		};
	},
	setCurrentPlayTrack: (track) => {
		return async ({ dispatch }) => {
			dispatch({ type: ActionTypes.SET_CURRENT_PLAY_TRACK, payload: track });
		};
	},
	play: (uri) => {
		return async ({ dispatch }, { player }) => {
			await player.play(uri);

			dispatch({ type: ActionTypes.PLAYER_PLAY });
		};
	},
	pause: () => {
		return async ({ dispatch }, { player }) => {
			await player.pause();

			dispatch({ type: ActionTypes.PLAYER_PAUSE });
		};
	},
	seek: (position_ms) => {
		return async ({ dispatch }, { player }) => {
			await player.seek(position_ms);

			dispatch(actions.setPlayTrackPosition(position_ms));
		};
	},

	//
	//
	//
	//
	// 首頁，取得播放列表
	getFeaturedPlaylists: () => {
		return async ({ dispatch }) => {
			try {
				const { data } = await callAPI.get(`/v1/featured-playlists`);

				dispatch({ type: ActionTypes.GET_FEATURED_PLAYLISTS, payload: data });
			} catch (error) {
				console.error(error);
			}
		};
	},

	// 搜尋
	getSearchOutcome: (value) => {
		return async ({ dispatch }) => {
			try {
				if (!value) return;

				const { data } = await callAPI.get(`/v1/search?q=${value}`);

				dispatch({ type: ActionTypes.GET_SEARCH_OUTCOME, data });
			} catch (error) {
				console.error(error);
			}
		};
	},
	resetSearchOutcome: () => ({
		type: ActionTypes.REST_SEARCH_OUTCOME,
	}),
	// 搜尋頁，類別清單
	getAllCategoryList: () => {
		return async ({ dispatch }) => {
			try {
				const { data } = await callAPI.get('/v1/categories');
				const payload = data.items || [];

				dispatch({ type: ActionTypes.GET_CATEGORY_LIST, payload });
			} catch (error) {
				console.error(error);
			}
		};
	},
	getCategoryPlaylistsById: ({ category_id, limit = 50, offset = 0 }) => {
		return async ({ dispatch }) => {
			try {
				const queryString = queryStringGenerator({ category_id, limit, offset });
				const { data = {} } = await callAPI.get(`/v1/categories/playlists?${queryString}`);

				dispatch({
					type: ActionTypes.GET_CATEGORY_PLAYLISTS_BY_ID,
					payload: { ...data },
				});
			} catch (error) {
				console.error(error);
			}
		};
	},
	resetCategoryPlaylists: () => ({
		type: ActionTypes.RESET_CATEGORY_PLAYLISTS,
	}),

	// 取得播放清單曲目 by playlist_id
	getPlaylistTracksById: ({ playlist_id }) => {
		return async ({ dispatch }) => {
			try {
				const { data } = await callAPI.get(`/v1/playlist/${playlist_id}/tracks`);

				dispatch({ type: ActionTypes.GET_PLAYLIST_TRACKS_BY_ID, payload: { ...data } });
			} catch (error) {
				console.error(error);
			}
		};
	},
	resetPlaylistTracks: () => ({
		type: ActionTypes.RESET_PLAYLIST_TRACKS,
	}),

	//
	//
	//
	//
	// 使用者 基本資料
	postUserProfile: () => {
		return async ({ dispatch }) => {
			try {
				const { data } = await callAPI.post('/v1/user/me');
				dispatch({ type: ActionTypes.POST_USER_PROFILE, payload: { ...data } });
			} catch (error) {
				dispatch(actions.logout({ redirect: true }));
			}
		};
	},

	// 使用者 收藏的 playlists 列表
	postUserPlayLists: ({ user_id, limit = 50, offset = 0 }) => {
		return async ({ dispatch }) => {
			try {
				const { data } = await callAPI.post(`/v1/user/playlists`, { user_id, limit, offset });

				dispatch({ type: ActionTypes.POST_USER_PLAYLISTS, payload: data });
			} catch (error) {
				console.error(error);
			}
		};
	},

	// 取得使用者加入 已按讚的歌曲 清單
	getUserCollectionTracks: ({ offset = 0, limit = 50 }) => {
		return async ({ dispatch }) => {
			try {
				const { data } = await callAPI.get(`/v1/user/tracks`, { market: 'TW', limit, offset });

				dispatch({ type: ActionTypes.GET_USER_COLLECTION_TRACKS, payload: data });
			} catch (error) {
				console.error(error);
			}
		};
	},

	// 使用者加入/移除收藏的音樂(已按讚的歌曲)
	putTrackToCollection: ({ track_id }) => {
		return async () => {
			try {
				await callAPI.put(`/v1/user/track/${track_id}/collection`);
			} catch (error) {
				console.error(error);
			}
		};
	},
	deleteTrackFromCollection: ({ track_id }) => {
		return async () => {
			try {
				await callAPI.delete(`/v1/user/track/${track_id}/collection`);
			} catch (error) {
				console.error(error);
			}
		};
	},

	// 新增/移除歌曲(track)根據使用者播放列表(playlist)
	postAddTrackToPlaylist: ({ playlist_id, track_id }) => {
		return async ({ dispatch }) => {
			try {
				await callAPI.post(`/v1/user/playlists/${playlist_id}/track`, {
					track_id,
				});

				dispatch(actions.getPlaylistTracksById({ playlist_id }));
			} catch (error) {
				console.error(error);
			}
		};
	},
	deleteTrackFromPlaylist: ({ playlist_id, track_id }) => {
		return async ({ dispatch }) => {
			try {
				await callAPI.delete(`/v1/user/playlists/${playlist_id}/track`, { track_id });

				dispatch(actions.getPlaylistTracksById({ playlist_id }));
			} catch (error) {
				console.error(error);
			}
		};
	},

	// 使用者播放清單(playlist)是否追蹤/追蹤清單/移除追蹤
	checkUserFollowingPlaylist: ({ user_id, playlist_id }) => {
		return async ({ dispatch }) => {
			try {
				const { data = [] } = await callAPI.get(`/v1/user/playlist/${playlist_id}/follow`, {
					user_id,
				});

				dispatch({ type: ActionTypes.CHECK_USER_FOLLOWING_PLAYLIST, payload: data[0] || false });
			} catch (error) {
				console.error(error);
			}
		};
	},
	putUserFollowingPlaylist: ({ user_id, playlist_id }) => {
		return async ({ dispatch }) => {
			try {
				await callAPI.put(`/v1/user/playlist/${playlist_id}/follow`);

				await dispatch(actions.checkUserFollowingPlaylist({ user_id, playlist_id }));
				await dispatch(actions.postUserPlayLists({ user_id }));
			} catch (error) {
				console.error(error);
			}
		};
	},
	deleteUserFollowingPlaylist: ({ user_id, playlist_id }) => {
		return async ({ dispatch }) => {
			try {
				await callAPI.delete(`/v1/user/playlist/${playlist_id}/follow`);

				await dispatch(actions.checkUserFollowingPlaylist({ user_id, playlist_id }));
				await dispatch(actions.postUserPlayLists({ user_id }));
			} catch (error) {
				console.error(error);
			}
		};
	},
	putUserPlaylistDetail: ({ playlist_id, payload }) => {
		return async ({ dispatch }) => {
			try {
				const state = window?.__store__?.getState();
				const {
					auth: { user_id },
				} = state || {};

				await callAPI.put(`/v1/user/playlist/${playlist_id}/detail`, payload);
				await dispatch(actions.postUserPlayLists({ user_id }));
			} catch (error) {
				console.error(error);
			}
		};
	},
	postCreateUserPlaylist: () => {
		return async ({ dispatch }) => {
			try {
				const state = window?.__store__?.getState();
				const {
					auth: { user_id },
				} = state || {};
				await callAPI.post(`/v1/user/playlist/create?user_id=${user_id}`);

				await dispatch(actions.postUserPlayLists({ user_id }));
			} catch (error) {}
		};
	},
};

//
//
//
export const createThunkMiddleware = (extraArgument) => {
	return ({ dispatch, history }) => {
		return (action) => {
			if (typeof action === 'function') {
				return action({ dispatch, history }, extraArgument);
			}

			return dispatch(action);
		};
	};
};
