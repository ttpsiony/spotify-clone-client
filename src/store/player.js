import { actions, ActionTypes } from './action';
// import callAPI from '../utils/api';

class Player {
	#_player;
	#device_id;

	init() {
		this.#_player = new window.Spotify.Player({
			name: 'Side Project - Spotify Clone',
			getOAuthToken: (callback) => {
				// Run code to get a fresh access token
				const state = window?.__store__?.getState() || {};
				const { token: access_token } = state?.auth || {};

				if (access_token) {
					callback(access_token);
				}
			},
		});

		// window.__SpotifyClonePlayer = this.#_player;
		this.registerEvent();
	}

	registerEvent() {
		const player = this.#_player;

		if (!player) return;

		// error ...
		player.addListener('initialization_error', ({ message }) => {
			console.error('Failed to initialize', message);
		});
		player.addListener('authentication_error', ({ message }) => {
			console.error('Failed to authenticate', message);
		});
		player.addListener('playback_error', ({ message }) => {
			console.error('Failed to perform playback', message);
		});

		//player Ready
		player.addListener('ready', ({ device_id }) => {
			console.log('Ready with Device ID');

			this.#device_id = device_id;
			// window?.__store__?.dispatch(actions.storeDeviceId(device_id));
		});
		// Not Ready
		player.addListener('not_ready', ({ device_id }) => {
			console.log('Device ID has gone offline');
		});

		//
		//
		// player
		player.addListener('player_state_changed', (state) => {
			const {
				paused,
				position: position_ms,
				track_window: { current_track },
			} = state || {};
			// console.log('current_track', current_track);
			// console.log('position', position_ms);

			paused && window?.__store__?.dispatch({ type: ActionTypes.PLAYER_PAUSE });
			!paused && window?.__store__?.dispatch({ type: ActionTypes.PLAYER_PLAY });
			window?.__store__?.dispatch(
				actions.setCurrentPlayTrack({ track: { ...current_track } } || {}),
			);
			paused && window?.__store__?.dispatch(actions.setPlayTrackPosition(position_ms));
		});
	}

	destroyEvent() {
		const player = this.#_player;
		if (!player) return;

		player.removeListener('initialization_error');
		player.removeListener('authentication_error');
		player.removeListener('playback_error');
		player.removeListener('ready');
		player.removeListener('not_ready');
		player.removeListener('player_state_changed');
	}

	//
	async connect() {
		const connected = await this.#_player.connect();

		if (connected) {
			console.log('Playback SDK connecting...');
		} else {
			console.log('Failed to connect playback SDK');
		}
	}
	disconnect() {
		this.destroyEvent();
		this.#_player && this.#_player.disconnect();
	}

	//
	async play(uri) {
		const state = window?.__store__?.getState() || {};
		const trackPosition = state?.trackPosition || 0;
		const { token: access_token } = state?.auth || {};

		fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.#device_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
			body: JSON.stringify({ uris: [uri], position_ms: trackPosition }),
		});
	}

	async pause() {
		await this.#_player.pause();
	}

	async seek(position_ms) {
		await this.#_player.seek(position_ms);
	}

	async getCurrentState() {
		const state = await this.#_player.getCurrentState();
		const { position = 0 } = state || {};
		// console.log('getCurrentState() position', position);
		// console.log('getCurrentState() paused', state.paused);

		window?.__store__?.dispatch({ type: ActionTypes.PLAYER_POSITION, position_ms: position });
		// paused && window?.__store__?.dispatch({ type: ActionTypes.PLAYER_PAUSE });
		// !paused && window?.__store__?.dispatch({ type: ActionTypes.PLAYER_PLAY });
	}
}

export default Player;
