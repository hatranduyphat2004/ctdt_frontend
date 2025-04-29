import api from '../api/axiosConfig';
import { apiRequest } from './ApiRequest';

const LecturerService = {
	getAllLecturers: async () => {
		return apiRequest(() => {
			return api.get('/giangvien');
		});
	},
};

export default LecturerService;
