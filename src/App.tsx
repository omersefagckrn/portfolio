import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { updateSystemTheme, setTheme, Theme } from './store/features/themeSlice';
import { checkAuth, selectIsAuthenticated, selectIsLoading } from './store/features/authSlice';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { EmailConfirmation } from './pages/EmailConfirmation';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { supabase } from './lib/supabase';
import { ProfileLayout } from './components/Layout/ProfileLayout';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/Profile/ProfileEdit';
import ProfileOrders from './pages/Profile/ProfileOrders';

interface RouteProps {
	children: React.ReactNode;
}

const PublicRoute = ({ children }: RouteProps) => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const isLoading = useAppSelector(selectIsLoading);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='w-8 h-8 border-4 rounded-full border-primary-600 border-t-transparent animate-spin' />
			</div>
		);
	}

	if (isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	return children;
};

const PrivateRoute = ({ children }: RouteProps) => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const isLoading = useAppSelector(selectIsLoading);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='w-8 h-8 border-4 rounded-full border-primary-600 border-t-transparent animate-spin' />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	return children;
};

const ThemeInitializer = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const savedTheme = (localStorage.getItem('theme') || 'system') as Theme;
		dispatch(setTheme(savedTheme));

		if (savedTheme === 'system') {
			const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			dispatch(updateSystemTheme(darkModeMediaQuery.matches));

			const handleChange = (e: MediaQueryListEvent) => {
				dispatch(updateSystemTheme(e.matches));
			};

			darkModeMediaQuery.addEventListener('change', handleChange);
			return () => darkModeMediaQuery.removeEventListener('change', handleChange);
		}
	}, [dispatch]);

	return null;
};

const AppContent = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkAuth());

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (session?.user) {
				dispatch({ type: 'auth/check/fulfilled', payload: session.user });
			} else {
				dispatch({ type: 'auth/check/fulfilled', payload: null });
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [dispatch]);

	return (
		<Routes>
			<Route
				path='/'
				element={
					<Layout>
						<Home />
					</Layout>
				}
			/>
			<Route
				path='/login'
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>
			<Route
				path='/register'
				element={
					<PublicRoute>
						<Register />
					</PublicRoute>
				}
			/>
			<Route
				path='/email-confirmation'
				element={
					<PublicRoute>
						<EmailConfirmation />
					</PublicRoute>
				}
			/>
			<Route
				path='/profile'
				element={
					<PrivateRoute>
						<Layout>
							<ProfileLayout />
						</Layout>
					</PrivateRoute>
				}
			>
				<Route index element={<Profile />} />
				<Route path='edit' element={<ProfileEdit />} />
				<Route path='orders' element={<ProfileOrders />} />
			</Route>
		</Routes>
	);
};

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<HelmetProvider>
					<ThemeInitializer />
					<AppContent />
					<Toaster
						position='top-right'
						toastOptions={{
							duration: 4000,
							className: '!bg-white dark:!bg-dark-card !text-gray-900 dark:!text-white'
						}}
					/>
				</HelmetProvider>
			</Router>
		</Provider>
	);
};

export default App;
