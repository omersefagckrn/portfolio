export const config = {
	supabase: {
		url: import.meta.env.VITE_SUPABASE_URL,
		anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
	},
	theme: {
		light: 'light',
		dark: 'dark'
	},
	userTypes: {
		individual: 'bireysel',
		business: 'kurumsal'
	},
	orderStatus: {
		pending: 'pending',
		completed: 'completed',
		failed: 'failed'
	},
	paymentStatus: {
		pending: 'pending',
		completed: 'completed',
		failed: 'failed'
	}
};
