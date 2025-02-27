import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Eye, EyeOff } from 'lucide-react';
import { InputProps } from '../../types';

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, containerClassName, id, type, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	const isPasswordInput = type === 'password';

	return (
		<div className={twMerge('space-y-1', containerClassName)}>
			{label && (
				<label htmlFor={id} className='block text-sm font-medium text-gray-700 dark:text-dark-text'>
					{label}
				</label>
			)}
			<div>
				<div className='relative'>
					<input
						ref={ref}
						id={id}
						type={isPasswordInput ? (showPassword ? 'text' : 'password') : type}
						className={`
							block w-full px-4 py-2.5
							bg-gray-50 dark:bg-dark-card
							border rounded-lg
							text-gray-900 dark:text-dark-text
							text-sm
							placeholder:text-gray-500 dark:placeholder:text-white
							focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
							disabled:opacity-50 disabled:cursor-not-allowed
							transition-colors duration-200
							${error ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-dark-border'}
							${isPasswordInput ? 'pr-12' : ''}
						`}
						{...props}
					/>
					{isPasswordInput && (
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 selection-none focus:outline-none hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
						>
							{showPassword ? <EyeOff className='w-5 h-5 ' aria-hidden='true' /> : <Eye className='w-5 h-5 ' aria-hidden='true' />}
						</button>
					)}
				</div>
				{error && <p className='mt-1.5 text-sm text-red-500'>{error}</p>}
			</div>
		</div>
	);
});
