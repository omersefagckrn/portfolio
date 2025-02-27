import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { updateSystemTheme, setTheme, Theme } from './store/features/themeSlice';
import { checkAuth, selectIsAuthenticated, selectIsLoading } from './store/features/authSlice';
import { Layout } from './components/Layout/Layout';
import { supabase } from './lib/supabase';
import { ProfileLayout } from './components/Layout/ProfileLayout';
import { Toaster } from 'react-hot-toast';
import { Home, WebApp, MobileApp, Login, Register, EmailConfirmation, ForgotPassword, ResetPassword, Profile, ProfileEdit, ProfileOrders, PrivacyTerms } from './pages';

interface RouteProps {
	children: React.ReactNode;
}

const PublicRoute = ({ children }: RouteProps) => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	return isAuthenticated ? <Navigate to='/' replace /> : children;
};

const PrivateRoute = ({ children }: RouteProps) => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	return isAuthenticated ? children : <Navigate to='/login' replace />;
};

const LoadingSpinner = () => (
	<div className='flex items-center justify-center min-h-screen bg-white dark:bg-dark-bg'>
		<div className='w-8 h-8 border-4 rounded-full border-primary-600 border-t-transparent animate-spin' />
	</div>
);

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
	const isLoading = useAppSelector(selectIsLoading);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const initAuth = async () => {
			const {
				data: { session }
			} = await supabase.auth.getSession();
			if (session?.user) {
				await dispatch(checkAuth());
			} else {
				dispatch({ type: 'auth/check/fulfilled', payload: null });
			}
			setIsInitialized(true);
		};

		initAuth();

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (session?.user) {
				dispatch(checkAuth());
			} else {
				dispatch({ type: 'auth/check/fulfilled', payload: null });
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [dispatch]);

	if (!isInitialized || isLoading) {
		return <LoadingSpinner />;
	}

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
				path='/web-app'
				element={
					<Layout>
						<WebApp />
					</Layout>
				}
			/>
			<Route
				path='/mobile-app'
				element={
					<Layout>
						<MobileApp />
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
				path='/forgot-password'
				element={
					<PublicRoute>
						<ForgotPassword />
					</PublicRoute>
				}
			/>
			<Route path='/reset-password' element={<ResetPassword />} />

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
			<Route
				path='/privacy-terms'
				element={
					<Layout>
						<PrivacyTerms />
					</Layout>
				}
			/>
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
							duration: 2500,
							className: '!bg-white dark:!bg-dark-card !text-gray-900 dark:!text-white'
						}}
					/>
				</HelmetProvider>
			</Router>
		</Provider>
	);
};

export default App;
