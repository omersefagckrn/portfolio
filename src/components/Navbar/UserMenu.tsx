import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, Building2, UserCircle2, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/features/authSlice';

interface UserMenuProps {
	onLogout: () => void;
}

export const UserMenu = ({ onLogout }: UserMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [dropdownWidth, setDropdownWidth] = useState(256);
	const user = useAppSelector(selectUser);
	const isBusinessAccount = user?.user_metadata?.user_type === 'kurumsal';

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		if (buttonRef.current) {
			setDropdownWidth(Math.max(buttonRef.current.offsetWidth, 256));
		}
	}, [isOpen]);

	const calculateDropdownPosition = () => {
		if (!buttonRef.current) return { right: 0 };
		const buttonWidth = buttonRef.current.offsetWidth;
		const dropdownOffset = (dropdownWidth - buttonWidth) / 2;
		return { right: `${dropdownOffset}px` };
	};

	return (
		<div className='relative' ref={menuRef}>
			{/* User Button */}
			<button
				ref={buttonRef}
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-3 px-4 py-2 text-sm transition-colors rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-dark-border/50 dark:hover:bg-dark-border'
			>
				<div className='flex items-center gap-2'>
					{isBusinessAccount ? <Building2 className='w-4 h-4 text-primary-500' /> : <UserCircle2 className='w-4 h-4 text-primary-500' />}
					<span className='font-medium text-gray-700 dark:text-gray-200'>{user?.email}</span>
				</div>
			</button>

			{/* Dropdown Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.2 }}
						style={{
							position: 'absolute',
							width: dropdownWidth,
							top: '100%',
							marginTop: '0.5rem',
							...calculateDropdownPosition()
						}}
						className='z-50 origin-top'
					>
						<div className='overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-dark-card dark:ring-dark-border'>
							<div className='p-2 space-y-1'>
								<Link
									to='/profile'
									onClick={() => setIsOpen(false)}
									className='flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700 transition-colors rounded-md dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
								>
									<User className='w-4 h-4' />
									Profilim
								</Link>
								<Link
									to='/profile/edit'
									onClick={() => setIsOpen(false)}
									className='flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700 transition-colors rounded-md dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
								>
									<Settings className='w-4 h-4' />
									Profilimi Düzenle
								</Link>
								<Link
									to='/profile/orders'
									onClick={() => setIsOpen(false)}
									className='flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700 transition-colors rounded-md dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border'
								>
									<ShoppingBag className='w-4 h-4' />
									Siparişlerim
								</Link>
								<div className='h-px my-1 bg-gray-200 dark:bg-dark-border' />
								<button
									onClick={() => {
										onLogout();
										setIsOpen(false);
									}}
									className='flex items-center w-full gap-2 px-4 py-2 text-sm text-red-500 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-500/10'
								>
									<LogOut className='w-4 h-4' />
									Çıkış Yap
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
