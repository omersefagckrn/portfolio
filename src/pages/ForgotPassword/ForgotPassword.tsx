import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { forgotPassword, selectError, selectIsLoading, clearError } from '../../store/features/authSlice';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { forgotPasswordSchema } from '../../schemas/auth';
import { ColoredWall } from '../../components/ColoredWall/ColoredWall';

const ForgotPassword = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);

	useEffect(() => {
		dispatch(clearError());
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validationSchema: forgotPasswordSchema,
		onSubmit: async (values) => {
			try {
				await dispatch(forgotPassword(values.email)).unwrap();
				toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.');
				formik.resetForm();
			} catch (error: any) {
				if (error.includes('saniye bekleyip')) {
					toast.error(error, {
						duration: 5000,
						icon: '⏳'
					});
				} else if (error.includes('kayıtlı bir hesap bulunamadı')) {
					toast.error('Bu email adresi ile kayıtlı bir hesap bulunamadı. Lütfen kayıtlı olduğunuz email adresini giriniz.', {
						duration: 5000,
						icon: '❌'
					});
				} else {
					toast.error(error);
				}
			}
		}
	});

	return (
		<>
			<Helmet>
				<title>Şifremi Unuttum</title>
				<meta name='description' content='Şifrenizi sıfırlamak için email adresinizi girin.' />
				<meta name='keywords' content='şifremi unuttum, şifre sıfırlama, forgot password, reset password' />
				<meta property='og:title' content='Şifremi Unuttum | Ömer Sefa Güçkıran' />
				<meta property='og:description' content='Şifrenizi sıfırlamak için email adresinizi girin.' />
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
									<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Şifremi Unuttum</h2>
								</div>
								<p className='text-gray-600 dark:text-gray-400'>
									Şifrenizi sıfırlamak için email adresinizi girin. Size şifre sıfırlama bağlantısı göndereceğiz.
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
								placeholder='Email'
								{...formik.getFieldProps('email')}
								error={formik.touched.email ? formik.errors.email : undefined}
							/>

							<div className='space-y-4'>
								<Button type='submit' isFullWidth isLoading={isLoading}>
									Şifre Sıfırlama Bağlantısı Gönder
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

				<ColoredWall title='Şifrenizi mi Unuttunuz?' description='Endişelenmeyin, size yardımcı olacağız.' />
			</div>
		</>
	);
};

export default ForgotPassword;
