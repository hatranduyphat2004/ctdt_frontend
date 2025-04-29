// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './authActions';

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
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
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
			});
	},
});

export default authSlice.reducer;
