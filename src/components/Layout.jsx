import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Header, AudioPlayer, SideBar } from '../components';
import Wrapper from './styles/Layout.style';

const Layout = ({ children, token, authLoading }) => {
	const history = useHistory();
	const { pathname } = useLocation();
	const content = useRef(null);
	const [showHeaderShadow, setShowHeaderShadow] = useState(false);
	const [showTitle, setShowTitle] = useState(false);

	const canShowTitle = pathname.startsWith('/collection/tracks') || /\/playlist\/+/.test(pathname);

	useEffect(() => {
		if (history) {
			const unListen = history.listen(() => {
				canShowTitle && setShowTitle(false);
				content?.current?.scrollTo(0, 0);
			});
			return () => {
				unListen();
			};
		}
	}, [history, pathname, canShowTitle]);

	const scrollEventHandler = useCallback(
		(e) => {
			// 也許可以優化
			const scrollTop = e.target.scrollTop;

			// header height(60px)
			if (scrollTop > 60 && !showHeaderShadow) {
				setShowHeaderShadow(true);
			}
			if (scrollTop <= 60 && showHeaderShadow) {
				setShowHeaderShadow(false);
			}

			// tracks banner(header) height(260px)
			if (canShowTitle) {
				if (scrollTop > 240 && !showTitle) {
					setShowTitle(true);
				}
				if (scrollTop <= 240 && showTitle) {
					setShowTitle(false);
				}
			}
		},
		[showHeaderShadow, showTitle, canShowTitle],
	);

	if (authLoading) {
		return (
			<Wrapper>
				<h2 className="auth-loading">
					<div className="lds-spinner">
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i}></div>
						))}
					</div>
					<span>登入中</span>
				</h2>
			</Wrapper>
		);
	}

	return (
		<>
			<Wrapper>
				<div className="Spotify-clone-App-container">
					<nav className="App-container__navigation">
						<SideBar hasToken={!!token} />
					</nav>
					<div className="App-container__main-page">
						<Header hasToken={!!token} showHeaderShadow={showHeaderShadow} showTitle={showTitle} />
						<div
							id="App-container__content"
							ref={content}
							className="App-container__main-page__content"
							onScroll={scrollEventHandler}
						>
							{children}
						</div>
					</div>
					<footer className="App-container__music-player-controller">
						<AudioPlayer hasToken={!!token} pathname={pathname} />
					</footer>
				</div>
			</Wrapper>
		</>
	);
};

export default Layout;
