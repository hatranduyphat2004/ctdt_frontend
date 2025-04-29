import api from '../api/axiosConfig';
import { apiRequest } from './ApiRequest';

const InfoGeneralService = {
	getAllInfoGenerals: async () => apiRequest(() => api.get('/thongtinchung')),

	createInfoGeneral: async (newInfoGeneral) =>
		apiRequest(() => api.post('/thongtinchung', newInfoGeneral)),

	updateInfoGeneral: async (updateInfoGeneral) =>
		apiRequest(() =>
			api.put(`/thongtinchung/${updateInfoGeneral.id}`, updateInfoGeneral)
		),

	deleteInfoGeneral: async (InfoGeneralId) =>
		apiRequest(() => api.delete(`/thongtinchung/${InfoGeneralId}`)),
};

export default InfoGeneralService;
