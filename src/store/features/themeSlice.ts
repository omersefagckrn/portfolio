import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
	theme: Theme;
	systemTheme: boolean;
}

const initialState: ThemeState = {
	theme: 'system',
	systemTheme: false
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
			localStorage.setItem('theme', action.payload);

			const root = window.document.documentElement;
			if (action.payload === 'dark' || (action.payload === 'system' && state.systemTheme)) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		},
		toggleTheme: (state) => {
			const newTheme = state.theme === 'light' ? 'dark' : 'light';
			state.theme = newTheme;
			localStorage.setItem('theme', newTheme);

			const root = window.document.documentElement;
			if (newTheme === 'dark') {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		},
		updateSystemTheme: (state, action: PayloadAction<boolean>) => {
			state.systemTheme = action.payload;
			const root = window.document.documentElement;

			if (state.theme === 'system') {
				if (action.payload) {
					root.classList.add('dark');
				} else {
					root.classList.remove('dark');
				}
			}
		}
	}
});

export const { setTheme, updateSystemTheme, toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectSystemTheme = (state: RootState) => state.theme.systemTheme;
export const selectCurrentTheme = (state: RootState) => {
	const theme = state.theme.theme;
	const systemTheme = state.theme.systemTheme;
	return theme === 'system' ? (systemTheme ? 'dark' : 'light') : theme;
};

export default themeSlice.reducer;
