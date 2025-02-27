import { Navbar } from '../Navbar/Navbar';
import { LayoutProps } from '../../types';

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className='min-h-screen bg-gray-50 dark:bg-dark-bg'>
			<Navbar />
			<main className='px-4 pt-16'>{children}</main>
		</div>
	);
};
