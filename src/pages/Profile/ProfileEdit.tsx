import { selectUser, selectIsLoading, updateProfile } from '../../store/features/authSlice';
import { Formik, Form } from 'formik';
import { toast } from 'react-hot-toast';
import { corporateSchema, individualSchema } from '../../schemas/auth';
import { Helmet } from 'react-helmet-async';
import { Input } from '../../components/Input/Input';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { User, Building2, Phone, MapPin } from 'lucide-react';

interface FormValues {
	first_name?: string;
	last_name?: string;
	company_name?: string;
	tax_number?: string;
	phone: string;
	address: string;
}

const ProfileEdit = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const isLoading = useAppSelector(selectIsLoading);
	const userData = user?.user_metadata;
	const isIndividual = userData?.user_type === 'bireysel';

	const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		try {
			const resultAction = await dispatch(updateProfile(values));
			if (updateProfile.fulfilled.match(resultAction)) {
				toast.success('Profil bilgileriniz başarıyla güncellendi');
			} else if (updateProfile.rejected.match(resultAction)) {
				toast.error((resultAction.payload as string) || 'Bir hata oluştu');
			}
		} finally {
			setSubmitting(false);
		}
	};

	const initialValues: FormValues = {
		first_name: userData?.first_name || '',
		last_name: userData?.last_name || '',
		company_name: userData?.company_name || '',
		tax_number: userData?.tax_number || '',
		phone: userData?.phone || '',
		address: userData?.address || ''
	};

	return (
		<>
			<Helmet>
				<title>{isIndividual ? 'Bireysel Profil Düzenle' : 'Kurumsal Profil Düzenle'}</title>
				<meta name='description' content='Profil bilgilerinizi güncelleyin ve düzenleyin.' />
			</Helmet>
			<div className='p-6'>
				<div className='space-y-6'>
					<div className='pb-6 border-b dark:border-dark-border'>
						<h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>
							{isIndividual ? 'Bireysel Profil Düzenle' : 'Kurumsal Profil Düzenle'}
						</h1>
						<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Profil bilgilerinizi buradan güncelleyebilirsiniz.</p>
					</div>

					<Formik initialValues={initialValues} validationSchema={isIndividual ? individualSchema : corporateSchema} onSubmit={handleSubmit}>
						{({ errors, touched, isSubmitting, getFieldProps }) => (
							<Form className='space-y-6'>
								<div className='grid gap-6 md:grid-cols-2'>
									{isIndividual ? (
										<>
											<Input
												id='first_name'
												type='text'
												label='Ad'
												leftIcon={<User className='w-4 h-4 text-gray-500' />}
												preventAutocomplete
												{...getFieldProps('first_name')}
												error={touched.first_name ? errors.first_name : undefined}
											/>

											<Input
												id='last_name'
												type='text'
												label='Soyad'
												leftIcon={<User className='w-4 h-4 text-gray-500' />}
												preventAutocomplete
												{...getFieldProps('last_name')}
												error={touched.last_name ? errors.last_name : undefined}
											/>
										</>
									) : (
										<>
											<Input
												id='company_name'
												type='text'
												label='Şirket Adı'
												leftIcon={<Building2 className='w-4 h-4 text-gray-500' />}
												preventAutocomplete
												{...getFieldProps('company_name')}
												error={touched.company_name ? errors.company_name : undefined}
											/>

											<Input
												id='tax_number'
												type='text'
												label='Vergi Numarası'
												leftIcon={<Building2 className='w-4 h-4 text-gray-500' />}
												preventAutocomplete
												{...getFieldProps('tax_number')}
												error={touched.tax_number ? errors.tax_number : undefined}
											/>
										</>
									)}

									<Input
										id='phone'
										type='tel'
										label='Telefon'
										leftIcon={<Phone className='w-4 h-4 text-gray-500' />}
										preventAutocomplete
										{...getFieldProps('phone')}
										error={touched.phone ? errors.phone : undefined}
									/>

									<div className='md:col-span-2'>
										<Input
											id='address'
											label='Adres'
											leftIcon={<MapPin className='w-4 h-4 text-gray-500' />}
											preventAutocomplete
											isTextarea
											rows={3}
											{...getFieldProps('address')}
											error={touched.address ? errors.address : undefined}
										/>
									</div>
								</div>

								<div className='flex justify-end'>
									<button
										type='submit'
										disabled={isSubmitting || isLoading}
										className='px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
									>
										{isSubmitting || isLoading ? 'Kaydediliyor...' : 'Kaydet'}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default ProfileEdit;
