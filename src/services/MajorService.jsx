import api from '../api/axiosConfig';
import { apiRequest } from './ApiRequest';

const MajorService = {
	getAllMajors: async () => apiRequest(() => api.get('/nganh')),

	updateAccount: async (majorUpdate) =>
		apiRequest(() => api.put(`/nganh/${majorUpdate.id}`, majorUpdate)),

	createAccount: async (newMajor) =>
		apiRequest(() => api.post('/nganh', newMajor)),

	deleteAccount: async (majorId) =>
		apiRequest(() => api.delete(`/nganh/${majorId}`)),
};

export default MajorService;
