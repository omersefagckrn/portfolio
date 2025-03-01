import { Home, Smartphone, Globe, User, Settings, CreditCard } from 'lucide-react';

export const mainNavLinks = [
	{
		name: 'Ana Sayfa',
		to: '/',
		icon: Home
	},
	{
		name: 'Mobil Uygulama',
		to: '/mobile-app',
		icon: Smartphone
	},
	{
		name: 'Web Uygulama',
		to: '/web-app',
		icon: Globe
	}
];

export const profileNavigation = [
	{
		name: 'Profilim',
		to: '/profile',
		icon: User
	},
	{
		name: 'Profilimi Düzenle',
		to: '/profile/edit',
		icon: Settings
	},
	{
		name: 'Ödeme Bilgileri',
		to: '/profile/payment',
		icon: CreditCard
	}
];
