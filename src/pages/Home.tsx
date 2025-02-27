import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export const Home = () => {
	return (
		<>
			<Helmet>
				<title>Web & Mobil Uygulama Geliştirici</title>
				<meta name='description' content="Ömer Sefa Güçkıran'ın profesyonel web ve mobil uygulama geliştirme hizmetleri. Modern teknolojiler ile özel çözümler." />
				<meta name='keywords' content='web geliştirme, mobil uygulama, react, react native, javascript, typescript, ömer sefa güçkıran' />
				<meta property='og:title' content='Ömer Sefa Güçkıran | Web & Mobil Uygulama Geliştirici' />
				<meta
					property='og:description'
					content="Ömer Sefa Güçkıran'ın profesyonel web ve mobil uygulama geliştirme hizmetleri. Modern teknolojiler ile özel çözümler."
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content={window.location.href} />
				<link rel='canonical' href={window.location.href} />
			</Helmet>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='container mx-auto my-4'>
				<h1 className='mb-6 text-3xl font-bold text-gray-900 dark:text-white'>Hoş Geldiniz</h1>
				<p className='text-gray-600 dark:text-gray-400'>Bu sizin kişisel kontrol paneliniz. Buradan içeriklerinizi ve ayarlarınızı yönetebilirsiniz.</p>
			</motion.div>
		</>
	);
};
