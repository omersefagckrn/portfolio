import { Github, Linkedin, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
	return (
		<footer className='bg-white dark:bg-dark-card'>
			<div className='px-6 py-12 mx-auto max-w-7xl md:flex md:items-center md:justify-between lg:px-8'>
				<div className='flex justify-center space-x-6 md:order-2'>
					<a
						href='https://github.com/omersefagckrn'
						target='_blank'
						rel='noopener noreferrer'
						className='text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300'
					>
						<span className='sr-only'>GitHub</span>
						<Github className='w-6 h-6' />
					</a>
					<a
						href='https://www.linkedin.com/in/omersefagckrn/'
						target='_blank'
						rel='noopener noreferrer'
						className='text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300'
					>
						<span className='sr-only'>LinkedIn</span>
						<Linkedin className='w-6 h-6' />
					</a>
					<a href='mailto:omergckrnx@gmail.com' className='text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300'>
						<span className='sr-only'>Email</span>
						<Mail className='w-6 h-6' />
					</a>
					<a href='tel:+905078455183' className='text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300'>
						<span className='sr-only'>Telefon</span>
						<Phone className='w-6 h-6' />
					</a>
					<a
						href='https://wa.me/905078455183?text=Merhaba,%20web%20siteniz%20üzerinden%20ulaşıyorum.%20Proje%20detaylarını%20görüşmek%20istiyorum.'
						target='_blank'
						rel='noopener noreferrer'
						className='text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300'
					>
						<span className='sr-only'>WhatsApp</span>
						<MessageCircle className='w-6 h-6' />
					</a>
				</div>
				<div className='mt-8 md:order-1 md:mt-0'>
					<p className='text-xs leading-5 text-center text-gray-500 dark:text-gray-400'>
						&copy; {new Date().getFullYear()} Ömer Sefa Güçkıran. Tüm hakları saklıdır.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
