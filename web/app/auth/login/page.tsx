'use client';

// import { Metadata } from 'next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'src/redux/features/auth_slice';
import { AppDispatch, RootState } from 'src/redux/store';
// export const metadata: Metadata = {
// 	title: 'Sign In',
// };

function LoginPage() {
	const dispatch: AppDispatch = useDispatch();
	const loading = useSelector((state: RootState) => state.auth.loading);
	const error = useSelector((state: RootState) => state.auth.error);

	const [email, setEmail] = useState('ola');
	const [password, setPassword] = useState('password');

	const handleLogin = () => {
		// Dispatch the loginUser async thunk with the email and password
		dispatch(loginUser({ email, password }));
	};

	return (
		<div>
			The Login Page
			<button onClick={handleLogin}>Click</button>
		</div>
	);
}
export default LoginPage;
