import React, { useEffect, useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import context from '../store/context';
import { actions } from '../store/action';
import { secondsToHHMMSS } from '../utils/helper';

import Wrapper from './styles/Tracks.style';
import { TracksListWrapper } from './styles/common.style';
import GlyphHeartGrey from '../assets/GlyphHeart-grey.svg';
import LineHeart from '../assets/LineHeart.svg';
import GlyphHeart from '../assets/GlyphHeart.svg';
import MusicNote from '../assets/MusicNote.svg';
import Clock from '../assets/Clock.svg';
import Play from '../assets/Play.svg';
import Pause from '../assets/Pause.svg';

function Track() {
	const history = useHistory();
	const { state, dispatch } = useContext(context);
	const [showContextMenuById, setShowContextMenuById] = useState({ id: '', x: '', y: '' });
	const {
		auth: { token, user_id },
		collectionTrackList = {},
		collectionPlaylists = {},
		isTrackPlaying,
	} = state || {};
	const { items: trackList = [] } = collectionTrackList;
	const { track = {} } = state?.currentTrack || {};

	useEffect(() => {
		token && dispatch(actions.getUserCollectionTracks({ limit: 50, offset: 0 }));
		return () => {};
	}, [dispatch, token]);

	const goToSearch = (e) => {
		e.preventDefault();

		history.push('/search');
	};

	const onCollectionMusicHandler = async (e, id, isCollected) => {
		e.preventDefault();

		if (isCollected) {
			await dispatch(actions.deleteTrackFromCollection({ track_id: id }));
		}

		await dispatch(actions.getUserCollectionTracks({ limit: 50, offset: 0 }));
	};

	// 播放清單列表點擊右鍵的行為
	const toggleContextMenu = (e, id) => {
		if (e.type === 'blur') {
			setShowContextMenuById({ id: '', x: '', y: '' });
			return;
		}

		if (e.type === 'contextmenu' && token) {
			e.preventDefault();
			const multiple = 2;
			const ratio = 2 / 3;

			const left = e.clientX < window.innerWidth * ratio ? e.clientX + 15 : e.clientX - 215;
			const top =
				e.clientY < window.innerHeight * ratio ? e.clientY + 10 : e.clientY - multiple * 40;

			setShowContextMenuById({ id: id, x: left, y: top });

			return;
		}
	};

	const onTogglePlayHandler = (e, item = {}) => {
		e.preventDefault();
		e.stopPropagation();

		const { track: itemTrack } = item;

		if (!token) {
			dispatch(actions.toggleModal({ showModal: true, modalType: 'prompt' }));
			return;
		}

		dispatch(actions.setCurrentPlayTrack(item || {}));
		if (itemTrack.id === track.id) {
			!isTrackPlaying && track?.uri && dispatch(actions.play(itemTrack?.uri));
			isTrackPlaying && dispatch(actions.pause());
		} else {
			dispatch(actions.setPlayTrackPosition(0));
			isTrackPlaying && dispatch(actions.pause());
			itemTrack?.uri && dispatch(actions.play(itemTrack?.uri));
		}
	};

	// value
	const currentPlayingTrackId = useMemo(() => track?.id || '', [track]);

	// render
	const renderTrackContextMenu = (track_id) => {
		if (showContextMenuById.id !== track_id) return null;

		const userPlaylists = collectionPlaylists?.items?.filter((list) => list?.owner?.id === user_id);
		return (
			<TrackContextMenu
				position={{ x: showContextMenuById.x, y: showContextMenuById.y }}
				userPlaylists={userPlaylists || {}}
				track_id={track_id}
			/>
		);
	};
	const renderTrack = (track, idx) => {
		const track_id = item?.track?.id || '';
		const imageSrc = item?.track?.album?.images[0]?.url || '';
		const albumName = item?.track?.album?.name || '';
		const artists = item?.track?.artists || [];
		const is_collected = item?.track?.is_collected || false;
		// TODO: format time
		const added_at = new Date(item?.added_at).toLocaleDateString();
		const duration = Math.round((item.track?.duration_ms || 0) / 1000);
		const isPlaying = currentPlayingTrackId === track_id && isTrackPlaying;

		return (
			<div
				className={cx('tracks__list-item', { active: isPlaying })}
				key={`track-item-${idx + 1}`}
				tabIndex="0"
				onBlur={toggleContextMenu}
				onContextMenu={(e) => toggleContextMenu(e, track_id)}
			>
				<div className="tracks__list-item__index">
					<span>{idx + 1}</span>
					<button onClick={(e) => onTogglePlayHandler(e, item)}>
						<img src={isPlaying ? Pause : Play} alt={`${isPlaying ? 'pause' : 'play'}`} />
					</button>
				</div>
				<div className="tracks__list-item__basic">
					<img src={imageSrc} alt="track cover" />
					<div className="name">
						<div>{albumName}</div>
						<div>{artists.map((art) => art.name).join('、')}</div>
					</div>
				</div>
				<div className="tracks__list-item__album album-name">{albumName}</div>
				<div className="tracks__list-item__created-time added-time">{added_at}</div>
				<div className="tracks__list-item__status">
					<button
						className={cx({ collected: is_collected })}
						onClick={(e) => onCollectionMusicHandler(e, track_id, is_collected)}
					>
						<img
							src={is_collected ? GlyphHeart : LineHeart}
							alt={is_collected ? 'glyph heart' : 'line heart'}
						/>
					</button>
					<span>{secondsToHHMMSS(duration)}</span>
				</div>

				{renderTrackContextMenu(track_id)}
			</div>
		);
	};

	return (
		<Wrapper>
			<div className="tracks__banner">
				<div className="tracks__banner-icon">
					<img src={GlyphHeartGrey} alt="glyph heart grey" />
				</div>
				<div className="tracks__banner-text">
					<div className="tracks__banner-text__list">播放清單</div>
					<div className="tracks__banner-text__title">已按讚的歌曲</div>
					<div className="tracks__banner-text__total">共 {trackList.length} 首歌</div>
				</div>
			</div>
			{trackList.length === 0 && (
				<div className="tracks__list-empty">
					<img src={MusicNote} alt="music note" />
					<div className="tracks__list-empty__desc-1">你按讚的歌曲將會顯示在這裡</div>
					<div className="tracks__list-empty__desc-2">點選心形圖示以儲存歌曲。</div>
					<button onClick={goToSearch}>尋找歌曲</button>
				</div>
			)}
			{trackList.length > 0 && (
				<TracksListWrapper>
					<div className="tracks__list-wrapper">
						<div className="tracks__list-item list-item__header">
							<div className="tracks__list-item__index">#</div>
							<div className="tracks__list-item__name">標題</div>
							<div className="tracks__list-item__album">專輯</div>
							<div className="tracks__list-item__created-time">已新增日期</div>
							<div className="tracks__list-item__status">
								<img src={Clock} alt="clock" />
							</div>
						</div>
						{trackList.map(renderTrack)}
					</div>
				</TracksListWrapper>
			)}
		</Wrapper>
	);
}

function TrackContextMenu({ position = {}, userPlaylists = [], track_id }) {
	const { dispatch } = useContext(context);
	const [showPlaylists, setShowPlaylists] = useState(false);

	const removeTrackFromCollection = async (e) => {
		e.preventDefault();
		await dispatch(actions.deleteTrackFromCollection({ track_id: track_id }));
		await dispatch(actions.getUserCollectionTracks({ limit: 50, offset: 0 }));
	};

	const onToggleUserPlaylists = (boolean) => {
		setShowPlaylists(!!boolean);
	};

	const addToPlaylist = (e, playlist_id) => {
		e.preventDefault();
		dispatch(actions.postAddTrackToPlaylist({ playlist_id, track_id }));
	};

	// render
	const renderUserPlaylists = (list) => {
		const playlist_id = (list.uri || '').split(':').pop() || '';
		return (
			<div key={playlist_id} onClick={(e) => addToPlaylist(e, playlist_id)}>
				{list?.name}
			</div>
		);
	};
	const renderStyling = () => {
		const left = position.x + 200 + 150 + 50 < window.innerWidth ? '100%' : '-105%';
		const top = position.y + (userPlaylists.length + 1) * 40 < window.innerHeight ? '0px' : '';
		const bottom = position.y + (userPlaylists.length + 1) * 40 >= window.innerHeight ? '0px' : '';

		return { left, top, bottom };
	};

	return (
		<div
			className="contextmenu-container"
			style={{ left: `${position.x}px`, top: `${position.y}px` }}
		>
			<div onMouseDown={removeTrackFromCollection}>從「已按讚的歌曲」移除</div>
			<div
				className="add-track-to-playlist"
				onMouseEnter={() => onToggleUserPlaylists(true)}
				onMouseLeave={() => onToggleUserPlaylists(false)}
			>
				<div>新增至「播放清單」</div>
				{showPlaylists && userPlaylists.length > 0 && (
					<div className="user-playlists" style={renderStyling()}>
						{userPlaylists.map(renderUserPlaylists)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Track;
