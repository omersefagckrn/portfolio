import { createElement, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from '../../types';
import { variants, sizes, spinnerSizes } from '../../constants';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'md', to, isFullWidth = false, isLoading = false, disabled, onClick, children, ...props }, ref) => {
	const baseClassName = [
		'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
		variant !== 'text' ? 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg' : 'focus:outline-none',
		'disabled:cursor-not-allowed',
		variants[variant],
		sizes[size],
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
			onClick
		});
	}

	return createElement('button', {
		ref,
		className: baseClassName,
		disabled: isLoading || disabled,
		type: props.type || 'button',
		'aria-disabled': isLoading || disabled,
		onClick,
		...props,
		children: content
	});
});
