import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import authReducer from './features/authSlice';
import packagesReducer from './features/packagesSlice';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		auth: authReducer,
		packages: packagesReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
