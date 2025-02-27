import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, selectError, selectIsLoading, selectIsAuthenticated, clearError } from '../store/features/authSlice';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { loginSchema } from '../schemas/auth';

export const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const from = (location.state as any)?.from?.pathname || '/';

	useEffect(() => {
		dispatch(clearError());
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate(from, { replace: true });
		}
	}, [isAuthenticated, navigate, from]);

	const formik = useFormik({
		initialValues: {
			email: localStorage.getItem('rememberedEmail') || '',
			password: '',
			remember: localStorage.getItem('rememberMe') === 'true'
		},
		validationSchema: loginSchema,
		onSubmit: async (values) => {
			try {
				if (values.remember) {
					localStorage.setItem('rememberedEmail', values.email);
					localStorage.setItem('rememberMe', 'true');
				} else {
					localStorage.removeItem('rememberedEmail');
					localStorage.removeItem('rememberMe');
				}

				const result = await dispatch(
					loginUser({
						email: values.email,
						password: values.password,
						remember: values.remember
					})
				).unwrap();

				if (!result) {
					throw new Error('Giriş yapılamadı');
				}
			} catch (error: any) {
				dispatch({ type: 'auth/login/rejected', payload: error });
			}
		}
	});

	return (
		<>
			<Helmet>
				<title>Giriş Yap</title>
				<meta name='description' content="Ömer Sefa Güçkıran'ın web ve mobil uygulama platformuna giriş yapın. Profesyonel yazılım hizmetlerine erişin." />
				<meta name='keywords' content='giriş yap, login, web uygulama, mobil uygulama, ömer sefa güçkıran' />
				<meta property='og:title' content='Giriş Yap | Ömer Sefa Güçkıran' />
				<meta property='og:description' content="Ömer Sefa Güçkıran'ın web ve mobil uygulama platformuna giriş yapın. Profesyonel yazılım hizmetlerine erişin." />
				<meta property='og:type' content='website' />
				<meta property='og:url' content={window.location.href} />
				<link rel='canonical' href={window.location.href} />
			</Helmet>
			<div className='flex min-h-screen bg-gray-50 dark:bg-dark-bg'>
				{/* Left Side - Image */}
				<div className='relative hidden w-1/2 lg:block'>
					<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='absolute inset-0'>
						<img
							src='https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=1920&auto=format&fit=crop'
							alt='Login'
							className='object-cover w-full h-full'
						/>
						<div className='absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent' />
					</motion.div>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='max-w-xl p-8 text-white'>
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className='mb-4 text-5xl font-bold'
							>
								Sizler için,
								<br />
								Çalışmaya hazırız
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								className='text-lg text-white/90'
							>
								Profesyonel yazılım hizmetlerine erişin.
							</motion.p>
						</div>
					</div>
				</div>

				{/* Right Side - Form */}
				<div className='relative flex items-center justify-center w-full p-8 lg:w-1/2'>
					<div className='absolute z-10 top-4 left-4'>
						<Link
							to='/'
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
						>
							← Ana Sayfa
						</Link>
					</div>
					<div className='w-full max-w-md mt-12'>
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='mb-8'>
							<div className='flex flex-col space-y-4'>
								<div className='flex items-center'>
									<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Giriş Yap</h2>
								</div>
								<p className='text-gray-600 dark:text-gray-400'>
									Hesabınız yok mu?{' '}
									<Link
										to='/register'
										className='transition-colors text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
									>
										Kayıt Ol
									</Link>
								</p>
							</div>
						</motion.div>

						<motion.form
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className='space-y-6'
							onSubmit={formik.handleSubmit}
						>
							{error && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className='p-4 text-sm font-medium text-red-600 border-2 border-red-200 rounded-lg bg-red-50 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'
								>
									<div className='flex items-center gap-2'>
										<svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
												clipRule='evenodd'
											/>
										</svg>
										<span>{error}</span>
									</div>
								</motion.div>
							)}

							<Input
								id='email'
								type='email'
								label='Email'
								placeholder='Enter your email'
								{...formik.getFieldProps('email')}
								error={formik.touched.email ? formik.errors.email : undefined}
							/>

							<Input
								id='password'
								type='password'
								label='Password'
								placeholder='123456'
								{...formik.getFieldProps('password')}
								error={formik.touched.password ? formik.errors.password : undefined}
							/>

							<div className='flex items-center justify-between'>
								<div className='flex items-center'>
									<input
										id='remember'
										type='checkbox'
										{...formik.getFieldProps('remember')}
										className='w-4 h-4 border rounded text-primary-600 focus:ring-primary-500 dark:bg-dark-bg dark:border-dark-border'
									/>
									<label htmlFor='remember' className='block ml-2 text-sm text-gray-700 dark:text-dark-text'>
										Beni Hatırla
									</label>
								</div>
								<Button variant='text' size='sm' to='/forgot-password'>
									Şifremi Unuttum
								</Button>
							</div>

							<div className='space-y-4'>
								<Button type='submit' isFullWidth isLoading={isLoading}>
									Giriş Yap
								</Button>
							</div>
						</motion.form>
					</div>
				</div>
			</div>
		</>
	);
};
