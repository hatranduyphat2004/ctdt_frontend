import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // sử dụng localStorage hoặc sessionStorage
// Cấu hình persist cho authReducer
const persistConfig = {
	key: 'root',
	storage: sessionStorage, // Lưu trữ state trong sessionStorage
	// whitelist: ['auth'], // Chỉ lưu state của auth
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer, // Sử dụng persisted auth reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store); // Tạo persistor để lưu trữ state
