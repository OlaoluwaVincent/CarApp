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

function isOnline() {
	return navigator.onLine;
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
		if (!isOnline()) {
			throw {
				message: 'Please connect to the internet',
			};
		}

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
	console.log('register', userData);
	try {
		const response = await axiosInstance.post('auth/register', userData);
		const {
			data: { data: result },
		} = response;
		localStorage.setItem('token', result.token);
		return result.data;
	} catch (error: any) {
		// check if user is online
		if (!isOnline()) {
			throw {
				message: 'Please connect to the internet',
			};
		}
		const errorData: Error = {
			message: error.response?.data?.message || 'An error occurred',
			error: error.response?.data?.error || 'Unknown error',
			statusCode: error.response?.status || 500,
		};
		throw errorData;
	}
};
