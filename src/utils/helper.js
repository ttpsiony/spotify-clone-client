import { useCallback, useRef } from 'react';
import { useLocation } from 'react-router';

export const DOMAIN = 'localhost';
export const CSRF_STATE_STORED_KEY = `${DOMAIN}/csrf_state`;
export const COOKIES_ACCESS_TOKEN_KEY = 'X-Access-Token';
export const SESSION_REFRESH_TOKEN_KEY = `Bearer:refresh_token`;
export const COOKIES_REFRESH_TOKEN_KEY = 'X-Refresh-Token';

export const secondsToHHMMSS = (totalSeconds) => {
	let time = totalSeconds < 0 ? 0 : totalSeconds;
	if (isNaN(time) || time === Infinity) return 0;

	time = parseInt(time, 10);
	let hours = Math.floor(time / 3600);
	let minutes = Math.floor((time - hours * 3600) / 60);
	let seconds = time - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	return hours === '00' ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
};

export const rand = (min = 0, max = 1) => Math.floor(Math.random(0, 1) * (max - min)) + min;

const arrayFromLowToHigh = (low, high) => {
	const array = [];
	for (let i = low; i <= high; i++) {
		array.push(i);
	}
	return array;
};

export const generateRandomString = (digit = 16) => {
	if (typeof digit !== 'number' || digit < 0 || !Number.isInteger(digit)) return null;

	const UPPERCASE_CHAR_CODE = arrayFromLowToHigh(65, 90);
	const LOWERCASE_CHAR_CODE = arrayFromLowToHigh(97, 122);
	const NUMBER_CHAR_CODE = arrayFromLowToHigh(48, 57);
	const charCodes = UPPERCASE_CHAR_CODE.concat(LOWERCASE_CHAR_CODE).concat(NUMBER_CHAR_CODE);

	const str = Array.from({ length: digit })
		.map(() => {
			const code = charCodes[Math.floor(Math.random() * charCodes.length)];
			return String.fromCharCode(code);
		})
		.join('');

	return str;
};

export const useWebAddressParams = () => {
	const { search, hash } = useLocation();
	const URLSearchParamsInstance = new URLSearchParams(search);
	const searchParams = {};
	const hashParams = {};

	for (let [key, value] of URLSearchParamsInstance.entries()) {
		searchParams[key] = value;
	}

	if (hash) {
		// spotify login Auth can do this
		const hashToSearchParams = new URLSearchParams(hash.substring(1));
		for (let [key, value] of hashToSearchParams.entries()) {
			hashParams[key] = value;
		}
	}

	return { searchParams, hashParams };
};

export const queryStringGenerator = (params) => {
	if (typeof params !== 'object') return '';
	let arr = [];
	Object.keys(params).forEach((key) => {
		if (params[key]) {
			arr.push(`${key}=${params[key]}`);
		}
	});

	return arr.join('&');
};

export const useThrottle = (callback, delay = 1000) => {
	const timeRef = useRef(0);

	const throttleCallback = useCallback(
		(...args) => {
			let lastTime = timeRef.current;
			let now = +new Date();
			if (now - lastTime < delay) return;
			timeRef.current = now;

			return callback(...args);
		},
		[callback, timeRef, delay],
	);

	return throttleCallback;
};

export const useDebounce = (callback, delay = 1000) => {
	const timerRef = useRef(null);

	const copyCallback = useCallback((...args) => callback(...args), [callback]);

	return (...args) => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		let timerId = setTimeout(() => {
			copyCallback(...args);
		}, delay);

		timerRef.current = timerId;
	};
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const progressCurrentTime = (e, duration) => {
	const target = e.currentTarget;
	const rect = target.getBoundingClientRect();

	const x = e.clientX - rect.left; // Mouse position
	const width = target.offsetWidth; // target width

	const seekingTime = parseFloat((duration * (x / width)).toFixed(5));
	return { x, seekingTime };
};
