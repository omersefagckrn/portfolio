import { store } from '../store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ThemeState {
	theme: 'light' | 'dark' | 'system';
}
