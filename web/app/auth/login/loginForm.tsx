'use client';

import FormInput from '@/components/FormInput';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from 'src/redux/features/auth/auth_slice';
import { AppDispatch } from 'src/redux/store';

const sans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '700'],
	style: ['normal', 'italic'],
});

const LoginForm = () => {
	const dispatch: AppDispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	function updateEmail(newValue: string) {
		setEmail(newValue);
	}
	function updatePassword(newValue: string) {
		setPassword(newValue);
	}

	function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		dispatch(loginUser({ email, password }));
	}

	return (
		<div className='flex justify-start flex-col gap-10 w-full'>
			<h1
				className={`${sans.className} font-bold leading-[-0.1px] text-4xl text-center`}
			>
				Welcome Back
			</h1>
			<form
				onSubmit={handleFormSubmit}
				className='flex flex-col gap-[30px]'
			>
				{error && <p className='text-sm text-error-500'>{error}</p>}

				<FormInput
					label='Email'
					type='email'
					placeholder='email@email.com'
					currentState={email}
					updateState={updateEmail}
				/>
				<FormInput
					label='Password'
					type='password'
					placeholder='*********'
					currentState={password}
					updateState={updatePassword}
				/>

				<button
					type='submit'
					className='w-full bg-dark-700 text-white py-3 hover:bg-dark-900 focus:bg-dark-500 font-normal text-sm md:text-base'
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
