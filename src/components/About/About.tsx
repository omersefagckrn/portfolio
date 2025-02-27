import { motion } from 'framer-motion';
import { features } from '../../constants';

const About = () => {
	return (
		<div className='py-24 bg-white dark:bg-dark-bg sm:py-32'>
			<div className='px-6 mx-auto max-w-7xl lg:px-8'>
				<div className='max-w-2xl mx-auto lg:text-center'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className='text-base font-semibold leading-7 text-primary-600 dark:text-primary-400'
					>
						Hakkımda
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						viewport={{ once: true }}
						className='mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'
					>
						Modern Teknolojilerle Profesyonel Çözümler
					</motion.p>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						viewport={{ once: true }}
						className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400'
					>
						Full Stack geliştirici olarak, modern web ve mobil teknolojileri kullanarak işletmeniz için özel çözümler üretiyorum. Kullanıcı deneyimini
						ön planda tutarak, performanslı ve ölçeklenebilir uygulamalar geliştiriyorum.
					</motion.p>
				</div>
				<div className='max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none'>
					<dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2'>
						{features.map((feature, index) => (
							<motion.div
								key={feature.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2, duration: 0.5 }}
								viewport={{ once: true }}
								className='flex flex-col items-start'
							>
								<div className='p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20'>
									<feature.icon className='w-6 h-6 text-primary-600 dark:text-primary-400' aria-hidden='true' />
								</div>
								<dt className='mt-4 font-semibold text-gray-900 dark:text-white'>{feature.name}</dt>
								<dd className='mt-2 text-base leading-7 text-gray-600 dark:text-gray-400'>{feature.description}</dd>
							</motion.div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
};

export default About;
