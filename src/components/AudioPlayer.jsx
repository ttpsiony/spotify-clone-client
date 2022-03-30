import React, { useContext, useState, useMemo, useRef } from 'react';
// import { useEffect, useCallback } from 'react';
import cx from 'classnames';

//
import context from '../store/context';
import { actions } from '../store/action';
import { secondsToHHMMSS, progressCurrentTime } from '../utils/helper';

// assets
import AudioPlayerWrapper from './styles/AudioPlayer.style';
import LineHeart from '../assets/LineHeart.svg';
import GlyphHeart from '../assets/GlyphHeart.svg';
import Shuffle from '../assets/Shuffle.svg';
import Backward from '../assets/Backward.svg';
import Play from '../assets/Play.svg';
import Pause from '../assets/Pause.svg';
import Forward from '../assets/Forward.svg';
import Repeat from '../assets/Repeat.svg';
import SoundMax from '../assets/SoundMax.svg';
import SoundMin from '../assets/SoundMin.svg';
import SoundMute from '../assets/SoundMute.svg';

const Copyright = () => {
	const { dispatch } = useContext(context);

	const signUpClickHandler = (e) => {
		e.preventDefault();
		dispatch(actions.toggleModal({ showModal: true, modalType: 'warning' }));
	};

	return (
		<div className="copyright">
			<div>
				<p>
					本網站遵守 Spotify 開發者{' '}
					<a rel="noreferrer" href="https://developer.spotify.com/terms/" target="_blank">
						使用條款
					</a>{' '}
					及{' '}
					<a rel="noreferrer" href="https://developer.spotify.com/policy/" target="_blank">
						政策
					</a>{' '}
					，請尊重音樂所有版權。
				</p>
				<p>本網站是開發者模式，僅為練習使用，並禁止其他用途行為。</p>
				<p className="warning">
					若要聆聽音樂，請使用 Spotify{' '}
					<a rel="noreferrer" href="https://www.spotify.com/tw/" target="_blank">
						網頁播放器
					</a>{' '}
					或{' '}
					<a rel="noreferrer" href="https://www.spotify.com/tw/download" target="_blank">
						下載 APP
					</a>
					。
				</p>
			</div>
			<button className="footer_sign-up-btn" onClick={signUpClickHandler}>
				免費註冊
			</button>
		</div>
	);
};

const CurrentSongInfo = () => {
	const { state, dispatch } = useContext(context);
	const { track = {} } = state?.currentTrack || {};
	const { token = '' } = state?.auth || {};

	const toggleFavoriteSong = async (e) => {
		e.preventDefault();
		// TODO: call api by current user

		if (!token) {
			dispatch(actions.toggleModal({ showModal: true, modalType: 'prompt' }));
			return;
		}
	};

	const name = useMemo(() => {
		return track?.name || '';
	}, [track.name]);

	const artists = useMemo(() => {
		return (track?.artists || []).map((art) => art.name).join(',');
	}, [track.artists]);

	const image = useMemo(() => {
		const { images = [] } = track.album || {};
		return images[0]?.url || '';
	}, [track.album]);

	const isFavorite = useMemo(() => track.is_collected || false, [track]);

	if (!name) {
		return <div className="player-controller__empty"></div>;
	}

	return (
		<div className="player-controller__current-song">
			<picture>{image && <img src={image} alt="album cover" />}</picture>
			<div className="current-song__info">
				<div>{name}</div>
				<div>{artists}</div>
			</div>
			<button
				title={isFavorite ? '從你的音樂庫移除' : '加入到你的音樂庫'}
				onClick={toggleFavoriteSong}
			>
				<img src={isFavorite ? GlyphHeart : LineHeart} alt="toggle favorite" />
			</button>
		</div>
	);
};

const Controller = () => {
	const { state, dispatch } = useContext(context);
	// TODO: play music control
	const [volume, setVolume] = useState(100);
	const [showTimeTip, setShowTimeTip] = useState(false);
	const worker = useRef();
	// const animationFrameId = useRef();

	const { isTrackPlaying } = state || {};
	const { track = {} } = state?.currentTrack || {};
	// console.log('track', track);

	const shuffleClickHandler = (e) => {
		e.preventDefault();
		// TODO: shuffle music
	};

	const backwardClickHandler = (e) => {
		e.preventDefault();
		// TODO: backward music
	};

	const togglePlayHandler = (e) => {
		e.preventDefault();

		if (!isTrackPlaying && track?.uri) {
			worker.current?.postMessage({ startTimer: true });

			dispatch(actions.play(track?.uri));
		} else {
			worker.current?.postMessage({ destroy: true });

			dispatch(actions.pause());
		}
	};

	const forwardClickHandler = (e) => {
		e.preventDefault();
		// TODO: forward music
	};

	const circleMusicClickHandler = (e) => {
		e.preventDefault();
		// TODO: loop music
	};

	const volumeChangeHandler = (e) => {
		const value = e.target.value;
		setVolume(value);
	};

	const volumeMuteHandler = () => {
		setVolume(0);
	};

	// progress
	const onProgressClick = (e) => {
		e.stopPropagation();

		const { seekingTime = 0 } = progressCurrentTime(e, duration_ms / 1000);
		dispatch(actions.seek(seekingTime * 1000));
	};

	const onProgressMousemove = (e) => {
		e.stopPropagation();

		const { x = 0, seekingTime = 0 } = progressCurrentTime(e, duration_ms / 1000);
		const format = secondsToHHMMSS(seekingTime);

		const tip = document.getElementById('time-tip');
		if (tip) {
			tip.style.left = `${x}px`;
			tip.textContent = format;
		}
	};
	const onProgressMouseEnter = (e) => {
		setShowTimeTip(true);
	};
	const onProgressMouseLeave = (e) => {
		setShowTimeTip(false);
	};

	// value
	const name = useMemo(() => track?.name || '', [track.name]);

	const duration_ms = useMemo(() => track?.duration_ms || 0, [track.duration_ms]);

	// const _percentage = (time = 0, duration = 0) => {
	// 	if (time <= 0) return 0;
	// 	if (time >= duration) return 100;
	// 	const percent = parseFloat(((time / duration) * 100).toFixed(5));
	// 	return percent || 0;
	// };
	// const _setCurrentProgress = useCallback(
	// 	(totalTime) => {
	// 		const percent = _percentage(totalTime, duration_ms / 1000);
	// 		const progress = document.getElementById('progress-bar__bar-inner');
	// 		if (progress) {
	// 			progress.style.width = `${percent}%`;
	// 		}
	// 	},
	// 	[duration_ms],
	// );
	// const _setCurrentTime = (totalTime) => {
	// 	const currentTime = document.getElementById('progress-bar__current-time');
	// 	if (currentTime) {
	// 		currentTime.innerHTML = secondsToHHMMSS(totalTime);
	// 	}
	// };

	// useEffect(() => {
	// 	// TODO: undone..
	// 	if (window.Worker) {
	// 		worker.current = new Worker('/Worker.js');
	// 		worker.current.onmessage = (e) => {
	// 			const { totalTime = 0 } = e?.data || {};
	// 			console.log(totalTime);

	// 			const time = Math.floor(trackPosition / 1000 + totalTime);
	// 			_setCurrentProgress(time);
	// 			_setCurrentTime(time);
	// 		};
	// 	}

	// 	return () => {
	// 		worker.current?.terminate();
	// 	};
	// }, [duration_ms, _setCurrentProgress, trackPosition]);

	if (!name) {
		return (
			<div className="player-controller__empty-control-bar">
				<span>[僅為練習使用]</span> Choose a song, and start to enjoy it.
			</div>
		);
	}

	return (
		<>
			<div className="player-controller__control-bar">
				<div className="controller-bar">
					<div className="controller-bar__left">
						<button title="啟用隨機播放" onClick={shuffleClickHandler}>
							<img src={Shuffle} alt="shuffle" />
						</button>
						<button title="上一步" onClick={backwardClickHandler}>
							<img src={Backward} alt="backward" />
						</button>
					</div>
					<button
						title={isTrackPlaying ? '暫停' : '播放'}
						className="controller-bar__center"
						onClick={togglePlayHandler}
					>
						<img
							src={isTrackPlaying ? Pause : Play}
							alt={`${isTrackPlaying ? 'pause' : 'play'}`}
							style={{ marginLeft: isTrackPlaying ? '' : '4px' }}
						/>
					</button>
					<div className="controller-bar__right">
						<button title="下一步" onClick={forwardClickHandler}>
							<img src={Forward} alt="forward" />
						</button>
						<button title="啟用重複播放" onClick={circleMusicClickHandler}>
							<img src={Repeat} alt="repeat" />
						</button>
					</div>
				</div>
				<div className="progress-bar">
					<div id="progress-bar__current-time" className="progress-bar__time">
						0:00
					</div>
					<div
						className="progress-bar__bar-outer"
						onClick={onProgressClick}
						onMouseEnter={onProgressMouseEnter}
						onMouseMove={onProgressMousemove}
						onMouseLeave={onProgressMouseLeave}
					>
						<div
							id="progress-bar__bar-inner"
							className="progress-bar__bar-inner"
							style={{ width: `0%` }}
						></div>
						{showTimeTip && <span id="time-tip" className="time-tip"></span>}
					</div>
					<div className="progress-bar__time">{secondsToHHMMSS(duration_ms / 1000)}</div>
				</div>
			</div>
			<div className="player-controller__other-controls">
				<button title="靜音" onClick={volumeMuteHandler}>
					{volume > 50 && <img src={SoundMax} alt="sound max" />}
					{volume > 0 && volume < 50 && <img src={SoundMin} alt="sound min" />}
					{+volume === 0 && <img src={SoundMute} alt="sound mute" />}
				</button>
				<label className="progress-bar__progress">
					<input
						id="volume-range"
						type="range"
						min="0"
						max="100"
						step="1"
						onChange={volumeChangeHandler}
					/>
					<div className="progress-bar__progress-inner" style={{ width: `${volume}%` }}></div>
				</label>
			</div>
		</>
	);
};

function AudioPlayer({ hasToken }) {
	return (
		<AudioPlayerWrapper className={cx({ noToken: !hasToken })}>
			{hasToken && <CurrentSongInfo />}
			{hasToken && <Controller />}
			{!hasToken && <Copyright />}
		</AudioPlayerWrapper>
	);
}

export default AudioPlayer;
