import axiosInstance  from 'src/utils/axios';
import { AuthData, Error } from 'src/utils/typing';


export const loginService = async (userData: {
	email: string;
	password: string;
}) => {
	try {
		const response = await axiosInstance.post('/auth/login', userData);
		const result: AuthData = response.data;
		localStorage.setItem('token', result.token);
		return result.data;
	} catch (error: any) {
		const errorData: Error = {
			message: error.response?.data?.message || 'Error connecting to server',
			error: error.response?.data?.error || 'Unknown error',
			statusCode: error.response?.status || 500,
		};
		throw errorData;
	}
};

export const registerService = async (userData: {
	name: string;
	email: string;
	password: string;
}) => {
	try {
		const response = await axiosInstance.post('auth/register', userData);
		const {
			data: { data: result, token }
		} = response;
		localStorage.setItem('token', token);
		return result;
	} catch (error: any) {
		const errorData: Error = {
			message: error.response?.data?.message || 'An error occurred',
			error: error.response?.data?.error || 'Unknown error',
			statusCode: error.response?.status || 500,
		};
		throw errorData;
	}
};
