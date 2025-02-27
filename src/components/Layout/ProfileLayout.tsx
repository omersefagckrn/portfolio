import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUser, logoutUser } from '../../store/features/authSlice';
import { profileNavigation } from '../../constants';
import { LogOut } from 'lucide-react';
import type { AppDispatch } from '../../store/store';

export const ProfileLayout = () => {
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);

	if (!isAuthenticated || !user) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<div className='relative overflow-hidden isolate'>
			<div className='container py-8 mx-auto'>
				<div className='grid grid-cols-12 gap-8'>
					{/* Sidebar */}
					<div className='col-span-12 md:col-span-3'>
						<nav className='overflow-hidden rounded-lg shadow-sm bg-white/80 backdrop-blur-sm dark:bg-dark-card/80'>
							<div className='p-2 space-y-2'>
								{profileNavigation.map((item) => {
									const isActive = location.pathname === item.to;
									return (
										<Link
											key={item.to}
											to={item.to}
											className={cn(
												'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md',
												isActive
													? 'text-primary-500 bg-primary-50/80 dark:bg-primary-500/10'
													: 'text-gray-700 dark:text-gray-200 hover:bg-gray-50/80 dark:hover:bg-dark-border/80'
											)}
										>
											<item.icon className='w-4 h-4' />
											{item.name}
										</Link>
									);
								})}
								<div className='h-px my-2 bg-gray-200 dark:bg-dark-border' />
								<button
									onClick={handleLogout}
									className='flex items-center w-full gap-2 px-4 py-2 text-sm font-medium text-red-500 transition-colors rounded-md hover:bg-red-50/80 dark:hover:bg-red-500/10'
								>
									<LogOut className='w-4 h-4' />
									Çıkış Yap
								</button>
							</div>
						</nav>
					</div>

					{/* Content */}
					<div className='col-span-12 md:col-span-9'>
						<div className='overflow-hidden rounded-lg shadow-sm bg-white/80 backdrop-blur-sm dark:bg-dark-card/80'>
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
