export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isFullWidth?: boolean;
	isLoading?: boolean;
	to?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	containerClassName?: string;
}

export interface LayoutProps {
	children: React.ReactNode;
}

export interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
	isAuthenticated: boolean;
	onLogout: () => void;
}
