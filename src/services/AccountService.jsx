import api from '../api/axiosConfig';
import { apiRequest } from './ApiRequest';

const AccountService = {
	getAllAccounts: async () => {
		return apiRequest(() => {
			return api.get('/users');
		});
	},
	updateAccount: async (userUpdate) => {
		return apiRequest(() => {
			return api.put(`/users/${userUpdate.id}`, userUpdate);
		});
	},
	createAccount: async (newUser) => {
		return apiRequest(() => {
			return api.post('/users', newUser);
		});
	},

	deleteAccount: async (accountId) => {
		return apiRequest(() => {
			return api.delete(`/users/${accountId}`);
		});
	},
};

export default AccountService;
