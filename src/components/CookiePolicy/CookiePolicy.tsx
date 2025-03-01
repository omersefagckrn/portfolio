import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookiePolicyProps {
	isOpen: boolean;
	onClose: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ isOpen, onClose }) => {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50' onClick={handleBackdropClick}>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.2 }}
						className='bg-white dark:bg-dark-card rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto'
					>
						<div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border'>
							<h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Çerez Politikası</h2>
							<button
								onClick={onClose}
								className='text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
							>
								<X size={24} />
							</button>
						</div>

						<div className='p-6 text-gray-700 dark:text-gray-300'>
							<h3 className='mb-3 text-lg font-medium text-gray-900 dark:text-white'>Çerezler Hakkında</h3>
							<p className='mb-4'>
								Bu web sitesi, size en iyi deneyimi sunmak için çerezleri kullanmaktadır. Çerezler, web sitemizi ziyaret ettiğinizde
								cihazınıza kaydedilen küçük metin dosyalarıdır.
							</p>

							<h3 className='mb-3 text-lg font-medium text-gray-900 dark:text-white'>Kullandığımız Çerez Türleri</h3>
							<ul className='pl-5 mb-4 space-y-2 list-disc'>
								<li>
									<strong>Zorunlu Çerezler:</strong> Web sitesinin düzgün çalışması için gereklidir. Oturum açma, form doldurma
									gibi temel işlevleri sağlarlar.
								</li>
								<li>
									<strong>Analitik Çerezler:</strong> Ziyaretçilerin web sitesini nasıl kullandığını anlamamıza yardımcı olur.
									Bu bilgiler, site performansını ve kullanıcı deneyimini iyileştirmemize olanak tanır.
								</li>
								<li>
									<strong>Pazarlama Çerezleri:</strong> Ziyaretçilere ilgi alanlarına göre reklamlar göstermek için kullanılır.
								</li>
							</ul>

							<h3 className='mb-3 text-lg font-medium text-gray-900 dark:text-white'>Çerezleri Nasıl Kontrol Edebilirsiniz?</h3>
							<p className='mb-4'>
								Çoğu web tarayıcısı, çerezleri kabul etmeyi varsayılan olarak ayarlar. Ancak, tarayıcı ayarlarınızı değiştirerek
								çerezleri reddedebilir veya belirli çerezleri engelleyebilirsiniz. Tarayıcınızın çerez ayarlarını nasıl
								değiştireceğinizi öğrenmek için tarayıcınızın yardım bölümüne bakabilirsiniz.
							</p>

							<p className='mt-6 text-sm text-gray-500 dark:text-gray-400'>Bu çerez politikası en son 01.03.2025 tarihinde güncellenmiştir.</p>
						</div>

						<div className='flex justify-end p-4 border-t border-gray-200 dark:border-dark-border'>
							<button onClick={onClose} className='px-4 py-2 text-white transition-colors rounded-md bg-primary-500 hover:bg-primary-600'>
								Anladım
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default CookiePolicy;
