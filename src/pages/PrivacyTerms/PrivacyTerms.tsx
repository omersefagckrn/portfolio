const PrivacyTerms = () => {
	return (
		<div className='container max-w-4xl py-8 mx-auto'>
			<div className='space-y-12'>
				<section>
					<h1 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white'>Gizlilik ve Kullanım Koşulları</h1>
					<p className='mb-4 text-gray-600 underline dark:text-gray-400'>Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
					<div className='text-black max-w-none dark:text-white/70'>
						<p>
							Bu gizlilik politikası ve kullanım koşulları, portfolio websitemizin nasıl çalıştığını ve verilerinizi nasıl kullandığımızı
							açıklar. Sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız.
						</p>
					</div>
				</section>

				<section>
					<h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>1. Hizmetlerimiz</h2>
					<div className='text-black max-w-none dark:text-white/70'>
						<p>Portfolio websitemiz, profesyonel hizmetlerimizi ve projelerimizi sergilediğimiz bir platformdur. Sitemiz üzerinden:</p>
						<ul>
							<li>Proje portföyümüzü inceleyebilir</li>
							<li>Hizmetlerimiz hakkında bilgi alabilir</li>
							<li>İletişim kurabilir</li>
							<li>Ödeme işlemlerini güvenle gerçekleştirebilirsiniz</li>
						</ul>
					</div>
				</section>

				<section>
					<h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>2. Ödeme İşlemleri ve Güvenlik</h2>
					<div className='text-black max-w-none dark:text-white/70'>
						<p>
							Sitemizde kullanılan sanal POS sistemi, güvenli ödeme işlemleri için endüstri standardı SSL şifreleme kullanmaktadır. Ödeme
							işlemleriniz sırasında:
						</p>
						<ul>
							<li>Tüm işlemler SSL sertifikası ile şifrelenir</li>
							<li>Kredi kartı bilgileriniz sistemimizde saklanmaz</li>
							<li>3D Secure ile güvenli ödeme imkanı sunulur</li>
							<li>PCI DSS standartlarına uygun altyapı kullanılır</li>
						</ul>
					</div>
				</section>

				<section>
					<h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>3. Veri Toplama ve Kullanımı</h2>
					<div className='text-black max-w-none dark:text-white/70'>
						<p>Sitemizi kullanırken aşağıdaki veriler toplanabilir:</p>
						<ul>
							<li>İletişim bilgileri (ad, e-posta, telefon)</li>
							<li>Kullanım istatistikleri ve tercihler</li>
							<li>Çerezler aracılığıyla toplanan veriler</li>
							<li>Ödeme işlemleri için gerekli bilgiler</li>
						</ul>
						<p>Toplanan veriler şu amaçlarla kullanılır:</p>
						<ul>
							<li>Hizmet kalitesini iyileştirmek</li>
							<li>Güvenliği sağlamak</li>
							<li>Yasal yükümlülükleri yerine getirmek</li>
							<li>İletişimi sürdürmek</li>
						</ul>
					</div>
				</section>

				<section>
					<h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>4. Çerezler ve İzleme</h2>
					<div className='text-black max-w-none dark:text-white/70'>
						<p>Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerezler şu amaçlarla kullanılır:</p>
						<ul>
							<li>Oturum yönetimi</li>
							<li>Tercih hatırlama</li>
							<li>Analitik veriler toplama</li>
							<li>Güvenlik önlemleri</li>
						</ul>
					</div>
				</section>

				<section>
					<h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>5. İletişim ve Destek</h2>
					<div className='text-black max-w-none dark:text-white/70'>
						<p>Gizlilik politikası ve kullanım koşulları hakkında sorularınız için:</p>
						<ul>
							<li>E-posta: dev.omersefaguc@gmail.com</li>
							<li>Telefon: +90 (507) 845 51 83</li>
							<li>Adres: İstanbul, Türkiye</li>
						</ul>
						<p>Bize ulaşabilir ve detaylı bilgi alabilirsiniz.</p>
					</div>
				</section>

				<section>
					<h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>6. Değişiklikler</h2>
					<div className='text-black max-w-none dark:text-white/70'>
						<p>
							Bu gizlilik politikası ve kullanım koşulları, önceden bildirim yapılmaksızın güncellenebilir. Güncellemeler sitemizde yayınlandığı
							tarihten itibaren geçerli olur. Düzenli olarak bu sayfayı kontrol etmenizi öneririz.
						</p>
					</div>
				</section>
			</div>
		</div>
	);
};

export default PrivacyTerms;
