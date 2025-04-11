// src/features/auth/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';

// Action đăng nhập
export const login = createAsyncThunk(
	'auth/login',
	async ({ username, password }, thunkAPI) => {
		try {
			const response = await api.post('/login', { username, password });
			localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

// Action đăng xuất
export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.removeItem('token'); // Xóa token khi logout
});

// Action kiểm tra token đã lưu trong localStorage khi trang được load
export const checkAuth = createAsyncThunk(
	'auth/checkAuth',
	async (_, thunkAPI) => {
		const token = localStorage.getItem('token');
		if (token) {
			// try {
			// 	// Gọi API thực tế để lấy thông tin người dùng
			// 	const response = await api.get('/user/me', {
			// 		headers: {
			// 			Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
			// 		},
			// 	});
			// 	// Trả về dữ liệu người dùng và token
			// 	return { user: response.data.user, token };
			// } catch (error) {
			// 	// Xử lý lỗi nếu có
			// 	return thunkAPI.rejectWithValue(
			// 		'Không thể lấy thông tin người dùng',
			// 		error
			// 	);
			// }

			// fake
			return { user: { name: 'phat ha', id: 1 }, token };
		} else {
			return thunkAPI.rejectWithValue('No token found');
		}
	}
);

// FAKE !!!
export const fakeLogin = createAsyncThunk(
	'auth/fakeLogin',
	async ({ id, password }, thunkAPI) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (id === 'admin' && password === '123') {
					const fakeToken = 'fake-jwt-token';
					localStorage.setItem('token', fakeToken);
					resolve({
						user: { name: 'phatha', role: 'admin' },
						token: fakeToken,
					});
				} else {
					reject('Sai tài khoản hoặc mật khẩu');
				}
			}, 2000); // giả lập API delay 2 giây
		}).catch((error) => thunkAPI.rejectWithValue(error));
	}
);

export const fakeCheckAuth = createAsyncThunk(
	'auth/fakeCheckAuth',
	async (_, thunkAPI) => {
		const token = localStorage.getItem('token');
		if (token) {
			// Giả lập API thực tế (fake)
			return { user: { name: 'phat ha', id: 1 }, token };
		} else {
			return thunkAPI.rejectWithValue('No token found');
		}
	}
);
