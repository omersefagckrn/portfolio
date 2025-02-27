import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetPassword, selectError, selectIsLoading, clearError } from '../../store/features/authSlice';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { resetPasswordSchema } from '../../schemas/auth';
import { ColoredWall } from '../../components/ColoredWall/ColoredWall';

const ResetPassword = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const hashParams = new URLSearchParams(location.hash.substring(1));
		const error = hashParams.get('error');
		const errorCode = hashParams.get('error_code');
		const errorDescription = hashParams.get('error_description');

		if (error === 'access_denied' && errorCode === 'otp_expired') {
			toast.error('Şifre sıfırlama bağlantısının süresi dolmuş. Lütfen yeni bir bağlantı talep edin.');
			setTimeout(() => {
				navigate('/forgot-password', { replace: true });
			}, 3000);
			return;
		}

		if (error || errorDescription) {
			const message = errorDescription ? decodeURIComponent(errorDescription).replace(/\+/g, ' ') : 'Geçersiz şifre sıfırlama bağlantısı.';
			toast.error(message + ' Lütfen yeni bir şifre sıfırlama bağlantısı talep edin.');
			setTimeout(() => {
				navigate('/forgot-password', { replace: true });
			}, 3000);
			return;
		}

		// URL'den parametreleri al
		const accessToken = hashParams.get('access_token');
		const refreshToken = hashParams.get('refresh_token');
		const type = hashParams.get('type');

		if (!accessToken || !refreshToken || type !== 'recovery') {
			toast.error('Geçersiz şifre sıfırlama bağlantısı. Lütfen yeni bir bağlantı talep edin.');
			setTimeout(() => {
				navigate('/forgot-password', { replace: true });
			}, 3000);
			return;
		}

		setToken(accessToken);
	}, [location, navigate]);

	useEffect(() => {
		dispatch(clearError());
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: ''
		},
		validationSchema: resetPasswordSchema,
		onSubmit: async (values) => {
			if (!token) {
				toast.error('Geçersiz şifre sıfırlama oturumu');
				return;
			}

			try {
				await dispatch(resetPassword({ password: values.password, token })).unwrap();
				toast.success('Şifreniz başarıyla güncellendi! Yeni şifrenizle giriş yapabilirsiniz.');
				setTimeout(() => {
					navigate('/login', { replace: true });
				}, 1500);
			} catch (error: any) {
				toast.error(error);
			}
		}
	});

	if (!token) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-white dark:bg-dark-bg'>
				<div className='text-center'>
					<div className='w-12 h-12 mx-auto border-t-2 border-b-2 rounded-full animate-spin border-primary-600'></div>
					<p className='mt-4 text-gray-600 dark:text-gray-400'>Doğrulama yapılıyor...</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<Helmet>
				<title>Şifre Sıfırlama</title>
				<meta name='description' content='Yeni şifrenizi belirleyin.' />
				<meta name='keywords' content='şifre sıfırlama, reset password' />
				<meta property='og:title' content='Şifre Sıfırlama | Ömer Sefa Güçkıran' />
				<meta property='og:description' content='Yeni şifrenizi belirleyin.' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content={window.location.href} />
				<link rel='canonical' href={window.location.href} />
			</Helmet>

			<div className='flex min-h-screen bg-white dark:bg-dark-bg'>
				<div className='relative flex items-center justify-center w-full p-8 lg:w-1/2'>
					<div className='absolute z-10 top-4 left-4'>
						<Link
							to='/'
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
						>
							← Ana Sayfa
						</Link>
					</div>
					<div className='w-full max-w-md mt-12'>
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='mb-8'>
							<div className='flex flex-col space-y-4'>
								<div className='flex items-center'>
									<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Şifre Sıfırlama</h2>
								</div>
								<p className='text-gray-600 dark:text-gray-400'>Yeni şifrenizi belirleyin.</p>
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
								id='password'
								type='password'
								label='Yeni Şifre'
								placeholder='••••••'
								{...formik.getFieldProps('password')}
								error={formik.touched.password ? formik.errors.password : undefined}
							/>

							<Input
								id='confirmPassword'
								type='password'
								label='Yeni Şifre (Tekrar)'
								placeholder='••••••'
								{...formik.getFieldProps('confirmPassword')}
								error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
							/>

							<div className='space-y-4'>
								<Button type='submit' isFullWidth isLoading={isLoading}>
									Şifremi Güncelle
								</Button>
								<div className='text-center'>
									<Link
										to='/login'
										className='text-sm font-medium transition-colors text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
									>
										Giriş sayfasına dön
									</Link>
								</div>
							</div>
						</motion.form>
					</div>
				</div>

				<ColoredWall title='Yeni Şifrenizi Belirleyin' description='Güvenli bir şifre seçtiğinizden emin olun.' />
			</div>
		</>
	);
};

export default ResetPassword;
