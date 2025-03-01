import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';
import type { RootState } from '../store';
import type { Package, PackageType, PackagesState } from '../../types';

const initialState: PackagesState = {
	webPackages: [],
	mobilePackages: [],
	isLoading: false,
	error: null
};

export const fetchPackagesByType = createAsyncThunk('packages/fetchByType', async (type: PackageType, { rejectWithValue }) => {
	try {
		const { data, error } = await supabase.from('packages').select('*').eq('status', 'active').eq('type', type);

		if (error) {
			throw error;
		}

		const parsedPackages = data.map((pkg: Package) => ({
			...pkg,
			features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features
		}));

		return { type, packages: parsedPackages };
	} catch (err) {
		return rejectWithValue(err instanceof Error ? err.message : 'Paketler yüklenirken bir hata oluştu');
	}
});

const packagesSlice = createSlice({
	name: 'packages',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPackagesByType.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
			.addCase(fetchPackagesByType.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.type === 'web') {
					state.webPackages = action.payload.packages;
				} else if (action.payload.type === 'mobile') {
					state.mobilePackages = action.payload.packages;
				}
			})
			.addCase(fetchPackagesByType.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	}
});

// Selectors
export const selectWebPackages = (state: RootState) => state.packages.webPackages;
export const selectMobilePackages = (state: RootState) => state.packages.mobilePackages;
export const selectPackagesLoading = (state: RootState) => state.packages.isLoading;
export const selectPackagesError = (state: RootState) => state.packages.error;

export default packagesSlice.reducer;
