import { createElement, ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ComponentProps<'button'>, 'className'> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	to?: string;
	isFullWidth?: boolean;
	isLoading?: boolean;
	onClick?: () => void;
}

const variants = {
	primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-300 disabled:text-white/70',
	secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-dark-card dark:text-dark-text dark:hover:bg-dark-border disabled:bg-gray-50 dark:disabled:bg-dark-border/50 disabled:text-gray-400 dark:disabled:text-dark-text/50',
	outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-dark-border disabled:border-primary-300 disabled:text-primary-300 dark:disabled:border-primary-300/50 dark:disabled:text-primary-300/50',
	text: 'text-gray-700 hover:text-primary-600 dark:text-dark-text dark:hover:text-primary-400 disabled:text-gray-400 dark:disabled:text-dark-text/50 hover:bg-transparent'
};

const sizes = {
	sm: 'h-8 px-2 text-sm',
	md: 'h-10 px-3',
	lg: 'h-12 px-4 text-lg'
};

const spinnerSizes = {
	sm: 'w-3 h-3',
	md: 'w-4 h-4',
	lg: 'w-5 h-5'
};

export const Button = ({ variant = 'primary', size = 'md', to, isFullWidth = false, isLoading = false, disabled, onClick, children, ...props }: ButtonProps) => {
	const baseClassName = [
		// Base styles
		'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
		// Focus styles
		variant !== 'text' ? 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg' : 'focus:outline-none',
		// Disabled styles
		'disabled:cursor-not-allowed',
		// Variant styles
		variants[variant],
		// Size styles
		sizes[size],
		// Width styles
		isFullWidth ? 'w-full' : ''
	]
		.filter(Boolean)
		.join(' ');

	const content = (
		<>
			{isLoading && <Loader2 className={`${spinnerSizes[size]} animate-spin mr-2`} aria-hidden='true' />}
			<span className={isLoading ? 'opacity-70' : ''}>{children}</span>
		</>
	);

	if (to) {
		// Link bileşeni disabled özelliğini desteklemediği için,
		// loading veya disabled durumunda normal button olarak render ediyoruz
		if (isLoading || disabled) {
			return createElement('button', {
				className: baseClassName,
				disabled: true,
				type: 'button',
				children: content,
				'aria-disabled': true
			});
		}

		return createElement(Link, {
			to,
			className: baseClassName,
			children: content,
			onClick // Link bileşenine onClick prop'unu iletiyoruz
		});
	}

	return createElement('button', {
		className: baseClassName,
		disabled: isLoading || disabled,
		type: props.type || 'button',
		'aria-disabled': isLoading || disabled,
		onClick,
		...props,
		children: content
	});
};
