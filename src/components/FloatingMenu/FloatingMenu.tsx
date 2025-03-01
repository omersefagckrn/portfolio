import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FloatingMenuProps } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMenu = ({ items }: FloatingMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<div className='fixed z-50 bottom-6 right-6'>
			<button
				onClick={toggleMenu}
				className='flex items-center justify-center w-12 h-12 text-white transition-colors duration-200 rounded-full shadow-lg bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
				aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
			>
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.8 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.8 }}
						transition={{ duration: 0.2 }}
						className='absolute right-0 mb-2 bottom-16'
					>
						<div className='flex flex-col gap-2'>
							{items.map((item, index) => (
								<motion.button
									key={index}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{ duration: 0.2, delay: index * 0.05 }}
									onClick={() => {
										item.onClick();
										setIsOpen(false);
									}}
									className='flex items-center gap-2 px-4 py-3 transition-colors duration-200 bg-white rounded-lg shadow-md dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover'
								>
									<span className='text-primary-500'>{item.icon}</span>
									<span className='text-sm font-medium text-gray-700 dark:text-white whitespace-nowrap'>{item.label}</span>
								</motion.button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FloatingMenu;
