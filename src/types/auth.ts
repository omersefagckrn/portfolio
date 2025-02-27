import type { User } from '@supabase/supabase-js';

export type UserType = 'bireysel' | 'kurumsal';

export interface Order {
	id: number;
	user_email: string;
	package_id: number;
	package_name?: string;
	amount: number;
	status: string;
	payment_status?: 'pending' | 'completed' | 'failed';
	created_at: string;
	updated_at: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	orders: Order[];
	ordersLoading: boolean;
	ordersError: string | null;
}

export interface RegisterUserData {
	email: string;
	password: string;
	user_type: UserType;
	first_name?: string;
	last_name?: string;
	company_name?: string;
	tax_number?: string;
	phone: string;
	address: string;
}

export interface UpdateProfileData {
	first_name?: string;
	last_name?: string;
	company_name?: string;
	tax_number?: string;
	phone: string;
	address: string;
}
