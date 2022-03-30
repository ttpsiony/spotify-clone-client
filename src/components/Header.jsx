import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cx from 'classnames';
import context from '../store/context';
import { actions } from '../store/action';

import { useDebounce } from '../utils/helper';
import HeaderWrapper from './styles/Header.style';
import User from '../assets/User.svg';
import Arrow from '../assets/Arrow.svg';
import Search from '../assets/Search.svg';
import UpRight from '../assets/UpRight.svg';
import Cross from '../assets/Cross.svg';

function Header({ hasToken, showHeaderShadow, showTitle }) {
	const history = useHistory();
	const { dispatch } = useContext(context);

	const historyActionHandler = (e, action) => {
		e.preventDefault();

		if (!history[action] || typeof history[action] !== 'function') return;
		history[action]();
	};

	const signUpClickHandler = (e) => {
		e.preventDefault();
		dispatch(actions.toggleModal({ showModal: true, modalType: 'warning' }));
	};

	const loginClickHandler = (e) => {
		e.preventDefault();
		history.push('/login');
	};

	return (
		<HeaderWrapper className={cx({ scrolling: showHeaderShadow })}>
			<div
				className={cx({
					'inner-wrapper': true,
					scrolling: showHeaderShadow,
				})}
			>
				<div className="header__browser-history-controls">
					<button onClick={(e) => historyActionHandler(e, 'goBack')}>
						<img src={Arrow} alt="left arrow" />
					</button>
					<button onClick={(e) => historyActionHandler(e, 'goForward')}>
						<img className="arrow-rotation" src={Arrow} alt="left arrow rotate" />
					</button>
				</div>
				<HeaderContent hasToken={hasToken} showTitle={showTitle} />

				{!hasToken && (
					<>
						<button className="header__sign-up-btn" onClick={signUpClickHandler}>
							註冊
						</button>
						<button className="header__login-btn" onClick={loginClickHandler}>
							登入
						</button>
					</>
				)}
				{hasToken && <UserProfile />}
			</div>
		</HeaderWrapper>
	);
}

function HeaderContent({ hasToken, showTitle }) {
	const history = useHistory();
	const { pathname } = useLocation();
	const { state, dispatch } = useContext(context);
	const { playlistTracks } = state || {};

	const [hasValue, setHasValue] = useState(false);

	const inputRef = useRef();

	useEffect(() => {
		if (pathname.startsWith('/search')) {
			const match = pathname.match(/^\/search\/([\S+].*)/);
			const query = match && match[1] ? match[1] : '';

			const input = inputRef.current;
			if (input && query) {
				setHasValue(true);
				input.value = query;
			}
		}

		return () => {
			setHasValue(false);
		};
	}, [pathname]);

	const onInputChangeHandler = useDebounce((e) => {
		const value = e.target.value;
		if (value) {
			history.push(`/search/${value}`);
		} else {
			history.push(`/search`);
			dispatch(actions.resetSearchOutcome());
		}
	}, 600);

	const clearSearchInput = (e) => {
		e.stopPropagation();
		e.preventDefault();

		inputRef.current.value = null;
		setHasValue(false);
		history.push(`/search`);
	};

	return (
		<div className="header__content-wrapper">
			{pathname.startsWith('/search') && (
				<div className="header__content-wrapper__search-bar">
					<input
						ref={inputRef}
						type="text"
						placeholder="播放清單、歌曲"
						autoComplete="off"
						onChange={(e) => {
							onInputChangeHandler(e);

							setHasValue(!!e.target.value);
						}}
					/>
					<img src={Search} alt="search" />
					{hasValue && <img src={Cross} alt="cross" onClick={clearSearchInput} />}
				</div>
			)}
			{hasToken && pathname.startsWith('/collection/tracks') && (
				<div
					className={cx({
						'header__content-wrapper__title': true,
						show: showTitle,
					})}
				>
					已按讚的歌曲
				</div>
			)}
			{/\/playlist\/+/.test(pathname) && (
				<div
					className={cx({
						'header__content-wrapper__title': true,
						show: showTitle,
					})}
				>
					{playlistTracks?.name || ''}
				</div>
			)}
		</div>
	);
}

function UserProfile() {
	const { dispatch } = useContext(context);
	const [showProfile, setShowProfile] = useState(false);

	const userProfileClickHandler = (e) => {
		e.preventDefault();
		setShowProfile(!showProfile);
	};

	const userProfileBlurHandler = (e) => {
		e.preventDefault();
		setShowProfile(false);
	};

	const userAccountHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		window.open('https://www.spotify.com', '_blank');

		setShowProfile(false);
	};

	const logoutHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		dispatch(actions.logout({ redirect: true }));
		setShowProfile(false);
	};

	return (
		<>
			<button
				data-context-menu={(showProfile && 'open') || undefined}
				className="header__user-profile-button"
				onClick={userProfileClickHandler}
				onBlur={userProfileBlurHandler}
			>
				<img src={User} alt="user" />
			</button>
			{showProfile && (
				<div className="header__user-profile__contextmenu">
					<ul>
						<li>
							<button onMouseDown={userAccountHandler}>
								<span>帳戶</span>
								<img src={UpRight} alt="up right icon" />
							</button>
						</li>
						<li>
							<button onMouseDown={logoutHandler}>
								<span>登出</span>
							</button>
						</li>
					</ul>
				</div>
			)}
		</>
	);
}

export default Header;
