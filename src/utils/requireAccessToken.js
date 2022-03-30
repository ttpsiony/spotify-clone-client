import Cookies from 'universal-cookie';
import { actions } from '../store/action';
import { COOKIES_ACCESS_TOKEN_KEY } from './helper';
const cookies = new Cookies();

// TODO: 按登出有機會無法清除cookies，而無法登出
export const checkAccessToken = async ({
	dispatch,
	history,
	pathname,
	loginRequired,
	storedToken,
}) => {
	const cookie_token = cookies.get(COOKIES_ACCESS_TOKEN_KEY);

	if (!cookie_token) {
		dispatch(actions.logout({ redirect: false }));

		loginRequired && history.push('/login');
	}

	if (cookie_token) {
		!storedToken && dispatch(actions.postUserProfile());
	}

	if (pathname === '/login' && cookie_token) {
		history.replace('/');
	}
};
