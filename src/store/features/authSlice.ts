import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';
import type { RootState } from '../store';
import type { User } from '@supabase/supabase-js';
import type { RegisterUserData, UpdateProfileData, AuthState } from '../../types';
import { PostgrestError } from '@supabase/supabase-js';

export const paymentInfo = {
	bankName: 'Kuveyt Türk',
	accountHolder: 'Ömer Sefa Güçkıran',
	iban: 'TR490020500009668782200001'
};

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null
};

const translateAuthError = (error: string): string => {
	const errorMap: Record<string, string> = {
		'User already registered': 'Bu email adresi zaten kullanımda',
		'Invalid login credentials': 'Geçersiz email veya şifre',
		'Email not confirmed': 'Email adresiniz henüz onaylanmamış',
		'Invalid email': 'Geçerli bir email adresi giriniz',
		'Password should be at least 6 characters': 'Şifre en az 6 karakter olmalıdır',
		'Database error': 'Veritabanı hatası oluştu',
		'Invalid user role': 'Geçersiz kullanıcı rolü',
		'duplicate key value violates unique constraint': 'Bu email adresi zaten kullanımda',
		'new row violates row-level security': 'Yetkilendirme hatası',
		'Too many requests': 'Çok fazla deneme yapıldı. Lütfen birkaç dakika bekleyip tekrar deneyin.',
		'Rate limit exceeded': 'Çok fazla deneme yapıldı. Lütfen birkaç dakika bekleyip tekrar deneyin.',
		'Invalid verification code': 'Geçersiz doğrulama kodu',
		'Email link is invalid or has expired': 'Email doğrulama linki geçersiz veya süresi dolmuş',
		'Token has expired or is invalid': 'Oturum süresi dolmuş, lütfen tekrar giriş yapın',
		'User not found': 'Kullanıcı bulunamadı',
		'Auth session missing': 'Oturum bulunamadı, lütfen tekrar giriş yapın'
	};

	const lowerError = error.toLowerCase();
	return Object.entries(errorMap).find(([key]) => lowerError.includes(key.toLowerCase()))?.[1] || 'Beklenmeyen bir hata oluştu';
};

export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
	try {
		const {
			data: { session },
			error: sessionError
		} = await supabase.auth.getSession();

		if (sessionError) {
			return rejectWithValue(translateAuthError(sessionError.message));
		}

		if (!session?.user) {
			return null;
		}

		return session.user;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(translateAuthError(error.message));
		}
		return rejectWithValue('Oturum kontrolü sırasında bir hata oluştu');
	}
});

export const loginUser = createAsyncThunk('auth/login', async ({ email, password, remember }: { email: string; password: string; remember?: boolean }, { rejectWithValue }) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			// Supabase'den gelen hatayı çevir
			const translatedError = translateAuthError(error.message);
			return rejectWithValue(translatedError);
		}

		if (!data?.user) {
			return rejectWithValue('Giriş yapılamadı, lütfen tekrar deneyin');
		}

		// Beni hatırla seçeneği işaretlenmişse session süresini 30 güne çıkar
		if (remember) {
			await supabase.auth.updateUser({
				data: { session_duration: 30 * 24 * 60 * 60 }
			});
		}

		return data.user as User;
	} catch (error) {
		if (error instanceof Error) {
			// Beklenmeyen hataları da çevir
			const translatedError = translateAuthError(error.message);
			return rejectWithValue(translatedError);
		}
		return rejectWithValue('Giriş sırasında beklenmeyen bir hata oluştu');
	}
});

export const registerUser = createAsyncThunk('auth/register', async (userData: RegisterUserData, { rejectWithValue }) => {
	try {
		// Önce email'in kayıtlı olup olmadığını kontrol edelim
		const { data: existingUser } = await supabase.from('users').select('id').eq('email', userData.email).single();

		if (existingUser) {
			return rejectWithValue('Bu email adresi zaten kullanımda');
		}

		// Email kayıtlı değilse kayıt işlemine devam edelim
		const { data: authData, error: authError } = await supabase.auth.signUp({
			email: userData.email,
			password: userData.password,
			options: {
				emailRedirectTo: `${window.location.origin}/email-confirmation`,
				data: {
					user_type: userData.user_type,
					phone: userData.phone || null,
					address: userData.address || null,
					...(userData.user_type === 'bireysel'
						? {
								first_name: userData.first_name,
								last_name: userData.last_name
						  }
						: {
								company_name: userData.company_name,
								tax_number: userData.tax_number
						  })
				}
			}
		});

		if (authError) {
			if (authError.message.toLowerCase().includes('user already registered')) {
				return rejectWithValue('Bu email adresi zaten kullanımda');
			}
			return rejectWithValue(translateAuthError(authError.message));
		}

		if (!authData.user) {
			return rejectWithValue('Kayıt işlemi sırasında bir hata oluştu');
		}

		return { email: userData.email };
	} catch (error) {
		console.error('Registration Error:', error);
		if (error instanceof Error) {
			return rejectWithValue(translateAuthError(error.message));
		}
		return rejectWithValue('Kayıt işlemi sırasında beklenmeyen bir hata oluştu');
	}
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
	try {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return rejectWithValue(translateAuthError(error.message));
		}
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(translateAuthError(error.message));
		}
		return rejectWithValue('Çıkış yapılırken bir hata oluştu');
	}
});

export const updateUser = createAsyncThunk('auth/update', async (metadata: any, { rejectWithValue }) => {
	try {
		const { data, error } = await supabase.auth.updateUser({
			data: metadata
		});

		if (error) {
			return rejectWithValue(translateAuthError(error.message));
		}

		return data.user;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(translateAuthError(error.message));
		}
		return rejectWithValue('Profil güncellenirken bir hata oluştu');
	}
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (data: UpdateProfileData, { getState, rejectWithValue }) => {
	try {
		const state = getState() as RootState;
		const currentUser = state.auth.user;

		if (!currentUser) {
			throw new Error('Kullanıcı oturumu bulunamadı');
		}

		const { error } = await supabase.auth.updateUser({
			data: {
				...currentUser.user_metadata,
				...data
			}
		});

		if (error) throw error;

		return {
			...currentUser,
			user_metadata: {
				...currentUser.user_metadata,
				...data
			}
		};
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(translateAuthError(error.message));
		}
		return rejectWithValue('Profil güncellenirken bir hata oluştu');
	}
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email: string, { rejectWithValue }) => {
	try {
		// Rate limiting kontrolü
		const lastAttempt = localStorage.getItem('lastPasswordResetAttempt');
		const now = Date.now();

		if (lastAttempt) {
			const timeSinceLastAttempt = now - parseInt(lastAttempt);
			if (timeSinceLastAttempt < 60000) {
				const remainingSeconds = Math.ceil((60000 - timeSinceLastAttempt) / 1000);
				return rejectWithValue(`Lütfen ${remainingSeconds} saniye bekleyip tekrar deneyin.`);
			}
		}

		// Önce email'in kayıtlı olup olmadığını kontrol edelim
		// Supabase'de signInWithOtp fonksiyonu ile email'in varlığını kontrol edebiliriz
		// Bu fonksiyon, email kayıtlı değilse hata döndürür
		const { error: checkError } = await supabase.auth.signInWithOtp({
			email,
			options: {
				shouldCreateUser: false // Yeni kullanıcı oluşturma
			}
		});

		// Email kayıtlı değilse hata döndür
		if (checkError && checkError.message.toLowerCase().includes('user not found')) {
			return rejectWithValue('Bu email adresi ile kayıtlı bir hesap bulunamadı.');
		}

		// Şifre sıfırlama e-postası gönder
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`
		});

		if (error) {
			// Hata mesajlarını daha kapsamlı bir şekilde işle
			const errorMessage = error.message.toLowerCase();

			// Supabase, kayıtlı olmayan e-posta adresleri için de başarılı yanıt döndürüyor
			// Bu nedenle, hata mesajlarını kontrol ederek kullanıcıya doğru bilgi vermeliyiz
			if (errorMessage.includes('email not found') || errorMessage.includes('invalid email') || errorMessage.includes('user not found')) {
				return rejectWithValue('Bu email adresi ile kayıtlı bir hesap bulunamadı.');
			}

			if (errorMessage.includes('too many requests') || errorMessage.includes('rate limit')) {
				return rejectWithValue('Çok fazla deneme yaptınız. Lütfen birkaç dakika bekleyip tekrar deneyin.');
			}

			return rejectWithValue(translateAuthError(error.message));
		}

		// Başarılı durumda, son deneme zamanını kaydet
		localStorage.setItem('lastPasswordResetAttempt', now.toString());
		return true;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(translateAuthError(error.message));
		}
		return rejectWithValue('Şifre sıfırlama işlemi sırasında beklenmeyen bir hata oluştu');
	}
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ password, token }: { password: string; token: string }, { rejectWithValue }) => {
	try {
		// URL'den refresh token'ı al
		const hashParams = new URLSearchParams(window.location.hash.substring(1));
		const refreshToken = hashParams.get('refresh_token');

		if (!refreshToken) {
			return rejectWithValue('Geçersiz şifre sıfırlama oturumu.');
		}

		// Önce mevcut oturumu temizle
		await supabase.auth.signOut();

		// Access token ve refresh token ile oturum oluştur
		const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
			access_token: token,
			refresh_token: refreshToken
		});

		if (sessionError) {
			if (sessionError.message.includes('expired') || sessionError.message.includes('invalid')) {
				return rejectWithValue('Şifre sıfırlama bağlantısının süresi dolmuş. Lütfen yeni bir bağlantı talep edin.');
			}
			return rejectWithValue(translateAuthError(sessionError.message));
		}

		if (!sessionData.user) {
			return rejectWithValue('Geçersiz şifre sıfırlama oturumu.');
		}

		// Şifreyi güncelle
		const { error: updateError } = await supabase.auth.updateUser({
			password: password
		});

		if (updateError) {
			return rejectWithValue(translateAuthError(updateError.message));
		}

		// İşlem başarılı olduktan sonra oturumu sonlandır
		await supabase.auth.signOut();

		return true;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(translateAuthError(error.message));
		}
		return rejectWithValue('Şifre güncelleme işlemi sırasında beklenmeyen bir hata oluştu');
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		// Check Auth
		builder.addCase(checkAuth.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.isAuthenticated = !!action.payload;
				state.error = null;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = (action.payload as string) || 'Bir hata oluştu';
			});

		// Login
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload as User;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Register
		builder.addCase(registerUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(registerUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Logout
		builder.addCase(logoutUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || null;
			});

		// Update User
		builder.addCase(updateUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Update Profile
		builder.addCase(updateProfile.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Forgot Password
		builder.addCase(forgotPassword.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Reset Password
		builder.addCase(resetPassword.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(resetPassword.fulfilled, (state) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	}
});

export const { clearError } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectPaymentInfo = () => paymentInfo;

export default authSlice.reducer;
