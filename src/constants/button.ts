import { ButtonVariant, ButtonSize } from '../types';

export const variants: Record<ButtonVariant, string> = {
	primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-300 disabled:text-white/70',
	secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-dark-card dark:text-dark-text dark:hover:bg-dark-border disabled:bg-gray-50 dark:disabled:bg-dark-border/50 disabled:text-gray-400 dark:disabled:text-dark-text/50',
	outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-border disabled:border-gray-200 dark:disabled:border-dark-border/50 disabled:text-gray-400 dark:disabled:text-dark-text/50',
	text: 'text-gray-700 hover:text-gray-900 dark:text-dark-text dark:hover:text-white disabled:text-gray-400 dark:disabled:text-dark-text/50'
};

export const sizes: Record<ButtonSize, string> = {
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2',
	lg: 'px-6 py-3 text-lg'
};

export const spinnerSizes: Record<ButtonSize, string> = {
	sm: 'w-3 h-3',
	md: 'w-4 h-4',
	lg: 'w-5 h-5'
};
