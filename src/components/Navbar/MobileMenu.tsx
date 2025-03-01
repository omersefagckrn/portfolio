import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileMenuProps } from '../../types';
import { mainNavLinks, profileNavigation } from '../../constants';

export const MobileMenu = ({ isOpen, onClose, isAuthenticated, onLogout }: MobileMenuProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 bg-white/95 backdrop-blur-sm dark:bg-dark-bg/95'
				>
					<div className='flex flex-col h-full'>
						<div className='flex items-center justify-end p-4 border-b border-gray-200 dark:border-dark-border'>
							<button
								onClick={onClose}
								className='p-2 text-gray-700 transition-colors rounded-lg dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border'
							>
								<X className='w-6 h-6' />
							</button>
						</div>

						<div className='flex flex-col flex-grow p-4'>
							{mainNavLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									onClick={onClose}
									className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
								>
									<link.icon className='w-4 h-4' />
									{link.name}
								</Link>
							))}

							{!isAuthenticated ? (
								<>
									<Link
										to='/login'
										onClick={onClose}
										className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
									>
										<LogIn className='w-4 h-4' />
										Giriş Yap
									</Link>
									<Link
										to='/register'
										onClick={onClose}
										className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
									>
										<UserPlus className='w-4 h-4' />
										Kayıt Ol
									</Link>
								</>
							) : (
								<>
									{profileNavigation.map((item) => (
										<Link
											key={item.to}
											to={item.to}
											onClick={onClose}
											className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
										>
											<item.icon className='w-4 h-4' />
											{item.name}
										</Link>
									))}
									<button
										onClick={() => {
											onLogout();
											onClose();
										}}
										className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10'
									>
										<LogOut className='w-4 h-4' />
										Çıkış Yap
									</button>
								</>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
