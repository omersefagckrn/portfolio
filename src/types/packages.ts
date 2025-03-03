export type PackageType = 'web' | 'mobile';

export interface Package {
	id: number;
	name: string;
	description: string;
	price: number;
	features: string[] | string;
	type: PackageType;
	status: 'active' | 'inactive';
	created_at: string;
	updated_at: string;
}

export interface PackagesState {
	webPackages: Package[];
	mobilePackages: Package[];
	isLoading: boolean;
	error: string | null;
}
