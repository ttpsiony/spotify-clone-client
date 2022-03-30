import { createContext } from 'react';

import { ActionTypes } from './action';

export const initialState = {
	// 首頁
	featuredPlaylists: [],

	// 音樂類型清單列表
	musicTypeList: [],
	categoryPlaylists: {},

	// 搜尋結果
	searchingResult: {},

	// 我的音樂庫
	collectionPlaylists: {},

	// 播放清單曲目列表 by playlist_id
	playlistTracks: {},

	// 已按讚的歌曲
	collectionTrackList: {},

	// global state
	loading: false,
	modal: {
		showModal: true,
		modalType: '',
	},
	auth: {
		authLoading: false,
		token: '',
	},
	storedAuthData: {},
	device_id: '',

	currentTrack: {},
	trackPosition: 0,
	isTrackPlaying: false,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.LOADING:
			return {
				...state,
				...action.payload,
			};
		case ActionTypes.AUTH_LOADING:
			return {
				...state,
				auth: {
					...state.auth,
					...action.payload,
				},
			};

		case ActionTypes.TOGGLE_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
				},
			};

		case ActionTypes.USER_LOGIN:
			return {
				...state,
				auth: {
					...state.auth,
					...action.payload,
				},
			};

		case ActionTypes.USER_LOGOUT:
			return {
				...state,
				// 我的音樂庫
				...initialState.collectionPlaylists,
				// 已按讚的歌曲
				...initialState.collectionTrackList,

				// global state
				loading: false,
				...initialState.modal,
				auth: {
					...action.payload,
					...initialState.auth,
				},
				storedAuthData: {},
				device_id: '',

				currentTrack: {},
				trackPosition: 0,
				isTrackPlaying: false,
			};

		case ActionTypes.AUTH_DATA:
			return {
				...state,
				storedAuthData: {
					...state.storedAuthData,
					...action.payload,
				},
			};
		case ActionTypes.DEVICE_ID:
			return {
				...state,
				device_id: action.device_id,
			};

		//
		//
		case ActionTypes.SET_CURRENT_PLAY_TRACK:
			const isSame = state?.currentTrack?.track?.id === action.payload?.track?.id;

			return {
				...state,
				currentTrack: {
					...state.currentTrack,
					...action.payload,
				},
				trackPosition: isSame ? state.trackPosition : 0,
			};
		case ActionTypes.PLAYER_PLAY:
			return {
				...state,
				isTrackPlaying: true,
			};
		case ActionTypes.PLAYER_PAUSE:
			return {
				...state,
				isTrackPlaying: false,
			};
		case ActionTypes.PLAYER_POSITION:
			return {
				...state,
				trackPosition: action?.position_ms || 0,
			};
		//
		//
		case ActionTypes.GET_FEATURED_PLAYLISTS:
			return {
				...state,
				featuredPlaylists: [...(action?.payload || [])],
			};

		case ActionTypes.GET_SEARCH_OUTCOME:
			return {
				...state,
				searchingResult: action?.data || {},
			};

		case ActionTypes.REST_SEARCH_OUTCOME:
			return {
				...state,
				searchingResult: {},
			};

		case ActionTypes.GET_CATEGORY_LIST:
			return {
				...state,
				musicTypeList: [...(action?.payload || [])],
			};

		case ActionTypes.GET_CATEGORY_PLAYLISTS_BY_ID:
			return {
				...state,
				categoryPlaylists: {
					...state.categoryPlaylists,
					...action.payload,
				},
			};

		case ActionTypes.RESET_CATEGORY_PLAYLISTS:
			return {
				...state,
				categoryPlaylists: {},
			};

		case ActionTypes.GET_PLAYLIST_TRACKS_BY_ID:
			return {
				...state,
				playlistTracks: {
					...state.playlistTracks,
					...action.payload,
				},
			};
		case ActionTypes.RESET_PLAYLIST_TRACKS:
			return {
				...state,
				playlistTracks: {},
			};

		//
		// login required
		case ActionTypes.POST_USER_PROFILE:
			return {
				...state,
				auth: {
					...state.auth,
					...action.payload,
				},
			};
		case ActionTypes.POST_USER_PLAYLISTS:
			return {
				...state,
				collectionPlaylists: {
					...state.collectionPlaylists,
					...action.payload,
				},
			};

		case ActionTypes.GET_USER_COLLECTION_TRACKS:
			return {
				...state,
				collectionTrackList: {
					...state.collectionTrackList,
					...action.payload,
				},
			};

		case ActionTypes.CHECK_USER_FOLLOWING_PLAYLIST:
			return {
				...state,
				playlistTracks: {
					...state.playlistTracks,
					isPlaylistFollowed: action.payload,
				},
			};
		default:
			return state;
	}
};

export default createContext(initialState);
