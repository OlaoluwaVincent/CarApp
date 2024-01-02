import axiosInstance from 'src/utils/axios';

interface Data {
	data: {
		id: string;
		email: string;
		name: string;
		role: string;
		address: string;
		profileImg: string;
		state: string;
		region: string;
	};
	token: string;
}

export interface Error {
	message: string;
	error: string;
	statusCode: number;
}

export const loginService = async (userData: {
	email: string;
	password: string;
}) => {
	try {
		const response = await axiosInstance.post('/auth/login', userData);
		const result: Data = response.data;
		localStorage.setItem('token', result.token);
		return result.data;
	} catch (error: any) {
		const errorData: Error = {
			message: error.response?.data?.message || 'An error occurred',
			error: error.response?.data?.error || 'Unknown error',
			statusCode: error.response?.status || 500,
		};
		throw errorData;
	}
};
