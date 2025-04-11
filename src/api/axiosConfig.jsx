import axios from 'axios';

// Nếu bạn có token từ localStorage (giả sử bạn lưu sau khi login)
const getAuthToken = () => localStorage.getItem('token');

// Tạo instance
const api = axios.create({
	baseURL: '/api', // Được proxy qua vite.config.js
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`; // Gửi token tự động
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Gợi ý xử lý lỗi chung ở đây
		if (error.response) {
			const status = error.response.status;

			if (status === 401) {
				console.warn('Unauthorized! Redirect to login');
				window.location.href = '/login';
			} else if (status === 500) {
				console.error('Server error!');
			}
		}

		return Promise.reject(error);
	}
);

export default api;
