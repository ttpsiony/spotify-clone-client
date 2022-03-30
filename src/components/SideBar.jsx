import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import cx from 'classnames';

import context from '../store/context';
import { actions } from '../store/action';

import SideBarWrapper from './styles/SideBar.style';
import SpotifyLogo from '../assets/Spotify_Logo_RGB_Green.png';
import Home from '../assets/Home.svg';
import Search from '../assets/Search.svg';
import Collection from '../assets/Collection.svg';
import Plus from '../assets/Plus.svg';
import GlyphHeart from '../assets/GlyphHeart-grey.svg';

const NavIconList = [
	{ src: Home, to: '/', alt: 'home', text: '首頁' },
	{ src: Search, to: '/search', alt: 'search', text: '搜尋' },
	{ src: Collection, to: '/collection/playlists', alt: 'collection', text: '你的音樂庫' },
];

function SideBar({ hasToken }) {
	const history = useHistory();
	const { pathname } = useLocation();
	const { state, dispatch } = useContext(context);
	const {
		collectionPlaylists = {},
		auth: { token, user_id },
	} = state || {};
	const [statePlaylists, setStatePlaylists] = useState([]);
	const [showCollectionTracksPrompt, setShowCollectionTracksPrompt] = useState(false);
	const [showAddPlaylistPrompt, setShowAddPlaylistPrompt] = useState(false);
	const [showCollectionPlaylistsPrompt, setShowCollectionPlaylistsPrompt] = useState(false);
	const [showContextMenuById, setShowContextMenuById] = useState({ id: '', x: '', y: '' });
	const [renameInputById, setRenameInputById] = useState({ uid: '', value: '' });

	useEffect(() => {
		setStatePlaylists(collectionPlaylists?.items || []);

		!token && setStatePlaylists([]);

		return () => {
			setStatePlaylists([]);
		};
	}, [collectionPlaylists, token]);

	const logoClickHandler = (e) => {
		e.preventDefault();
		history.push('/');
	};

	const navIconClickHandler = (e, path = '') => {
		e.preventDefault();

		const isCollectionPlaylists = path === '/collection/playlists';
		if (!hasToken && isCollectionPlaylists) {
			// 你的音樂庫
			setShowCollectionPlaylistsPrompt(true);
			return;
		}

		path && history.push(path);
	};

	// 建立播放清單
	const createPlayListHandler = (e) => {
		e.preventDefault();

		if (!hasToken) {
			setShowAddPlaylistPrompt(true);
			return;
		}
		//  TODO: add play list
		dispatch(actions.postCreateUserPlaylist());
	};

	// 已按讚的歌曲
	const goToCollectionTracks = (e) => {
		e.preventDefault();

		if (!hasToken) {
			setShowCollectionTracksPrompt(true);
			return;
		}

		history.push('/collection/tracks');
	};

	// 共用: 你的音樂庫、建立播放清單、已按讚的歌曲 提示關掉
	const closePromptHandler = (e, promptType) => {
		e.preventDefault();
		e.stopPropagation();

		promptType === 'playlists' && setShowCollectionPlaylistsPrompt(false);
		promptType === 'add' && setShowAddPlaylistPrompt(false);
		promptType === 'tracks' && setShowCollectionTracksPrompt(false);
	};

	// 播放清單列表點擊右鍵的行為
	const toggleContextMenu = (e, id, isUserPlaylist) => {
		if (e.type === 'blur') {
			setShowContextMenuById({ id: '', x: '', y: '' });
			return;
		}

		if (e.type === 'contextmenu') {
			e.preventDefault();
			const multiple = isUserPlaylist ? 3 : 2;
			const ratio = 2 / 3;

			const left = e.clientX + 15;
			const top =
				e.clientY < window.innerHeight * ratio ? e.clientY + 10 : e.clientY - multiple * 40 + 15;
			setShowContextMenuById({ id: id, x: left, y: top });
			return;
		}
	};

	// 重新命名播放清單
	const renamePlaylistHandler = (uid, value) => {
		if (uid) {
			setShowContextMenuById({ id: '', x: '', y: '' });
			setRenameInputById({ uid, value });
			return;
		}
		//
		// 更新播放清單名稱
		const playlist_id = renameInputById.uid || '';
		const original_value = renameInputById.value || '';
		if (playlist_id && value && original_value !== value) {
			dispatch(actions.putUserPlaylistDetail({ playlist_id, payload: { name: value } }));
		}
		setRenameInputById({ uid: '', value: '' });
	};

	const removePlaylistHandler = (id) => {
		dispatch(actions.deleteUserFollowingPlaylist({ user_id, playlist_id: id }));
	};

	return (
		<SideBarWrapper className="sidebar-container">
			<div className="sidebar-container__logo-wrapper">
				<img onClick={logoClickHandler} src={SpotifyLogo} alt="Spotify Logo" />
			</div>
			<ul className="sidebar-container__main-nav">
				{NavIconList.map((icon, idx) => {
					const isActive = icon?.to === pathname;

					if (icon.to !== '/collection/playlists') {
						return (
							<li key={`icon-list-${idx + 1}`}>
								<Link
									className={cx({ active: isActive })}
									to={icon.to}
									onClick={(e) => navIconClickHandler(e, icon.to)}
								>
									<img src={icon.src} alt={icon.alt} />
									<span>{icon.text}</span>
								</Link>
							</li>
						);
					}

					return (
						<li key={`icon-list-${idx + 1}`}>
							<Link
								className={cx({ active: isActive })}
								to={icon.to}
								onClick={(e) => navIconClickHandler(e, icon.to)}
								onBlur={(e) => closePromptHandler(e, 'playlists')}
							>
								<img src={icon.src} alt={icon.alt} />
								<span>{icon.text}</span>
							</Link>
							{showCollectionPlaylistsPrompt && (
								<Popover
									title="享受你的音樂庫"
									desc="登入並查看音樂庫中已儲存的歌曲及播放清單"
									onClose={(e) => closePromptHandler(e, 'playlists')}
								/>
							)}
						</li>
					);
				})}
			</ul>
			<div className="sidebar_container__playlist-wrapper">
				<div className="playlist-add-button">
					<button onClick={createPlayListHandler} onBlur={(e) => closePromptHandler(e, 'add')}>
						<div className="add-button__img-wrapper">
							<img src={Plus} alt="add playlist" />
						</div>
						<span>建立播放清單</span>
					</button>
					{showAddPlaylistPrompt && (
						<Popover
							title="建立播放清單"
							desc="登入已建立或分享播放清單"
							onClose={(e) => closePromptHandler(e, 'add')}
						/>
					)}
				</div>
				<div className="playlist-collection-button">
					<button
						className={cx({ active: pathname === '/collection/tracks' })}
						onClick={goToCollectionTracks}
						onBlur={(e) => closePromptHandler(e, 'tracks')}
					>
						<div className="collection-button__img-wrapper">
							<img src={GlyphHeart} alt="add playlist" />
						</div>
						<span>已按讚的歌曲</span>
					</button>
					{showCollectionTracksPrompt && (
						<Popover
							title="享受你的「已按讚的歌曲」"
							desc="登入並在一個簡單播放清單中查看所有「已按讚歌曲」"
							onClose={(e) => closePromptHandler(e, 'tracks')}
						/>
					)}
				</div>
				<div className="separator" />
				{hasToken && (
					<div className="playlist-wrapper__items-container">
						<ul>
							{statePlaylists.map((list, idx) => {
								const owner_id = list?.owner?.id || '';
								const uid = (list.uri || '').split(':').pop() || '';
								const path = `/playlist/${uid}`;

								return (
									<li
										key={`list-item-${idx}`}
										onBlur={toggleContextMenu}
										onContextMenu={(e) => toggleContextMenu(e, uid, user_id === owner_id)}
									>
										{renameInputById?.uid !== uid ? (
											<Link className={cx({ active: pathname === path })} to={path}>
												{list?.name}
											</Link>
										) : (
											<input
												autoFocus
												onBlur={(e) => renamePlaylistHandler('', e.target.value)}
												onFocus={(e) => {
													e.target.value = list?.name;
												}}
											/>
										)}
										{showContextMenuById.id === uid && (
											<PlaylistContextMenu
												position={{ x: showContextMenuById.x, y: showContextMenuById.y }}
												isUserPlaylist={user_id === owner_id}
												rename={() => renamePlaylistHandler(uid, list?.name)}
												remove={() => removePlaylistHandler(uid)}
												create={createPlayListHandler}
											/>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		</SideBarWrapper>
	);
}

function PlaylistContextMenu({ position = {}, isUserPlaylist = false, rename, remove, create }) {
	const history = useHistory();
	// contextmenu click
	const onClickContextMenuItemHandler = (e, action) => {
		e.preventDefault();

		action === 'create' && create(e);
		action === 'rename' && rename();
		action === 'remove' && remove();

		isUserPlaylist && action === 'remove' && history.replace('/');
	};

	return (
		<div
			className="context-menu-container"
			style={{ left: `${position.x}px`, top: `${position.y}px` }}
		>
			<div onMouseDown={(e) => onClickContextMenuItemHandler(e, 'create')}>建立播放清單</div>
			{isUserPlaylist && (
				<div onMouseDown={(e) => onClickContextMenuItemHandler(e, 'rename')}>重新命名</div>
			)}
			<div onMouseDown={(e) => onClickContextMenuItemHandler(e, 'remove')}>移除</div>
		</div>
	);
}

function Popover({ title = '', desc = '', onClose }) {
	const history = useHistory();

	// 共用: 你的音樂庫、建立播放清單、已按讚的歌曲 提示登入
	const loginClickHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		history.push('/login');
	};

	return (
		<div
			className="playlist-collection-prompt"
			onMouseDown={(e) => {
				e.stopPropagation();
				e.preventDefault();
			}}
		>
			<h3>{title}</h3>
			<p>{desc}</p>
			<div className="prompt-btn-wrapper">
				<button className="prompt-btn" onMouseDown={onClose}>
					現在不要
				</button>
				<button className="prompt-btn" onMouseDown={loginClickHandler}>
					登入
				</button>
			</div>
		</div>
	);
}

export default SideBar;
