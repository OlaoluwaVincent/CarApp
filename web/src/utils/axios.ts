import axios from 'axios';

const axiosInstance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:9000/api'
			: 'actualUrl',
	headers: {
		'Content-Type': 'application/json',
	},
});

// axiosInstance.interceptors.request.use((config) => {
// 	const bearerToken = localStorage.getItem('token');

// 	if (bearerToken) {
// 		config.headers.Authorization = `Bearer ${bearerToken}`;
// 	}

// 	return config;
// });

export default axiosInstance;