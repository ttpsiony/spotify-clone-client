import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import context from '../store/context';
import { actions } from '../store/action';

import Wrapper from './styles/Login.style';
import SpotifyIcon from '../assets/Spotify_Icon_RGB_Green.png';
import { useField, email, required } from '../utils/validation';
import { CSRF_STATE_STORED_KEY, useWebAddressParams } from '../utils/helper';

const Form = () => {
	const { dispatch } = useContext(context);
	const [spotifyPermission] = useState(true);
	const emailField = useField([required('請輸入 Spotify 使用者名稱或電子信箱。'), email]);
	const passwordField = useField([required('請輸入你的密碼。')]);

	const submitLoginHandler = (e) => {
		e.preventDefault();
		emailField.input.onBlur(emailField.input.value);
		passwordField.input.onBlur(passwordField.input.value);

		const isEmailValid = emailField.input.value !== '' && !emailField.meta.error;
		const isPasswordValid = passwordField.input.value !== '' && !passwordField.meta.error;

		if (!isEmailValid || !isPasswordValid) return;

		const email = emailField.input.value;
		const password = passwordField.input.value;

		console.log(`email: ${email}`);
		console.log(`password: ${password}`);
	};

	const loginSpotifyAccount = (e) => {
		e.preventDefault();
		dispatch(actions.login());
	};

	// Spotify developer OAuth flow
	if (spotifyPermission) {
		return (
			<div className="login-permission">
				<p className="login-permission__warning">這是練習用網頁，請勿嘗試登入 Spotify 帳號</p>
				<p className="login-permission__warning">如果允許本網站存取你的個人資料，請按登入按鈕</p>
				<div className="login-permission__btn">
					<button onClick={loginSpotifyAccount}>登入</button>
				</div>
			</div>
		);
	}

	return (
		<form id="login-form">
			<div className="login-info">
				<p>本網站僅為練習使用，請勿使用 Spotify 帳號登入。</p>
				<p>若要檢視、觀看，請聯絡開發者。</p>
			</div>
			<div className="form-control">
				<label htmlFor="email">電郵地址或用戶名稱</label>
				<input
					className={cx({
						error: emailField.meta.error,
					})}
					onChange={emailField.input.onChange}
					onBlur={emailField.input.onBlur}
					value={emailField.input.value}
					type="text"
					placeholder="電郵地址或用戶名稱"
				/>
				{emailField.meta.touched && emailField.meta.error && (
					<div className="text-danger">{emailField.meta.error}</div>
				)}
			</div>
			<div className="form-control">
				<label htmlFor="password">密碼</label>
				<input
					className={cx({
						error: passwordField.meta.error,
					})}
					onChange={passwordField.input.onChange}
					onBlur={passwordField.input.onBlur}
					value={passwordField.input.value}
					type="password"
					placeholder="密碼"
				/>
				{passwordField.meta.touched && passwordField.meta.error && (
					<div className="text-danger">{passwordField.meta.error}</div>
				)}
			</div>
			<div className="submit-btn">
				<input type="submit" value="登入" onClick={submitLoginHandler} />
			</div>
		</form>
	);
};

const Login = () => {
	const history = useHistory();
	const { dispatch } = useContext(context);
	const { searchParams } = useWebAddressParams();

	useEffect(() => {
		const csrf_state = sessionStorage.getItem(CSRF_STATE_STORED_KEY);
		const validation_state = searchParams.state || '';
		const code = searchParams.code || '';
		const error = searchParams.error || '';

		if (csrf_state && validation_state && csrf_state === validation_state) {
			sessionStorage.removeItem(CSRF_STATE_STORED_KEY);
			if (error && error === 'access_denied') {
				history.replace('/login');
				return;
			}

			if (code) {
				dispatch(actions.postRetrieveAccessToken({ code, state: csrf_state }));
			}
			//
		}
	}, [dispatch, history, searchParams.state, searchParams.error, searchParams.code]);

	const logoClickHandler = (e) => {
		e.preventDefault();
		history.push('/');
	};

	const signUpClickHandler = (e) => {
		e.preventDefault();
		dispatch(actions.toggleModal({ showModal: true, modalType: 'warning' }));
	};

	return (
		<Wrapper>
			<div className="logo">
				<button onClick={logoClickHandler}>
					<img src={SpotifyIcon} alt="spotify logo icon" />
					<span>Spotify Clone</span>
				</button>
			</div>
			<Form />
			<div className="sign-up-btn">
				<h4>未註冊帳戶？</h4>
				<button onClick={signUpClickHandler}>註冊 Spotify</button>
			</div>
		</Wrapper>
	);
};

export default Login;
