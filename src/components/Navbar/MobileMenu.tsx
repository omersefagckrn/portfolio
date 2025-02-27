import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button/Button';
import { X, LogOut, User, Settings, Home, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
	isAuthenticated: boolean;
	onLogout: () => void;
}

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
						{/* Header */}
						<div className='flex items-center justify-end p-4 border-b border-gray-200 dark:border-dark-border'>
							<button
								onClick={onClose}
								className='p-2 text-gray-700 transition-colors rounded-lg dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border'
							>
								<X className='w-6 h-6' />
							</button>
						</div>

						{/* Navigation Links */}
						<div className='flex flex-col flex-grow p-4 space-y-4'>
							<Link
								to='/'
								onClick={onClose}
								className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
							>
								<Home className='w-4 h-4' />
								Ana Sayfa
							</Link>

							<Link
								to='/mobile-app'
								onClick={onClose}
								className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
							>
								<Smartphone className='w-4 h-4' />
								Mobil Uygulama
							</Link>

							<Link
								to='/web-app'
								onClick={onClose}
								className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
							>
								<Globe className='w-4 h-4' />
								Web Uygulama
							</Link>

							{!isAuthenticated ? (
								<>
									<Button to='/login' variant='text' size='lg' isFullWidth onClick={onClose}>
										Giriş Yap
									</Button>
									<Button to='/register' variant='text' size='lg' isFullWidth onClick={onClose}>
										Kayıt Ol
									</Button>
								</>
							) : (
								<>
									<Link
										to='/profile'
										onClick={onClose}
										className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
									>
										<User className='w-4 h-4' />
										Profilim
									</Link>
									<Link
										to='/profile/edit'
										onClick={onClose}
										className='flex items-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
									>
										<Settings className='w-4 h-4' />
										Profilimi Düzenle
									</Link>
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
