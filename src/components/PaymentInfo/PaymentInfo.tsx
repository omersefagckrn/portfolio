import { useState } from 'react';
import { CreditCard, Copy, Check } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { selectPaymentInfo } from '../../store/features/authSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const infoCardClass = 'p-3 border border-gray-100 rounded-lg bg-white/80 dark:bg-gray-800/50 dark:border-gray-700 hover:shadow-md transition-all duration-300';
const labelClass = 'text-xs font-medium text-gray-500 dark:text-gray-400';
const valueClass = 'mt-0.5 text-base font-medium text-gray-900 dark:text-white';
const buttonClass = 'p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors';

const PaymentInfo = () => {
	const paymentInfo = useAppSelector(selectPaymentInfo);
	const [copiedField, setCopiedField] = useState<string | null>(null);

	const copyToClipboard = (text: string, fieldName: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedField(fieldName);
			toast.success(`${fieldName} kopyalandı!`);
			setTimeout(() => setCopiedField(null), 2000);
		});
	};

	// Animasyon varyantları
	const animations = {
		container: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: { staggerChildren: 0.1 }
			}
		},
		item: {
			hidden: { opacity: 0, y: 10 },
			visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
		},
		note: {
			hidden: { opacity: 0, x: -10 },
			visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.4 } }
		}
	};

	// Bilgi kartı bileşeni
	const InfoCard = ({ label, value, fieldName }: { label: string; value: string; fieldName: string }) => (
		<motion.div className={infoCardClass} variants={animations.item}>
			<div className='flex items-center justify-between'>
				<p className={labelClass}>{label}</p>
				<button onClick={() => copyToClipboard(value, fieldName)} className={buttonClass} aria-label={`${fieldName} kopyala`}>
					{copiedField === fieldName ? (
						<Check size={14} className='text-green-500' />
					) : (
						<Copy size={14} className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300' />
					)}
				</button>
			</div>
			<p className={`${valueClass} ${fieldName === 'IBAN' ? 'font-mono tracking-wider text-sm' : ''}`}>{value}</p>
		</motion.div>
	);

	return (
		<div className='p-4'>
			<motion.div className='space-y-4' initial='hidden' animate='visible' variants={animations.container}>
				<motion.div className='pb-3 border-b dark:border-dark-border' variants={animations.item}>
					<h1 className='text-xl font-semibold text-gray-900 dark:text-white'>Ödeme Bilgileri</h1>
					<p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>Paket satın alımlarınızda aşağıdaki banka hesabına ödeme yapabilirsiniz.</p>
				</motion.div>

				<motion.div
					className='overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
					variants={animations.item}
				>
					<div className='p-4'>
						<div className='flex items-start gap-3 mb-3'>
							<div className='p-2 rounded-full bg-primary-500/10 text-primary-500'>
								<CreditCard size={20} />
							</div>
							<div>
								<h2 className='text-base font-medium text-gray-900 dark:text-white'>Havale/EFT ile Ödeme</h2>
								<p className='text-xs text-gray-600 dark:text-gray-300'>
									Aşağıdaki banka hesap bilgilerini kullanarak ödeme yapabilirsiniz.
								</p>
							</div>
						</div>

						<div className='space-y-3'>
							<InfoCard label='Banka Adı' value={paymentInfo.bankName} fieldName='Banka adı' />
							<InfoCard label='Hesap Sahibi' value={paymentInfo.accountHolder} fieldName='Hesap sahibi' />
							<InfoCard label='IBAN' value={paymentInfo.iban} fieldName='IBAN' />
						</div>

						<motion.div
							className='p-3 mt-4 border-l-4 border-yellow-400 rounded-r-lg bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600'
							variants={animations.note}
						>
							<p className='text-xs text-yellow-800 dark:text-yellow-200'>
								<strong>Önemli Not:</strong> Ödeme yaparken açıklama kısmına email adresinizi ve satın aldığınız paketin adını yazmayı
								unutmayınız.
							</p>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default PaymentInfo;
