import { selectUser } from '../../store/features/authSlice';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Building2, Mail, MapPin, Phone, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../store/hooks';

const Profile = () => {
	const user = useAppSelector(selectUser);
	const userData = user?.user_metadata;
	const isIndividual = userData?.user_type === 'bireysel';

	return (
		<>
			<Helmet>
				<title>{isIndividual ? 'Bireysel Profil' : 'Kurumsal Profil'}</title>
				<meta name='description' content='Profil bilgilerinizi görüntüleyin ve yönetin.' />
			</Helmet>
			<div className='p-6'>
				<div className='space-y-6'>
					<div className='pb-6 border-b dark:border-dark-border'>
						<h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>{isIndividual ? 'Bireysel Profil' : 'Kurumsal Profil'}</h1>
						<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Profil bilgilerinizi buradan görüntüleyebilirsiniz.</p>
					</div>

					<div className='grid gap-6 md:grid-cols-2'>
						<div className='flex items-center gap-3'>
							<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10'>
								<Mail className='w-5 h-5 text-primary-500' />
							</div>
							<div>
								<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Email</p>
								<p className='text-sm font-medium text-gray-900 dark:text-white'>{user?.email}</p>
							</div>
						</div>

						<div className='flex items-center gap-3'>
							<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10'>
								<Phone className='w-5 h-5 text-primary-500' />
							</div>
							<div>
								<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Telefon</p>
								<p className='text-sm font-medium text-gray-900 dark:text-white'>{userData?.phone || '-'}</p>
							</div>
						</div>

						{isIndividual ? (
							<>
								<div className='flex items-center gap-3'>
									<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10'>
										<User className='w-5 h-5 text-primary-500' />
									</div>
									<div>
										<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Ad Soyad</p>
										<p className='text-sm font-medium text-gray-900 dark:text-white'>
											{userData?.first_name} {userData?.last_name}
										</p>
									</div>
								</div>
							</>
						) : (
							<>
								<div className='flex items-center gap-3'>
									<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10'>
										<Building2 className='w-5 h-5 text-primary-500' />
									</div>
									<div>
										<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Şirket Adı</p>
										<p className='text-sm font-medium text-gray-900 dark:text-white'>{userData?.company_name}</p>
									</div>
								</div>
								<div className='flex items-center gap-3'>
									<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10'>
										<Building2 className='w-5 h-5 text-primary-500' />
									</div>
									<div>
										<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Vergi No</p>
										<p className='text-sm font-medium text-gray-900 dark:text-white'>{userData?.tax_number}</p>
									</div>
								</div>
							</>
						)}

						<div className='flex items-center gap-3 md:col-span-2'>
							<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10'>
								<MapPin className='w-5 h-5 text-primary-500' />
							</div>
							<div>
								<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Adres</p>
								<p className='text-sm font-medium text-gray-900 dark:text-white'>{userData?.address || '-'}</p>
							</div>
						</div>
					</div>

					<div className='pt-6 mt-6 border-t dark:border-dark-border'>
						<div className='grid gap-4 md:grid-cols-2'>
							<div>
								<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Kayıt Tarihi</p>
								<p className='text-sm font-medium text-gray-900 dark:text-white'>
									{user?.created_at ? format(new Date(user.created_at), 'dd MMMM yyyy HH:mm', { locale: tr }) : '-'}
								</p>
							</div>
							<div>
								<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Son Güncelleme</p>
								<p className='text-sm font-medium text-gray-900 dark:text-white'>
									{user?.updated_at ? format(new Date(user.updated_at), 'dd MMMM yyyy HH:mm', { locale: tr }) : '-'}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
