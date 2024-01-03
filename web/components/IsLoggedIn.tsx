'use client';
import { RootState } from 'src/redux/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const redirectToDashboardIfLoggedIn = () => {
	const router = useRouter();
	const user_data = useSelector((state: RootState) => state.auth.data);

	// Check if user is logged in
	if (user_data && user_data.id !== '') {
		router.replace('/dashboard');
	}
   console.log('You are not logged in')
};

export default redirectToDashboardIfLoggedIn;
