'use client';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const redirectToDashboardIfLoggedIn = () => {
	const [isLoggedIn, setIsLoggedId] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const user_data = useSelector((state: RootState) => state.auth.data);

	// Check if user is logged in
	if (user_data && user_data.id !== '') {
		setIsLoggedId(true)
	}
	if (user_data && user_data.role === 'ADMIN') {
		setIsAdmin(true)
	}
	return { isLoggedIn, isAdmin }
};

export default redirectToDashboardIfLoggedIn;
