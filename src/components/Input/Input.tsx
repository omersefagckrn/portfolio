import { createElement, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Eye, EyeOff } from 'lucide-react';
import { InputProps } from '../../types';
import { inputSizes, inputVariants } from '../../constants';

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error,
			containerClassName,
			id,
			type = 'text',
			size = 'md',
			variant = 'default',
			leftIcon,
			rightIcon,
			isFullWidth = false,
			preventAutocomplete = true,
			className,
			isTextarea = false,
			rows = 3,
			...props
		},
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const isPasswordInput = type === 'password';

		// Generate a random name for autocomplete prevention if needed
		const randomName = preventAutocomplete ? `field_${Math.random().toString(36).substring(2, 10)}` : undefined;

		const baseInputClassName = [
			'block border rounded-lg',
			'text-gray-900 dark:text-dark-text',
			'placeholder:text-gray-500 dark:placeholder:text-white/60',
			'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			'transition-colors duration-200',
			error ? 'border-red-500 dark:border-red-500' : inputVariants[variant],
			inputSizes[size],
			'w-full',
			leftIcon ? 'pl-10' : '',
			isPasswordInput || rightIcon ? 'pr-12' : ''
		]
			.filter(Boolean)
			.join(' ');

		const inputClassName = twMerge(baseInputClassName, className);

		const renderLabel = () => {
			if (!label) return null;

			return createElement('label', {
				htmlFor: id,
				className: 'block text-sm font-medium text-gray-700 dark:text-dark-text mb-1',
				children: label
			});
		};

		const renderPasswordToggle = () => {
			if (!isPasswordInput) return null;

			return createElement('button', {
				type: 'button',
				onClick: () => setShowPassword(!showPassword),
				className: 'absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 selection-none focus:outline-none hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
				children: showPassword
					? createElement(EyeOff, { className: 'w-5 h-5', 'aria-hidden': 'true' })
					: createElement(Eye, { className: 'w-5 h-5', 'aria-hidden': 'true' })
			});
		};

		const renderLeftIcon = () => {
			if (!leftIcon) return null;

			return createElement('div', {
				className: `absolute ${isTextarea ? 'top-3 left-3' : 'inset-y-0 left-0 flex items-center pl-3'} pointer-events-none`,
				children: leftIcon
			});
		};

		const renderRightIcon = () => {
			if (isPasswordInput || !rightIcon) return null;

			return createElement('div', {
				className: `absolute ${isTextarea ? 'top-3 right-3' : 'inset-y-0 right-0 flex items-center pr-3'}`,
				children: rightIcon
			});
		};

		const renderError = () => {
			if (!error) return null;

			return createElement('p', {
				className: 'mt-1.5 text-sm text-red-500',
				children: error
			});
		};

		const inputElement = isTextarea
			? createElement('textarea', {
					id,
					className: inputClassName,
					rows,
					autoComplete: preventAutocomplete ? 'off' : props.autoComplete,
					name: randomName,
					...props
			  })
			: createElement('input', {
					ref,
					id,
					type: isPasswordInput ? (showPassword ? 'text' : 'password') : type,
					className: inputClassName,
					autoComplete: preventAutocomplete ? 'off' : props.autoComplete,
					name: randomName,
					...props
			  });

		const inputContainer = createElement('div', {
			className: 'relative',
			children: [renderLeftIcon(), inputElement, renderPasswordToggle() || renderRightIcon()]
		});

		return createElement('div', {
			className: twMerge('space-y-1', containerClassName),
			children: [renderLabel(), inputContainer, renderError()]
		});
	}
);
