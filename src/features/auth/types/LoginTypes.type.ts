export type LoginCredentials = {
	email: string;
	password: string;
};

export type AuthSuccessResponse = {
	message?: string;
	token?: string;
	userId?: string;
	expiresIn?: number;
	data?: Record<string, unknown> | null;
};

export type AuthErrorResponse = {
	message: string;
	code?: number;
	errors?: string[];
};

export type LoginResponse = AuthSuccessResponse;
export type LoginError = AuthErrorResponse;
export type RegistrationResponse = AuthSuccessResponse;
