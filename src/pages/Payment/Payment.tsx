import { Helmet } from 'react-helmet-async';
import PaymentInfo from '../../components/PaymentInfo/PaymentInfo';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const Payment = () => {
	return (
		<>
			<Helmet>
				<title>Ödeme Bilgileri | Havale/EFT</title>
				<meta name='description' content='Paket satın alımlarınız için banka hesap bilgileri ve ödeme detayları' />
			</Helmet>

			<div className='p-4'>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='mb-6 p-4 sm:p-5 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 shadow-sm'
				>
					<div className='flex items-start gap-3'>
						<div className='flex-shrink-0 p-2 rounded-full bg-amber-100 dark:bg-amber-800/30 text-amber-600 dark:text-amber-400'>
							<AlertTriangle size={20} />
						</div>
						<div className='flex-grow'>
							<h3 className='text-base font-medium text-amber-800 dark:text-amber-400'>Ödeme Bilgilendirmesi</h3>
							<p className='mt-1 text-sm text-amber-700 dark:text-amber-300/90'>
								Sitemiz üzerinden doğrudan ödeme almıyoruz. Paketlerimizden birine tıklayarak buraya gelmiş olabilirsiniz. Tüm ödemeler
								aşağıda belirtilen banka hesabı üzerinden yapılmaktadır.
							</p>
						</div>
					</div>
				</motion.div>
			</div>

			<PaymentInfo />
		</>
	);
};

export default Payment;
