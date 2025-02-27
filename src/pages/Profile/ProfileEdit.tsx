import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsLoading, updateProfile } from '../../store/features/authSlice';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-hot-toast';
import { AppDispatch } from '../../store/store';
import { corporateSchema, individualSchema } from '../../schemas/auth';
import { Helmet } from 'react-helmet-async';

interface FormValues {
	first_name?: string;
	last_name?: string;
	company_name?: string;
	tax_number?: string;
	phone: string;
	address: string;
}

const ProfileEdit = () => {
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector(selectUser);
	const isLoading = useSelector(selectIsLoading);
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
					{/* Başlık */}
					<div className='pb-6 border-b dark:border-dark-border'>
						<h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>
							{isIndividual ? 'Bireysel Profil Düzenle' : 'Kurumsal Profil Düzenle'}
						</h1>
						<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Profil bilgilerinizi buradan güncelleyebilirsiniz.</p>
					</div>

					{/* Form */}
					<Formik initialValues={initialValues} validationSchema={isIndividual ? individualSchema : corporateSchema} onSubmit={handleSubmit}>
						{({ errors, touched, isSubmitting }) => (
							<Form className='space-y-6'>
								<div className='grid gap-6 md:grid-cols-2'>
									{isIndividual ? (
										<>
											{/* Bireysel Form Alanları */}
											<div className='space-y-2'>
												<label
													htmlFor='first_name'
													className='text-sm font-medium text-gray-900 dark:text-white'
												>
													Ad
												</label>
												<Field
													name='first_name'
													type='text'
													className='w-full px-3 py-2 text-gray-900 border rounded-lg dark:text-white bg-gray-50 dark:bg-dark-border dark:border-dark-border focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent'
												/>
												{errors.first_name && touched.first_name && (
													<p className='text-sm text-red-500'>{String(errors.first_name)}</p>
												)}
											</div>

											<div className='space-y-2'>
												<label
													htmlFor='last_name'
													className='text-sm font-medium text-gray-900 dark:text-white'
												>
													Soyad
												</label>
												<Field
													name='last_name'
													type='text'
													className='w-full px-3 py-2 text-gray-900 border rounded-lg dark:text-white bg-gray-50 dark:bg-dark-border dark:border-dark-border focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent'
												/>
												{errors.last_name && touched.last_name && (
													<p className='text-sm text-red-500'>{String(errors.last_name)}</p>
												)}
											</div>
										</>
									) : (
										<>
											{/* Kurumsal Form Alanları */}
											<div className='space-y-2'>
												<label
													htmlFor='company_name'
													className='text-sm font-medium text-gray-900 dark:text-white'
												>
													Şirket Adı
												</label>
												<Field
													name='company_name'
													type='text'
													className='w-full px-3 py-2 text-gray-900 border rounded-lg dark:text-white bg-gray-50 dark:bg-dark-border dark:border-dark-border focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent'
												/>
												{errors.company_name && touched.company_name && (
													<p className='text-sm text-red-500'>{String(errors.company_name)}</p>
												)}
											</div>

											<div className='space-y-2'>
												<label
													htmlFor='tax_number'
													className='text-sm font-medium text-gray-900 dark:text-white'
												>
													Vergi Numarası
												</label>
												<Field
													name='tax_number'
													type='text'
													className='w-full px-3 py-2 text-gray-900 border rounded-lg dark:text-white bg-gray-50 dark:bg-dark-border dark:border-dark-border focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent'
												/>
												{errors.tax_number && touched.tax_number && (
													<p className='text-sm text-red-500'>{String(errors.tax_number)}</p>
												)}
											</div>
										</>
									)}

									{/* Ortak Form Alanları */}
									<div className='space-y-2'>
										<label htmlFor='phone' className='text-sm font-medium text-gray-900 dark:text-white'>
											Telefon
										</label>
										<Field
											name='phone'
											type='tel'
											className='w-full px-3 py-2 text-gray-900 border rounded-lg dark:text-white bg-gray-50 dark:bg-dark-border dark:border-dark-border focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent'
										/>
										{errors.phone && touched.phone && <p className='text-sm text-red-500'>{String(errors.phone)}</p>}
									</div>

									<div className='space-y-2 md:col-span-2'>
										<label htmlFor='address' className='text-sm font-medium text-gray-900 dark:text-white'>
											Adres
										</label>
										<Field
											name='address'
											as='textarea'
											rows={3}
											className='w-full px-3 py-2 text-gray-900 border rounded-lg dark:text-white bg-gray-50 dark:bg-dark-border dark:border-dark-border focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent'
										/>
										{errors.address && touched.address && (
											<p className='text-sm text-red-500'>{String(errors.address)}</p>
										)}
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
