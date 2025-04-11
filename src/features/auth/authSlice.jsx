// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
	login,
	logout,
	checkAuth,
	fakeCheckAuth,
	fakeLogin,
} from './authActions';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isLoading: false,
		isAuthenticated: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			//
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
			})
			.addCase(checkAuth.rejected, (state) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.error = 'No token found';
			})
			//
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				localStorage.setItem('token', action.payload.token);
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.error = action.payload;
			})
			//
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.user = null;
				localStorage.removeItem('token');
			});

		// fakeCheckAuth: Kiểm tra token khi load trang
		builder
			.addCase(fakeCheckAuth.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fakeCheckAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(fakeCheckAuth.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.error = action.payload;
			})

			// fakeLogin: Xử lý đăng nhập
			.addCase(fakeLogin.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fakeLogin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(fakeLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.error = action.payload;
			});
	},
});

export default authSlice.reducer;
