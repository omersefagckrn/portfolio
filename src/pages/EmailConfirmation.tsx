import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../store/hooks';
import { selectIsAuthenticated } from '../store/features/authSlice';
import { Button } from '../components/Button/Button';

export const EmailConfirmation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const email = (location.state as { email: string })?.email;

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return (
		<>
			<Helmet>
				<title>Email'inizi Onaylayın</title>
				<meta name='description' content="Email adresinizi onaylayın ve Ömer Sefa Güçkıran'ın web ve mobil uygulama platformuna tam erişim sağlayın." />
				<meta name='keywords' content='email onayı, email confirmation, web uygulama, mobil uygulama, ömer sefa güçkıran' />
				<meta property='og:title' content='Email Onayı | Ömer Sefa Güçkıran' />
				<meta property='og:description' content="Email adresinizi onaylayın ve Ömer Sefa Güçkıran'ın web ve mobil uygulama platformuna tam erişim sağlayın." />
				<meta property='og:type' content='website' />
				<meta property='og:url' content={window.location.href} />
				<link rel='canonical' href={window.location.href} />
			</Helmet>
			<div className='flex min-h-screen bg-gray-50 dark:bg-dark-bg'>
				<div className='flex flex-col items-center justify-center w-full max-w-2xl p-8 mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='w-full max-w-md space-y-6 text-center'
					>
						<div className='p-4 bg-white rounded-lg shadow-sm dark:bg-dark-card'>
							<div className='flex justify-center mb-4'>
								<svg
									className='w-16 h-16 text-primary-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76'
									/>
								</svg>
							</div>
							<h2 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>Email Onayı Gerekli</h2>
							<p className='mb-4 text-gray-600 dark:text-gray-400'>
								{email ? (
									<>
										<span className='font-medium text-primary-600'>{email}</span> adresine bir onay e-postası gönderdik.
										Lütfen e-postanızı kontrol edin ve hesabınızı onaylamak için e-postadaki bağlantıya tıklayın.
									</>
								) : (
									'Hesabınızı onaylamak için size gönderilen e-postadaki bağlantıya tıklayın.'
								)}
							</p>
							<div className='space-y-3'>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									E-posta kutunuzu kontrol ettikten sonra giriş yapabilirsiniz.
								</p>
								<Button variant='outline' to='/login' isFullWidth>
									Giriş Sayfasına Dön
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
};
