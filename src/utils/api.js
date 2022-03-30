import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// https://api.spotify.com
const withAxios = (method, endpoint, params, options) => {
	const token = cookies.get('X-Access-Token');

	return axios({
		baseURL: 'http://localhost:8800/api',
		headers: options || {
			'X-Access-Token': token ? `${token}` : '',
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		method: method,
		url: endpoint,
		params: method === 'get' ? params : null,
		data: method === 'get' ? null : params,
		timeout: 5000,
		responseType: 'json',
	})
		.then((response) => {
			if (response.status >= 500 && response.status < 600) {
				return {
					statusCode: response.status,
					data: response.statusText,
					message: response.statusText,
					config: response.config,
				};
			}

			if (response.statusText !== 'OK') {
				throw new Error(response);
			}

			return Promise.resolve(response.data);
		})
		.then((response) => response)
		.catch((error) => {
			throw new Error(error);
		});
};

const callAPI = {
	get: (endpoint, params, options) => withAxios('get', endpoint, params, options),
	post: (endpoint, params, options) => withAxios('post', endpoint, params, options),
	put: (endpoint, params, options) => withAxios('put', endpoint, params, options),
	delete: (endpoint, params, options) => withAxios('delete', endpoint, params, options),
};

export default callAPI;
