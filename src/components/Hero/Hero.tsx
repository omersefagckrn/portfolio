import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import ProfileImg from '../../assets/profile.jpg';

const Hero = () => {
	return (
		<div className='relative isolate'>
			<div className='absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80' aria-hidden='true'>
				<div
					className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-20 dark:from-primary-800 dark:to-primary-600 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
					style={{
						clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
				/>
			</div>
			<div className='py-24 sm:py-32 lg:pb-40'>
				<div className='px-6 mx-auto max-w-7xl lg:px-8'>
					<div className='grid items-center grid-cols-1 gap-16 lg:grid-cols-2'>
						<div className='max-w-2xl mx-auto text-center lg:text-left'>
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'
							>
								Web ve Mobil Uygulama Geliştirme Hizmetleri
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, duration: 0.5 }}
								className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400'
							>
								Modern teknolojiler kullanarak işletmeniz için özel web ve mobil uygulamalar geliştiriyorum. Profesyonel çözümlerle
								dijital dönüşümünüzü destekliyorum.
							</motion.p>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.5 }}
								className='flex flex-wrap justify-center gap-4 mt-10 lg:justify-start'
							>
								<a
									href='tel:+905078455183'
									className='flex items-center gap-2 text-sm font-semibold leading-6 underline transition-colors text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300'
								>
									İletişime Geç <Phone className='w-4 h-4' />
								</a>
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.3, duration: 0.5 }}
							className='relative max-w-md mx-auto aspect-square'
						>
							<div className='absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500 to-primary-300 blur-3xl opacity-20 dark:from-primary-600 dark:to-primary-400'></div>
							<img src={ProfileImg} alt='Ömer Şefa Güçkıran' className='relative object-cover w-full h-full rounded-full shadow-2xl' />
						</motion.div>
					</div>
				</div>
			</div>
			<div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]' aria-hidden='true'>
				<div
					className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-200 to-primary-400 opacity-20 dark:from-primary-800 dark:to-primary-600 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
					style={{
						clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
				/>
			</div>
		</div>
	);
};

export default Hero;
