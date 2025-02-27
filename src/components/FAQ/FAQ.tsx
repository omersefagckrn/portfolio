import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { faqs } from '../../constants';

export const FAQ = () => {
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
						Sıkça Sorulan Sorular
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						viewport={{ once: true }}
						className='mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'
					>
						Aklınızdaki Soruları Yanıtlayalım
					</motion.p>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						viewport={{ once: true }}
						className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400'
					>
						Proje süreçleri, teknolojiler ve diğer konulardaki sorularınızın cevaplarını burada bulabilirsiniz.
					</motion.p>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					viewport={{ once: true }}
					className='max-w-2xl mx-auto mt-16'
				>
					<div className='divide-y divide-gray-200 dark:divide-dark-border'>
						{faqs.map((section) => (
							<div key={section.title} className='py-6'>
								<h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>{section.title}</h2>
								<div className='space-y-4'>
									{section.items.map((item) => (
										<Disclosure key={item.question}>
											{({ open }) => (
												<div className='pt-2'>
													<Disclosure.Button className='flex justify-between w-full px-4 py-4 text-left rounded-lg bg-gray-50 dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-card/80'>
														<span className='text-lg font-medium text-gray-900 dark:text-white'>
															{item.question}
														</span>
														<ChevronDown
															className={cn(
																'w-5 h-5 text-gray-500 dark:text-gray-400',
																open && 'transform rotate-180'
															)}
														/>
													</Disclosure.Button>
													<Disclosure.Panel className='px-4 pt-4 pb-2 text-gray-600 dark:text-gray-300'>
														<div className='space-y-4'>
															{item.answer.map((line, index) => (
																<div
																	key={index}
																	className={
																		line.startsWith('•')
																			? 'ml-4'
																			: 'font-medium'
																	}
																>
																	{line}
																</div>
															))}
														</div>
													</Disclosure.Panel>
												</div>
											)}
										</Disclosure>
									))}
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default FAQ;
