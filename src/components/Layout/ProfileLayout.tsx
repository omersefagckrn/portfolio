import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { User, Settings, ShoppingBag } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../../store/features/authSlice';

const navigation = [
	{
		name: 'Profilim',
		to: '/profile',
		icon: User
	},
	{
		name: 'Profilimi Düzenle',
		to: '/profile/edit',
		icon: Settings
	},
	{
		name: 'Siparişlerim',
		to: '/profile/orders',
		icon: ShoppingBag
	}
];

export const ProfileLayout = () => {
	const location = useLocation();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);

	// Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir
	if (!isAuthenticated || !user) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return (
		<div className='container py-8 mx-auto'>
			<div className='grid grid-cols-12 gap-8'>
				{/* Sidebar */}
				<div className='col-span-12 md:col-span-3'>
					<nav className='overflow-hidden bg-white rounded-lg shadow-sm dark:bg-dark-card'>
						<div className='p-2'>
							{navigation.map((item) => {
								const isActive = location.pathname === item.to;
								return (
									<Link
										key={item.to}
										to={item.to}
										className={cn(
											'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md',
											isActive
												? 'text-primary-500 bg-primary-50 dark:bg-primary-500/10'
												: 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
										)}
									>
										<item.icon className='w-4 h-4' />
										{item.name}
									</Link>
								);
							})}
						</div>
					</nav>
				</div>

				{/* Content */}
				<div className='col-span-12 md:col-span-9'>
					<div className='overflow-hidden bg-white rounded-lg shadow-sm dark:bg-dark-card'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};
