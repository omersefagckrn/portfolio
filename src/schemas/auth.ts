import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta adresi zorunludur'),
	password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre zorunludur'),
	remember: Yup.boolean()
});

export const registerSchema = Yup.object().shape({
	user_type: Yup.string().oneOf(['bireysel', 'kurumsal'], 'Lütfen kayıt türünü seçiniz').required('Kayıt türü zorunludur'),
	// Bireysel kullanıcı alanları
	first_name: Yup.string().when('user_type', {
		is: 'bireysel',
		then: (schema) => schema.min(2, 'Ad en az 2 karakter olmalıdır').required('Ad zorunludur'),
		otherwise: (schema) => schema.nullable()
	}),
	last_name: Yup.string().when('user_type', {
		is: 'bireysel',
		then: (schema) => schema.min(2, 'Soyad en az 2 karakter olmalıdır').required('Soyad zorunludur'),
		otherwise: (schema) => schema.nullable()
	}),
	// Kurumsal kullanıcı alanları
	company_name: Yup.string().when('user_type', {
		is: 'kurumsal',
		then: (schema) => schema.min(2, 'Şirket adı en az 2 karakter olmalıdır').required('Şirket adı zorunludur'),
		otherwise: (schema) => schema.nullable()
	}),
	tax_number: Yup.string().when('user_type', {
		is: 'kurumsal',
		then: (schema) => schema.min(10, 'Vergi numarası 10 karakter olmalıdır').max(10, 'Vergi numarası 10 karakter olmalıdır').required('Vergi numarası zorunludur'),
		otherwise: (schema) => schema.nullable()
	}),
	// Ortak alanlar
	email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta adresi zorunludur'),
	password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre zorunludur'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
		.required('Şifre tekrarı zorunludur'),
	phone: Yup.string().required('Telefon numarası zorunludur'),
	address: Yup.string().required('Adres zorunludur'),
	terms: Yup.boolean().oneOf([true], 'Kullanım koşullarını kabul etmelisiniz').required('Kullanım koşullarını kabul etmelisiniz')
});

// Bireysel kullanıcı şeması
export const individualSchema = Yup.object({
	first_name: Yup.string().required('Ad alanı zorunludur').min(2, 'Ad en az 2 karakter olmalıdır'),
	last_name: Yup.string().required('Soyad alanı zorunludur').min(2, 'Soyad en az 2 karakter olmalıdır'),
	phone: Yup.string().required('Telefon alanı zorunludur').min(10, 'Telefon numarası en az 10 karakter olmalıdır'),
	address: Yup.string().required('Adres alanı zorunludur').min(10, 'Adres en az 10 karakter olmalıdır')
});

// Kurumsal kullanıcı şeması
export const corporateSchema = Yup.object({
	company_name: Yup.string().required('Şirket adı zorunludur').min(2, 'Şirket adı en az 2 karakter olmalıdır'),
	tax_number: Yup.string().required('Vergi numarası zorunludur').min(10, 'Vergi numarası en az 10 karakter olmalıdır'),
	phone: Yup.string().required('Telefon alanı zorunludur').min(10, 'Telefon numarası en az 10 karakter olmalıdır'),
	address: Yup.string().required('Adres alanı zorunludur').min(10, 'Adres en az 10 karakter olmalıdır')
});

export const forgotPasswordSchema = Yup.object().shape({
	email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta adresi zorunludur')
});

export const resetPasswordSchema = Yup.object().shape({
	password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre zorunludur'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
		.required('Şifre tekrarı zorunludur')
});
