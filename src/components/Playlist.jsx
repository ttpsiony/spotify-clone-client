import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import Wrapper from './styles/Playlist.style';
import { TracksListWrapper } from './styles/common.style';

import context from '../store/context';
import { actions } from '../store/action';
import { secondsToHHMMSS } from '../utils/helper';

import LineHeart from '../assets/LineHeart.svg';
import GlyphHeart from '../assets/GlyphHeart.svg';
import Clock from '../assets/Clock.svg';
import Play from '../assets/Play.svg';
import Pause from '../assets/Pause.svg';

const Playlist = () => {
	const { state, dispatch } = useContext(context);
	const { pUid } = useParams();
	const [showContextMenuById, setShowContextMenuById] = useState({ id: '', x: '', y: '' });
	const {
		auth: { token, user_id },
		playlistTracks,
		collectionPlaylists,
		isTrackPlaying,
	} = state || {};

	const { track = {} } = state?.currentTrack || {};

	useEffect(() => {
		dispatch(actions.getPlaylistTracksById({ playlist_id: pUid }));
		user_id && dispatch(actions.checkUserFollowingPlaylist({ user_id, playlist_id: pUid }));

		return () => {
			// 不知道需不需要 reset...
			dispatch(actions.resetPlaylistTracks());
		};
	}, [dispatch, pUid, user_id]);

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

	const onCollectionMusicHandler = async (e, id, isCollected) => {
		e.preventDefault();

		if (!token) {
			dispatch(actions.toggleModal({ showModal: true, modalType: 'prompt' }));
			return;
		}

		if (isCollected) {
			await dispatch(actions.deleteTrackFromCollection({ track_id: id }));
		} else {
			await dispatch(actions.putTrackToCollection({ track_id: id }));
		}

		await dispatch(actions.getPlaylistTracksById({ playlist_id: pUid }));
	};

	const onCollectionPlaylistHandler = (e) => {
		e.preventDefault();

		if (!token) {
			dispatch(actions.toggleModal({ showModal: true, modalType: 'prompt' }));
			return;
		}

		if (playlistTracks.isPlaylistFollowed) {
			dispatch(actions.deleteUserFollowingPlaylist({ user_id, playlist_id: pUid }));
		} else {
			dispatch(actions.putUserFollowingPlaylist({ user_id, playlist_id: pUid }));
		}
	};

	// 播放清單列表點擊右鍵的行為
	const toggleContextMenu = (e, id, isUserPlaylist) => {
		if (e.type === 'click') {
			e.preventDefault();
			e.stopPropagation();
			setShowContextMenuById({ id: '', x: '', y: '' });
			return;
		}

		if (e.type === 'blur') {
			setShowContextMenuById({ id: '', x: '', y: '' });
			return;
		}

		if (e.type === 'contextmenu' && token) {
			e.preventDefault();
			const multiple = isUserPlaylist ? 3 : 2;
			const ratio = 2 / 3;

			const left = e.clientX < window.innerWidth * ratio ? e.clientX + 15 : e.clientX - 215;
			const top =
				e.clientY < window.innerHeight * ratio ? e.clientY + 10 : e.clientY - multiple * 40;

			setShowContextMenuById({ id: id, x: left, y: top });
			return;
		}
	};

	// value
	const currentPlayingTrackId = useMemo(() => track?.id || '', [track]);

	// render
	const renderTrackContextMenu = (track_id, is_collected) => {
		if (showContextMenuById.id !== track_id) return null;

		return (
			<TrackContextMenu
				position={{ x: showContextMenuById.x, y: showContextMenuById.y }}
				isUserPlaylist={isUserPlaylist}
				userPlaylists={
					collectionPlaylists?.items?.filter((list) => list?.owner?.id === user_id) || []
				}
				user_id={user_id}
				track_id={track_id}
				pUid={pUid}
				is_collected={is_collected}
				onCollectionMusicHandler={onCollectionMusicHandler}
			/>
		);
	};
	const renderTracks = (item, idx) => {
		const track_id = item?.track?.id || '';
		const imageSrc = item?.track?.album?.images[0]?.url || '';
		const name = item?.track?.name || '';
		const albumName = item?.track?.album?.name || '';
		const artists = item?.track?.artists || [];
		const is_collected = item.is_collected || false;
		const isUserPlaylist = playlistTracks?.owner?.id === user_id;
		const added_at = new Date(item?.added_at).toLocaleDateString();
		const duration = Math.round((item.track?.duration_ms || 0) / 1000);
		const isPlaying = currentPlayingTrackId === track_id && isTrackPlaying;

		return (
			<div
				className={cx('tracks__list-item', { active: isPlaying })}
				key={`track-item-${idx + 1}`}
				tabIndex="0"
				onClick={toggleContextMenu}
				onBlur={toggleContextMenu}
				onContextMenu={(e) => toggleContextMenu(e, track_id, isUserPlaylist)}
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
						<div>{name}</div>
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
				{renderTrackContextMenu(track_id, is_collected)}
			</div>
		);
	};

	return (
		<Wrapper>
			<div className="playlist__banner">
				<div className="playlist__banner-icon">
					{playlistTracks?.images && playlistTracks?.images[0]?.url && (
						<img src={playlistTracks.images[0].url} alt="list cover" />
					)}
				</div>
				<div className="playlist__banner-text">
					<div className="playlist__banner-text__list">播放清單</div>
					<div className="playlist__banner-text__title">{playlistTracks?.name}</div>
					<div className="playlist__banner-text__desc">
						{playlistTracks?.description?.replace(/<[^>]*>/g, '')}
					</div>
					<div className="playlist__banner-text__detail">
						<span>{playlistTracks?.owner?.display_name || ''}</span>
						<span className="dot"></span>
						<span>{playlistTracks?.followers?.total || 0} 人按讚</span>
						<span className="dot"></span>
						<span>{playlistTracks?.tracks?.total || 0} 首歌</span>
					</div>
					<div className="playlist__banner-text__collection">
						<button onClick={onCollectionPlaylistHandler}>
							{playlistTracks.isPlaylistFollowed ? (
								<img src={GlyphHeart} alt="glyph heart" />
							) : (
								<img src={LineHeart} alt="line heart" />
							)}
						</button>
					</div>
				</div>
			</div>
			{playlistTracks?.tracks?.items?.length > 0 && (
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

						{playlistTracks?.tracks?.items?.map(renderTracks)}
					</div>
				</TracksListWrapper>
			)}
		</Wrapper>
	);
};

function TrackContextMenu({
	position = {},
	isUserPlaylist = false,
	userPlaylists = [],
	track_id,
	pUid,
	is_collected,
	onCollectionMusicHandler,
}) {
	const { dispatch } = useContext(context);
	const [showPlaylists, setShowPlaylists] = useState(false);
	// contextmenu click
	const onClickContextMenuItemHandler = (e, action) => {
		e.preventDefault();

		action === 'save_or_delete' && onCollectionMusicHandler(e, track_id, is_collected);

		action === 'delete' &&
			dispatch(actions.deleteTrackFromPlaylist({ playlist_id: pUid, track_id }));
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
			<div onMouseDown={(e) => onClickContextMenuItemHandler(e, 'save_or_delete')}>
				{is_collected ? '從「已按讚的歌曲」移除' : '儲存至「已按讚的歌曲」'}
			</div>
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
			{isUserPlaylist && (
				<div onMouseDown={(e) => onClickContextMenuItemHandler(e, 'delete')}>
					從此播放清單中移除
				</div>
			)}
		</div>
	);
}

export default Playlist;
