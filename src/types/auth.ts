import type { User } from '@supabase/supabase-js';

export type UserType = 'bireysel' | 'kurumsal';

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
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
