import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import TokenService from '../../services/TokenService';

// Action đăng nhập
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
	const { id, password } = data;

	const res = await AuthService.login(id, password);

	if (!res.success) {
		return thunkAPI.rejectWithValue(res.error);
	}
	const { accessToken, refreshToken } = res.data;

	TokenService.setTokens(accessToken, refreshToken);

	return res.data;
});

// Action đăng xuất
export const logout = createAsyncThunk('auth/logout', async () => {
	TokenService.clearTokens();
	return AuthService.logout();
});
