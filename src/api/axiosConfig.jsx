import axios from 'axios';
import TokenService from '../services/TokenService';

// Tạo axios instance
const api = axios.create({
	baseURL: '/api', // Proxy qua vite.config.js
	timeout: 10000,
	withCredentials: true, // 💥 Cho phép gửi cookie kèm request
	headers: {
		'Content-Type': 'application/json',
	},
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
	(config) => {
		const token = TokenService.getAccessToken();
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 403 &&
			!originalRequest._retry &&
			TokenService.getRefreshToken()
		) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers['Authorization'] = 'Bearer ' + token;
						return api(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}
			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const response = await axios.post(
					'http://localhost:8080/api/auth/refresh-token',
					{
						refreshToken: TokenService.getRefreshToken(),
					}
				);

				const { accessToken, refreshToken } = response.data;

				TokenService.setTokens(accessToken, refreshToken);
				api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
				processQueue(null, accessToken);

				return api(originalRequest);
			} catch (err) {
				processQueue(err, null);
				// Nếu lỗi luôn cả refresh, logout hoặc redirect
				TokenService.clearTokens();
				window.location.href = '/login';
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default api;
