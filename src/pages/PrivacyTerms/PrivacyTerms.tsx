import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Cookie, Mail, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyTerms = () => {
	// Animasyon varyantları
	const animations = {
		container: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.1,
					delayChildren: 0.2
				}
			}
		},
		item: {
			hidden: { opacity: 0, y: 20 },
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.5,
					ease: 'easeOut'
				}
			}
		},
		title: {
			hidden: { opacity: 0, x: -20 },
			visible: {
				opacity: 1,
				x: 0,
				transition: {
					duration: 0.6,
					ease: 'easeOut'
				}
			}
		}
	};

	// Bölüm bileşeni
	const Section = ({ title, icon, children, iconColor = 'text-primary-500' }: { title: string; icon: React.ReactNode; children: React.ReactNode; iconColor?: string }) => (
		<motion.section
			className='p-6 bg-white border border-gray-100 shadow-sm rounded-xl dark:bg-gray-800/50 dark:border-gray-700'
			variants={animations.item}
			whileHover={{ y: -5, transition: { duration: 0.2 } }}
		>
			<div className='flex items-center gap-4 mb-4'>
				<div className={`p-3 rounded-full bg-gray-100/80 dark:bg-gray-700/50 ${iconColor}`}>{icon}</div>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white'>{title}</h2>
			</div>
			<div className='space-y-3 text-gray-600 dark:text-gray-300'>{children}</div>
		</motion.section>
	);

	// Liste öğesi bileşeni
	const ListItem = ({ children }: { children: React.ReactNode }) => (
		<li className='flex items-start'>
			<span className='inline-block w-1.5 h-1.5 mt-2 mr-2 rounded-full bg-primary-500/70'></span>
			{children}
		</li>
	);

	return (
		<>
			<Helmet>
				<title>Gizlilik ve Kullanım Koşulları</title>
				<meta name='description' content='Portfolio websitemizin gizlilik politikası ve kullanım koşulları hakkında bilgi alın.' />
			</Helmet>

			<div className='py-12 dark:bg-dark-bg'>
				<div className='container max-w-4xl px-4 mx-auto'>
					<motion.div className='space-y-8' initial='hidden' animate='visible' variants={animations.container}>
						<motion.div className='mb-12 text-center' variants={animations.title}>
							<h1 className='mb-3 text-3xl font-bold text-gray-900 dark:text-white'>Gizlilik ve Kullanım Koşulları</h1>
							<p className='inline-block px-4 py-1 text-sm text-gray-600 bg-gray-100 rounded-full dark:text-gray-400 dark:bg-gray-800'>
								Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
							</p>
							<div className='max-w-2xl mx-auto mt-6 text-gray-600 dark:text-gray-300'>
								<p>
									Bu gizlilik politikası ve kullanım koşulları, portfolio websitemizin nasıl çalıştığını ve verilerinizi nasıl
									kullandığımızı açıklar. Sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız.
								</p>
							</div>
						</motion.div>

						<Section title='Hizmetlerimiz' icon={<Shield size={24} />}>
							<p>Portfolio websitemiz, profesyonel hizmetlerimizi ve projelerimizi sergilediğimiz bir platformdur. Sitemiz üzerinden:</p>
							<ul className='mt-3 space-y-2'>
								<ListItem>Proje portföyümüzü inceleyebilir</ListItem>
								<ListItem>Hizmetlerimiz hakkında bilgi alabilir</ListItem>
								<ListItem>İletişim kurabilir</ListItem>
								<ListItem>Ödeme işlemlerini güvenle gerçekleştirebilirsiniz</ListItem>
							</ul>
						</Section>

						<Section title='Ödeme İşlemleri ve Güvenlik' icon={<Lock size={24} />} iconColor='text-green-500'>
							<p>Sitemizde paket satın alımları için banka havalesi/EFT yöntemi kullanılmaktadır. Ödeme işlemleriniz sırasında:</p>
							<ul className='mt-3 space-y-2'>
								<ListItem>Banka hesap bilgileri profil sayfanızda güvenli şekilde sunulur</ListItem>
								<ListItem>Ödeme bilgileriniz şifreli bağlantı üzerinden iletilir</ListItem>
								<ListItem>Havale/EFT açıklamasına email adresinizi ve paket adını yazmanız önemlidir</ListItem>
								<ListItem>Ödeme onayı manuel olarak kontrol edilir ve hızlıca işleme alınır</ListItem>
							</ul>
						</Section>

						<Section title='Veri Toplama ve Kullanımı' icon={<Eye size={24} />} iconColor='text-blue-500'>
							<p>Sitemizi kullanırken aşağıdaki veriler toplanabilir:</p>
							<ul className='mt-3 space-y-2'>
								<ListItem>İletişim bilgileri (ad, e-posta, telefon)</ListItem>
								<ListItem>Kullanım istatistikleri ve tercihler</ListItem>
								<ListItem>Çerezler aracılığıyla toplanan veriler</ListItem>
								<ListItem>Ödeme işlemleri için gerekli bilgiler</ListItem>
							</ul>
							<p className='mt-4'>Toplanan veriler şu amaçlarla kullanılır:</p>
							<ul className='mt-3 space-y-2'>
								<ListItem>Hizmet kalitesini iyileştirmek</ListItem>
								<ListItem>Güvenliği sağlamak</ListItem>
								<ListItem>Yasal yükümlülükleri yerine getirmek</ListItem>
								<ListItem>İletişimi sürdürmek</ListItem>
							</ul>
						</Section>

						<Section title='Çerezler ve İzleme' icon={<Cookie size={24} />} iconColor='text-amber-500'>
							<p>Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerezler şu amaçlarla kullanılır:</p>
							<ul className='mt-3 space-y-2'>
								<ListItem>Oturum yönetimi</ListItem>
								<ListItem>Tercih hatırlama</ListItem>
								<ListItem>Analitik veriler toplama</ListItem>
								<ListItem>Güvenlik önlemleri</ListItem>
							</ul>
						</Section>

						<Section title='İletişim ve Destek' icon={<Mail size={24} />} iconColor='text-purple-500'>
							<p>Gizlilik politikası ve kullanım koşulları hakkında sorularınız için:</p>
							<ul className='mt-3 space-y-2'>
								<ListItem>
									<span className='font-medium'>E-posta:</span> dev.omersefaguc@gmail.com
								</ListItem>
								<ListItem>
									<span className='font-medium'>Telefon:</span> +90 (507) 845 51 83
								</ListItem>
								<ListItem>
									<span className='font-medium'>Adres:</span> İstanbul, Türkiye
								</ListItem>
							</ul>
							<p className='mt-4'>Bize ulaşabilir ve detaylı bilgi alabilirsiniz.</p>
						</Section>

						<Section title='Değişiklikler' icon={<RefreshCw size={24} />} iconColor='text-red-500'>
							<p>
								Bu gizlilik politikası ve kullanım koşulları, önceden bildirim yapılmaksızın güncellenebilir. Güncellemeler sitemizde
								yayınlandığı tarihten itibaren geçerli olur. Düzenli olarak bu sayfayı kontrol etmenizi öneririz.
							</p>
						</Section>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default PrivacyTerms;
