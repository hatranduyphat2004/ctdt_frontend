import api from '../api/axiosConfig';
import { apiRequest } from './ApiRequest';

const AuthService = {
	login: async (username, password) => {
		return await apiRequest(() => {
			return api.post('/auth/login', { username, password });
		});
	},
	logout: async () => {
		return { success: true };
	},
	resetPassword: async (accountUsername) => {
		return apiRequest(() => {
			return api.post(`/auth/reset-password`, {
				username: accountUsername,
			});
		});
	},
};

export default AuthService;
