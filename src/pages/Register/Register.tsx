import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { PatternFormat } from 'react-number-format';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser, selectError, selectIsLoading, selectIsAuthenticated, clearError } from '../../store/features/authSlice';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { individualSchema } from '../../schemas/auth';
import { ColoredWall } from '../../components/ColoredWall/ColoredWall';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/', { replace: true });
		}
		return () => {
			dispatch(clearError());
		};
	}, [isAuthenticated, navigate, dispatch]);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
			user_type: 'bireysel' as 'bireysel' | 'kurumsal',
			first_name: '',
			last_name: '',
			company_name: '',
			tax_number: '',
			phone: '',
			address: '',
			terms: false
		},
		validationSchema: individualSchema,
		onSubmit: async (values) => {
			try {
				const cleanPhone = values.phone.replace(/[^\d]/g, '');
				const result = await dispatch(
					registerUser({
						email: values.email,
						password: values.password,
						user_type: values.user_type,
						...(values.user_type === 'bireysel'
							? { first_name: values.first_name, last_name: values.last_name }
							: { company_name: values.company_name, tax_number: values.tax_number }),
						phone: cleanPhone,
						address: values.address
					})
				).unwrap();

				navigate('/email-confirmation', {
					replace: true,
					state: { email: result.email }
				});
			} catch (error: any) {
				dispatch({ type: 'auth/register/rejected', payload: error });
			}
		}
	});

	return (
		<>
			<Helmet>
				<title>Kayıt Ol</title>
				<meta
					name='description'
					content="Ömer Sefa Güçkıran'ın web ve mobil uygulama platformuna üye olun. Profesyonel yazılım hizmetlerine erişin ve projelerinizi hayata geçirin."
				/>
				<meta name='keywords' content='kayıt ol, register, web uygulama, mobil uygulama, ömer sefa güçkıran, yazılım geliştirme' />
				<meta property='og:title' content='Kayıt Ol | Ömer Sefa Güçkıran' />
				<meta
					property='og:description'
					content="Ömer Sefa Güçkıran'ın web ve mobil uygulama platformuna üye olun. Profesyonel yazılım hizmetlerine erişin ve projelerinizi hayata geçirin."
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content={window.location.href} />
				<link rel='canonical' href={window.location.href} />
			</Helmet>
			<div className='flex min-h-screen bg-gray-50 dark:bg-dark-bg'>
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
									<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Hesap Oluştur</h2>
								</div>
								<p className='mt-2 text-gray-600 dark:text-gray-400'>
									Zaten hesabınız var mı?{' '}
									<Link
										to='/login'
										className='text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
									>
										Giriş Yap
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

							<div className='space-y-2'>
								<label className='block text-sm font-medium text-gray-700 dark:text-dark-text'>Kayıt Türü</label>
								<div className='grid grid-cols-2 gap-4'>
									<button
										type='button'
										onClick={() => formik.setFieldValue('user_type', 'bireysel')}
										className={`p-4 text-center border rounded-lg transition-colors ${
											formik.values.user_type === 'bireysel'
												? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
												: 'border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-border'
										}`}
									>
										Bireysel
									</button>
									<button
										type='button'
										onClick={() => formik.setFieldValue('user_type', 'kurumsal')}
										className={`p-4 text-center border rounded-lg transition-colors ${
											formik.values.user_type === 'kurumsal'
												? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
												: 'border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-border'
										}`}
									>
										Kurumsal
									</button>
								</div>
								{formik.touched.user_type && formik.errors.user_type && (
									<p className='text-sm text-red-500'>{formik.errors.user_type}</p>
								)}
							</div>

							{formik.values.user_type === 'bireysel' ? (
								<>
									<Input
										id='first_name'
										type='text'
										label='Ad'
										placeholder='Adınızı girin'
										{...formik.getFieldProps('first_name')}
										error={formik.touched.first_name ? formik.errors.first_name : undefined}
									/>
									<Input
										id='last_name'
										type='text'
										label='Soyad'
										placeholder='Soyadınızı girin'
										{...formik.getFieldProps('last_name')}
										error={formik.touched.last_name ? formik.errors.last_name : undefined}
									/>
								</>
							) : formik.values.user_type === 'kurumsal' ? (
								<>
									<Input
										id='company_name'
										type='text'
										label='Şirket Adı'
										placeholder='Şirket adını girin'
										{...formik.getFieldProps('company_name')}
										error={formik.touched.company_name ? formik.errors.company_name : undefined}
									/>
									<Input
										id='tax_number'
										type='text'
										label='Vergi Numarası'
										placeholder='Vergi numarasını girin'
										maxLength={10}
										{...formik.getFieldProps('tax_number')}
										error={formik.touched.tax_number ? formik.errors.tax_number : undefined}
									/>
								</>
							) : null}

							<Input
								id='email'
								type='email'
								label='E-posta'
								placeholder='E-posta adresinizi girin'
								{...formik.getFieldProps('email')}
								error={formik.touched.email ? formik.errors.email : undefined}
							/>

							<Input
								id='password'
								type='password'
								label='Şifre'
								placeholder='Şifre'
								{...formik.getFieldProps('password')}
								error={formik.touched.password ? formik.errors.password : undefined}
							/>

							<Input
								id='confirmPassword'
								type='password'
								label='Şifre Tekrarı'
								placeholder='Şifre'
								{...formik.getFieldProps('confirmPassword')}
								error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
							/>

							<div className='space-y-1'>
								<label htmlFor='phone' className='block text-sm font-medium text-gray-700 dark:text-dark-text'>
									Telefon
								</label>
								<PatternFormat
									format='(###) ###-####'
									mask='_'
									id='phone'
									type='tel'
									placeholder='(555) 555-5555'
									onValueChange={(values) => {
										formik.setFieldValue('phone', values.value);
									}}
									value={formik.values.phone}
									className={`
										block w-full px-4 py-2.5
										bg-gray-50 dark:bg-dark-card
										border rounded-lg
										text-gray-900 dark:text-dark-text
										text-sm
										placeholder:text-gray-500 dark:placeholder:text-white/60
										focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
										disabled:opacity-50 disabled:cursor-not-allowed
										transition-colors duration-200
										${formik.touched.phone && formik.errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-dark-border'}
									`}
								/>
								{formik.touched.phone && formik.errors.phone && <p className='mt-1 text-sm text-red-500'>{formik.errors.phone}</p>}
							</div>

							<Input
								id='address'
								type='text'
								label={formik.values.user_type === 'bireysel' ? 'Adres' : 'İşyeri Adresi'}
								placeholder='Adresinizi girin'
								{...formik.getFieldProps('address')}
								error={formik.touched.address ? formik.errors.address : undefined}
							/>

							<div className='flex items-start space-x-3'>
								<input
									id='terms'
									type='checkbox'
									{...formik.getFieldProps('terms')}
									className='mt-0.5 w-4 h-4 border rounded text-primary-600 focus:ring-primary-500 dark:bg-dark-bg dark:border-dark-border'
								/>
								<div className='text-sm text-gray-600 dark:text-gray-400 hover:underline'>
									<div className='flex flex-wrap items-center gap-x-1.5 gap-y-1'>
										<Link
											to='/privacy-terms'
											className='font-medium transition-colors text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
										>
											Kullanım Koşulları ve Gizlilik Politikası
										</Link>
									</div>
								</div>
							</div>
							{formik.touched.terms && formik.errors.terms && <p className='mt-1 text-sm text-red-500'>{formik.errors.terms}</p>}

							<Button type='submit' isFullWidth isLoading={isLoading}>
								Hesap Oluştur
							</Button>
						</motion.form>
					</div>
				</div>
				<ColoredWall title='Hızlıca kayıt olun' description='Hesabınızı oluşturarak bizlerle birlikte projelerinize yön verin.' />
			</div>
		</>
	);
};

export default Register;
