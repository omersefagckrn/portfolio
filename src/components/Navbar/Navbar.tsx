import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentTheme, toggleTheme } from '../../store/features/themeSlice';
import { selectIsAuthenticated, logoutUser } from '../../store/features/authSlice';
import { Sun, Moon, Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { Button } from '../Button/Button';
import { UserMenu } from './UserMenu';
import { Link } from 'react-router-dom';
import { mainNavLinks } from '../../constants';

export const Navbar = () => {
	const dispatch = useAppDispatch();
	const currentTheme = useAppSelector(selectCurrentTheme);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const getThemeIcon = () => {
		return currentTheme === 'light' ? <Sun className='w-5 h-5 text-dark-bg dark:text-white' /> : <Moon className='w-5 h-5 text-dark-bg dark:text-white' />;
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	const HomeIcon = mainNavLinks[0].icon;

	return (
		<>
			<nav className='fixed top-0 left-0 right-0 z-40 bg-white border-b-2 dark:border-none dark:bg-dark-bg'>
				<div className='container mx-auto'>
					<div className='flex items-center justify-between h-16'>
						<div className='hidden lg:flex lg:items-center lg:gap-2'>
							{mainNavLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
								>
									<link.icon className='w-4 h-4' />
									{link.name}
								</Link>
							))}
						</div>

						<Link
							to='/'
							className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md lg:hidden dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
						>
							<HomeIcon className='w-4 h-4' />
							{mainNavLinks[0].name}
						</Link>

						<div className='items-center hidden md:flex md:gap-4'>
							{!isAuthenticated ? (
								<div className='flex items-center gap-2'>
									<Button to='/login' variant='text'>
										Giriş Yap
									</Button>
									<Button to='/register' variant='text'>
										Kayıt Ol
									</Button>
								</div>
							) : (
								<UserMenu onLogout={handleLogout} />
							)}

							<button
								onClick={() => dispatch(toggleTheme())}
								className='p-2.5 text-gray-500 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-border/50'
								aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
							>
								{getThemeIcon()}
							</button>
						</div>

						<div className='flex items-center space-x-4 md:hidden'>
							<button
								onClick={() => dispatch(toggleTheme())}
								className='p-2.5 text-gray-500 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-border/50'
							>
								{getThemeIcon()}
							</button>
							<button
								onClick={() => setIsMobileMenuOpen(true)}
								className='p-2.5 text-gray-500 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-border/50'
							>
								<Menu className='w-5 h-5' />
							</button>
						</div>
					</div>
				</div>
			</nav>

			<MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
		</>
	);
};
