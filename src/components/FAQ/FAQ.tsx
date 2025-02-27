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
						{faqs.map((faq, index) => (
							<Disclosure as='div' key={index} className='py-6'>
								{({ open }: { open: boolean }) => (
									<>
										<dt>
											<Disclosure.Button className='flex items-start justify-between w-full text-left'>
												<span className='text-base font-semibold leading-7 text-gray-900 dark:text-white'>
													{faq.question}
												</span>
												<span className='flex items-center ml-6 h-7'>
													<ChevronDown
														className={cn(
															'w-6 h-6 transform transition-transform text-gray-600 dark:text-gray-400',
															open ? 'rotate-180' : ''
														)}
														aria-hidden='true'
													/>
												</span>
											</Disclosure.Button>
										</dt>
										<Disclosure.Panel as='dd' className='pr-12 mt-2'>
											<p className='text-base leading-7 text-gray-600 dark:text-gray-400'>{faq.answer}</p>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default FAQ;
