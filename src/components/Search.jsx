import React, {
	useContext,
	useEffect,
	useState,
	useMemo,
	useImperativeHandle,
	useRef,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import context from '../store/context';
import { actions } from '../store/action';

import Wrapper from './styles/Search.style';
import { secondsToHHMMSS } from '../utils/helper';

import Play from '../assets/Play.svg';
// import Pause from '../assets/Pause.svg';
import MoreVertical from '../assets/MoreVertical.svg';

const Search = () => {
	const history = useHistory();
	const { query = '' } = useParams();
	const { state, dispatch } = useContext(context);
	const { auth = {}, musicTypeList = [], searchingResult = {} } = state || {};

	useEffect(() => {
		!query && dispatch(actions.getAllCategoryList());
		query && dispatch(actions.getSearchOutcome(query));

		return () => {
			if (query !== '') {
				dispatch(actions.resetSearchOutcome());
			}
		};
	}, [dispatch, query]);

	const searchItemClickHandler = (e, href) => {
		e.preventDefault();

		const id = (href || '').split('/').pop() || '';

		if (id) {
			history.push(`/genre/${id}`);
		}
	};

	// render
	const renderMusicType = (item, i) => {
		return (
			<div
				key={`item-${i + 1}`}
				className="search__item"
				data-item-index={i}
				onClick={(e) => searchItemClickHandler(e, item.href)}
				style={{ backgroundColor: item.color || '#F1F2F3' }}
			>
				<h3 className="search__item-name">{item.name}</h3>
				<div className="search__item-cover">
					{item?.icons[0]?.url && <img src={item?.icons[0]?.url} alt="search item cover" />}
				</div>
			</div>
		);
	};

	if (!query) {
		return (
			<Wrapper className="search">
				<h2>瀏覽全部</h2>
				<div className="search__item-list-container">{musicTypeList?.map(renderMusicType)}</div>
			</Wrapper>
		);
	}

	return (
		<Wrapper className="search">
			<Tracks query={query} />

			<Playlists auth={auth} searchingResult={searchingResult} />
		</Wrapper>
	);
};

function Tracks(props) {
	const { state, dispatch } = useContext(context);
	const { auth, collectionPlaylists, searchingResult } = state;

	const MoreOperationRef = useRef();

	const onViewMoreTracks = (e) => {
		e.stopPropagation();
	};

	const onPlayClick = () => {
		if (!auth?.token) {
			dispatch(actions.toggleModal({ showModal: true, modalType: 'prompt' }));
			return;
		}
	};

	if (!searchingResult?.tracks?.length) return null;

	//
	// render
	const renderTracks = (item, i) => {
		const track_id = item?.id || '';
		const is_collected = item?.is_collected || false;
		const cover = item?.album?.images[0]?.url || '';
		const track_name = item?.name || '';
		const artists = item?.artists?.map((artist) => artist.name).join('、');
		const duration = Math.round((item?.duration_ms || 0) / 1000);

		return (
			<div
				key={item.id || `track-${i + 1}`}
				className="track"
				onMouseLeave={(e) => MoreOperationRef.current?.inActiveMoreBtn()}
			>
				<div className="track-cover">
					{cover && <img className="track-cover__img" src={cover} alt="track album cover" />}
					<img src={Play} alt="play" onClick={onPlayClick} />
				</div>
				<div className="track-name">
					<div className="track-name__name">{track_name}</div>
					<div className="track-name__artist">{artists}</div>
				</div>
				<div className="track-time">{secondsToHHMMSS(duration)}</div>
				<div className="track-operation">
					<MoreOperation
						ref={MoreOperationRef}
						dispatch={dispatch}
						auth={auth}
						collectionPlaylists={collectionPlaylists}
						track_id={track_id}
						is_collected={is_collected}
					/>
				</div>
			</div>
		);
	};

	return (
		<>
			<h2>
				歌曲
				<span onClick={onViewMoreTracks}>查看更多</span>
			</h2>
			<div className="tracks__wrapper">{searchingResult?.tracks?.map(renderTracks)}</div>
		</>
	);
}

const MoreOperation = React.forwardRef((props, ref) => {
	const { query = '' } = useParams();
	const { dispatch, auth, collectionPlaylists } = props;

	const [moreBtnActive, setMoreBtnActive] = useState(false);
	const [showUserPlaylist, setShowUserPlaylist] = useState(false);

	const btnRef = useRef();

	useImperativeHandle(ref, () => ({
		inActiveMoreBtn: () => btnRef.current.blur(),
	}));

	const onToggleMoreBtnActive = (e, boolean) => {
		e.stopPropagation();
		e.preventDefault();

		setMoreBtnActive(boolean);
	};

	const onMoreBtnOperationClick = async (type) => {
		if (!auth?.token) {
			dispatch(actions.toggleModal({ showModal: true, modalType: 'prompt' }));
			return;
		}

		if (type === 'favorite') {
			const is_collected = props.is_collected;
			const track_id = props.track_id;

			if (is_collected) {
				await dispatch(actions.deleteTrackFromCollection({ track_id }));
			} else {
				await dispatch(actions.putTrackToCollection({ track_id }));
			}

			btnRef.current.blur();

			query && (await dispatch(actions.getSearchOutcome(query)));
		}
	};

	const addToPlaylist = async (id) => {
		const track_id = props.track_id;
		if (!track_id) return;

		await dispatch(actions.postAddTrackToPlaylist({ playlist_id: id, track_id }));
	};

	const userPlaylists = useMemo(() => {
		return collectionPlaylists?.items?.filter((list) => list?.owner?.id === auth?.user_id) || [];
	}, [collectionPlaylists, auth?.user_id]);

	// render
	const renderUserPlaylists = (list) => {
		const playlist_id = (list.uri || '').split(':').pop() || '';

		return (
			<div key={playlist_id} onClick={() => addToPlaylist(playlist_id)}>
				{list?.name}
			</div>
		);
	};

	const renderMoreBtn = () => {
		if (!moreBtnActive) return;
		return (
			<div className="track-operation__list">
				<div
					className="track-operation__list-item"
					onClick={() => onMoreBtnOperationClick('favorite')}
				>
					{props.is_collected ? '從「已按讚的歌曲」移除' : '儲存至「已按讚的歌曲」'}
				</div>

				<div
					className="track-operation__list-item"
					onClick={(e) => onMoreBtnOperationClick(e, 'playlist')}
					onMouseEnter={() => setShowUserPlaylist(true)}
					onMouseLeave={() => setShowUserPlaylist(false)}
				>
					加入播放清單
					{showUserPlaylist && userPlaylists.length > 0 && (
						<div className="user-playlists">{userPlaylists.map(renderUserPlaylists)}</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<button
			ref={btnRef}
			className="track-operation__button"
			onClick={(e) => onToggleMoreBtnActive(e, true)}
			onBlur={(e) => onToggleMoreBtnActive(e, false)}
		>
			<img src={MoreVertical} alt="more" />
			{renderMoreBtn()}
		</button>
	);
});

function Playlists(props) {
	const history = useHistory();
	const { auth, searchingResult } = props;

	const onViewMorePlaylists = (e, type) => {
		e.stopPropagation();
	};

	const goToPlaylistByUid = (e, uri) => {
		e.preventDefault();
		const uid = (uri || '').split(':').pop() || '';

		if (!uid) return;
		history.push(`/playlist/${uid}`);
	};

	if (!searchingResult?.playlists?.length) return null;

	// render
	const renderPlaylists = (item, i) => {
		const isMyselfList = item.owner.display_name === auth.display_name;
		const owner = item.owner.display_name;
		const playlistName = item.name;
		const playlistDesc = item.description;
		const uri = item.uri;

		return (
			<div
				key={`playlists-item-${i + 1}`}
				className="playlists__item-wrapper"
				onClick={(e) => goToPlaylistByUid(e, uri)}
			>
				<div className="item__image-wrapper">
					<img src={item?.images[0]?.url} alt="playlist cover" />
				</div>
				<div className="item__basic-info">
					<div className="item__basic-info__name">{playlistName}</div>
					<div className="item__basic-info__description">
						{isMyselfList ? `來自 ${owner}` : `${playlistDesc}`}
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<h2>
				播放清單
				<span onClick={onViewMorePlaylists}>查看更多</span>
			</h2>
			<div className="playlists__wrapper">{searchingResult?.playlists?.map(renderPlaylists)}</div>
		</>
	);
}

export default Search;
