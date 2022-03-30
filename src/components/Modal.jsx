import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import context from '../store/context';
import { actions } from '../store/action';

import Wrapper from './styles/Modal.style';
import SpotifyMobileApp from '../assets/spotify-mobile-app.jpeg';
import DataSecurity from '../assets/data_security.jpeg';

const LoginPrompt = () => {
	const history = useHistory();
	const { dispatch } = useContext(context);

	const loginClickHandler = (e) => {
		e.preventDefault();

		dispatch(actions.toggleModal({ showModal: false, modalType: '' }));
		history.push('/login');
	};

	const downloadSpotifyApp = (e) => {
		e.preventDefault();

		window.open('https://www.spotify.com/tw/download');
	};

	return (
		<div className="modal-body__login-prompt">
			<div className="image-wrapper">
				<img rel="preload" src={SpotifyMobileApp} alt="spotify mobile app" />
				<div className="image-provider">
					Photo by{' '}
					<a href="https://unsplash.com/@patrikmichalicka?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
						Patrik Michalicka
					</a>{' '}
					on{' '}
					<a href="https://unsplash.com/s/photos/spotify?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
						Unsplash
					</a>
				</div>
			</div>
			<div className="text-wrapper">
				<h2>使用免費 Spotify 帳戶開始聆聽</h2>
				<div className="prompt-btn-wrapper">
					<button onClick={loginClickHandler}>登入</button>
					<button onClick={downloadSpotifyApp}>下載 APP</button>
				</div>
				<p>注意：本網站僅為練習使用。</p>
			</div>
		</div>
	);
};

const WarningPrompt = () => {
	const goToSpotify = (e) => {
		e.preventDefault();

		window.open('https://www.spotify.com/');
	};

	return (
		<div className="modal-body__warning-prompt">
			<div className="image-wrapper">
				<img rel="preload" src={DataSecurity} alt="data security" />
				<div className="image-provider">
					<a rel="noreferrer" href="https://www.freepik.com/vectors/business" target="_blank">
						Business vector created by jcomp - www.freepik.com
					</a>
				</div>
			</div>
			<div className="text-wrapper">
				<p>本網站僅為練習使用，需要註冊請至 Spotify 網站註冊。</p>
				<p>
					若要聆聽音樂，請使用 Spotify{' '}
					<a rel="noreferrer" href="https://www.spotify.com/tw/" target="_blank">
						網頁播放器
					</a>{' '}
					或{' '}
					<a rel="noreferrer" href="https://www.spotify.com/tw/download" target="_blank">
						下載 APP
					</a>
					。
				</p>
				<button onClick={goToSpotify}>前往官網</button>
			</div>
		</div>
	);
};

const Modal = () => {
	const { state, dispatch } = useContext(context);
	const {
		modal: { showModal, modalType },
	} = state || {};

	const onClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(actions.toggleModal({ showModal: false, modalType: '' }));
	};

	const allowModalType = modalType === 'prompt' || modalType === 'warning';

	return (
		showModal &&
		allowModalType && (
			<Wrapper onClick={onClose}>
				<div className="modal" onClick={(e) => e.stopPropagation()}>
					<div
						className={cx({
							'modal-body': true,
							prompt: modalType === 'prompt',
							warning: modalType === 'warning',
						})}
					>
						{modalType === 'prompt' && <LoginPrompt />}
						{modalType === 'warning' && <WarningPrompt />}
					</div>
					<button className="close" onClick={onClose}>
						關閉
					</button>
				</div>
			</Wrapper>
		)
	);
};

export default Modal;
