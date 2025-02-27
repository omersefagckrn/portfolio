import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, selectOrdersLoading, selectOrdersError, fetchOrders } from '../../store/features/authSlice';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { AppDispatch } from '../../store/store';
import { Helmet } from 'react-helmet-async';

interface Order {
	id: string;
	user_id: string;
	package_id: string;
	package_name: string;
	total_amount: number;
	payment_status: 'pending' | 'completed' | 'failed';
	order_status: string;
	created_at: string;
	updated_at: string;
}

const ProfileOrders = () => {
	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector(selectOrders) as Order[];
	const isLoading = useSelector(selectOrdersLoading);
	const error = useSelector(selectOrdersError);

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
			case 'Teslim Edildi':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
			case 'pending':
			case 'Beklemede':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
			case 'failed':
			case 'İptal Edildi':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
		}
	};

	if (isLoading) {
		return (
			<>
				<Helmet>
					<title>Siparişlerim</title>
					<meta name='description' content='Tüm siparişlerinizi görüntüleyin ve takip edin.' />
				</Helmet>
				<div className='p-6'>
					<div className='flex items-center justify-center h-64'>
						<div className='w-8 h-8 border-4 rounded-full border-primary-500 border-t-transparent animate-spin'></div>
					</div>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Helmet>
					<title>Siparişlerim</title>
					<meta name='description' content='Tüm siparişlerinizi görüntüleyin ve takip edin.' />
				</Helmet>
				<div className='p-6'>
					<div className='flex flex-col items-center justify-center h-64'>
						<p className='text-lg text-red-500'>{error}</p>
					</div>
				</div>
			</>
		);
	}

	if (orders.length === 0) {
		return (
			<>
				<Helmet>
					<title>Siparişlerim</title>
					<meta name='description' content='Tüm siparişlerinizi görüntüleyin ve takip edin.' />
				</Helmet>
				<div className='p-6'>
					<div className='flex flex-col items-center justify-center h-64'>
						<p className='text-lg text-gray-500 dark:text-gray-400'>Henüz hiç sipariş vermediniz.</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>Siparişlerim</title>
				<meta name='description' content='Tüm siparişlerinizi görüntüleyin ve takip edin.' />
			</Helmet>
			<div className='p-6'>
				<div className='space-y-6'>
					<div className='pb-6 border-b dark:border-dark-border'>
						<h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>Siparişlerim</h1>
						<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Tüm siparişlerinizi buradan görüntüleyebilirsiniz.</p>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
							<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-card dark:text-gray-400'>
								<tr>
									<th scope='col' className='px-6 py-3'>
										Sipariş No
									</th>
									<th scope='col' className='px-6 py-3'>
										Paket
									</th>
									<th scope='col' className='px-6 py-3'>
										Tutar
									</th>
									<th scope='col' className='px-6 py-3'>
										Ödeme Durumu
									</th>
									<th scope='col' className='px-6 py-3'>
										Sipariş Durumu
									</th>
									<th scope='col' className='px-6 py-3'>
										Tarih
									</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr
										key={order.id}
										className='bg-white border-b dark:bg-dark-card dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover'
									>
										<td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>{order.id.slice(0, 8)}</td>
										<td className='px-6 py-4'>{order.package_name}</td>
										<td className='px-6 py-4'>{order.total_amount.toLocaleString('tr-TR')} ₺</td>
										<td className='px-6 py-4'>
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
													order.payment_status
												)}`}
											>
												{order.payment_status === 'completed'
													? 'Ödendi'
													: order.payment_status === 'pending'
													? 'Beklemede'
													: 'Başarısız'}
											</span>
										</td>
										<td className='px-6 py-4'>
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
													order.order_status
												)}`}
											>
												{order.order_status}
											</span>
										</td>
										<td className='px-6 py-4'>
											{format(new Date(order.created_at), 'dd MMMM yyyy HH:mm', { locale: tr })}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileOrders;
