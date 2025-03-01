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

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outline';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string;
	error?: string;
	containerClassName?: string;
	size?: InputSize;
	variant?: InputVariant;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	isFullWidth?: boolean;
	preventAutocomplete?: boolean;
	isTextarea?: boolean;
	rows?: number;
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

export interface FloatingMenuProps {
	items: FloatingMenuItem[];
}

export interface FloatingMenuItem {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}
