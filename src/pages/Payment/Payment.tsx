import { Helmet } from 'react-helmet-async';
import PaymentInfo from '../../components/PaymentInfo/PaymentInfo';

const Payment = () => {
	return (
		<>
			<Helmet>
				<title>Ödeme Bilgileri | Havale/EFT</title>
				<meta name='description' content='Paket satın alımlarınız için banka hesap bilgileri ve ödeme detayları' />
			</Helmet>

			<PaymentInfo />
		</>
	);
};

export default Payment;
