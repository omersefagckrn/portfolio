interface FAQItem {
	title: string;
	items: {
		question: string;
		answer: string[];
	}[];
}

export const faqs: FAQItem[] = [
	{
		title: 'Teknoloji ve Geliştirme',
		items: [
			{
				question: 'Hangi modern teknolojiler ve araçlar kullanılıyor?',
				answer: [
					'Frontend Teknolojileri:',
					'• Next.js ve TypeScript ile modern web uygulamaları',
					'• TailwindCSS ile responsive tasarımlar',
					'• Redux ile karmaşık state yönetimi',
					'Backend Teknolojileri:',
					'• Express ile güçlü API altyapıları',
					'• MongoDB ve MySQL veritabanı çözümleri',
					'• Supabase ile gerçek zamanlı uygulamalar',
					'Mobil Geliştirme:',
					'• React Native ve Expo ile cross-platform uygulamalar',
					'DevOps ve Tasarım:',
					'• Docker ile mikroservis mimarisi',
					'• Figma ile profesyonel UI/UX tasarımlar',
					'• Modern CI/CD süreçleri'
				]
			},
			{
				question: 'Proje geliştirme süreci nasıl işliyor?',
				answer: [
					'Analiz ve Planlama (1-2 hafta):',
					'• İhtiyaç analizi ve kapsam belirleme',
					'• Teknoloji stack seçimi',
					'• Detaylı proje planlaması',
					'UI/UX Tasarım (1-2 hafta):',
					'• Figma ile arayüz tasarımı',
					'• Kullanıcı deneyimi optimizasyonu',
					'• Tasarım sistemleri oluşturma',
					'Geliştirme (4-8 hafta):',
					'• Agile metodoloji ile iteratif geliştirme',
					'• Haftalık demo ve geri bildirim',
					'• Sürekli entegrasyon ve test',
					'Test ve Deployment (1-2 hafta):',
					'• Kapsamlı testing ve hata ayıklama',
					'• Performans optimizasyonu',
					'• Canlı ortama kontrollü geçiş'
				]
			}
		]
	},
	{
		title: 'Destek ve Optimizasyon',
		items: [
			{
				question: 'Proje sonrası destek ve bakım hizmetleri neler?',
				answer: [
					'Teknik Destek:',
					'• 12 ay ücretsiz bug-fix garantisi',
					'• 7/24 acil durum müdahale sistemi',
					'• Öncelikli destek kanalı',
					'Proaktif Bakım:',
					'• Aylık performans raporları',
					'• Düzenli SEO analizi',
					'• Sistem sağlığı kontrolleri',
					'Güvenlik ve Yedekleme:',
					'• Düzenli güvenlik güncellemeleri',
					'• Otomatik backup sistemi',
					'• Güvenlik açığı taramaları'
				]
			},
			{
				question: 'Performans ve SEO optimizasyonu nasıl sağlanıyor?',
				answer: [
					'Teknik SEO:',
					'• Next.js ile SSR/SSG implementasyonu',
					'• Otomatik kod bölümleme',
					'• Schema markup ve meta etiketleri',
					'Performans Optimizasyonu:',
					'• Lighthouse skorları 90+ hedefi',
					'• Core Web Vitals optimizasyonu',
					'• Image optimization ve lazy loading',
					'Mobil Optimizasyon:',
					'• Mobile-first responsive tasarım',
					'• Touch hedeflerinin optimizasyonu',
					'• Mobil performans metrikleri',
					'Altyapı İyileştirmeleri:',
					'• CDN entegrasyonu',
					'• Caching stratejileri',
					'• Load balancing çözümleri'
				]
			}
		]
	}
];
