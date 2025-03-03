import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPackagesByType, selectMobilePackages, selectPackagesLoading, selectPackagesError } from '../../store/features/packagesSlice';
import { Package } from '../../types';

const MobileApp = () => {
	const dispatch = useAppDispatch();
	const packages = useAppSelector(selectMobilePackages);
	const loading = useAppSelector(selectPackagesLoading);
	const error = useAppSelector(selectPackagesError);

	useEffect(() => {
		dispatch(fetchPackagesByType('mobile'));
	}, [dispatch]);

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[300px]'>
				<div className='w-8 h-8 border-4 rounded-full border-primary-500 border-t-transparent animate-spin'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center min-h-[300px]'>
				<p className='text-lg text-red-500'>{error}</p>
			</div>
		);
	}

	// Paketleri fiyata göre küçükten büyüğe sırala
	const sortedPackages = [...packages].sort((a, b) => a.price - b.price);

	return (
		<>
			<Helmet>
				<title>Mobil Uygulama Paketleri</title>
				<meta name='description' content='iOS ve Android için profesyonel mobil uygulama geliştirme paketleri. React Native ile native mobil uygulamalar.' />
			</Helmet>

			<div className='py-12 bg-white dark:bg-dark-bg sm:py-16'>
				<div className='px-6 mx-auto max-w-7xl lg:px-8'>
					<div className='max-w-2xl mx-auto text-center'>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className='text-base font-semibold leading-7 text-primary-600 dark:text-primary-400'
						>
							Mobil Uygulama Paketleri
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							viewport={{ once: true }}
							className='mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'
						>
							Native Mobil Çözümler
						</motion.p>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
							viewport={{ once: true }}
							className='mt-4 text-base leading-7 text-gray-600 dark:text-gray-400'
						>
							iOS ve Android için profesyonel mobil uygulamalar geliştiriyoruz.
						</motion.p>
					</div>

					<div className='grid max-w-2xl grid-cols-1 mx-auto mt-10 gap-y-4 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-6'>
						{sortedPackages.map((pkg: Package, index: number) => (
							<motion.div
								key={pkg.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2, duration: 0.5 }}
								viewport={{ once: true }}
								className='flex flex-col p-6 bg-white border shadow-sm dark:bg-dark-card dark:border-dark-border rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800 xl:p-8'
							>
								<div className='flex items-center justify-between gap-x-4'>
									<h3 className='text-lg font-semibold leading-8 text-gray-900 dark:text-white'>{pkg.name}</h3>
								</div>
								<p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400'>{pkg.description}</p>
								<p className='flex items-baseline mt-4 gap-x-1'>
									<span className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
										{pkg.price.toLocaleString('tr-TR')}
									</span>
									<span className='text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400'>₺</span>
								</p>
								<Link
									to={`/profile`}
									className='block px-3 py-2 mt-4 text-sm font-semibold leading-6 text-center text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400'
								>
									Hemen Başla
								</Link>
								<ul role='list' className='mt-6 space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-400'>
									{Array.isArray(pkg.features) &&
										pkg.features.map((feature: string, featureIndex: number) => (
											<li key={featureIndex} className='flex gap-x-3'>
												<Check
													className='flex-none w-5 h-5 text-primary-600 dark:text-primary-400'
													aria-hidden='true'
												/>
												{feature}
											</li>
										))}
								</ul>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default MobileApp;
