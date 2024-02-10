'use client';

import FormInput from '@/components/FormInput';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useState } from 'react';
import { registerUser } from 'src/redux/features/auth/auth_slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';

const sans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '700'],
	style: ['normal', 'italic'],
});

const RegisterForm = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCPassword] = useState('');
	const [passError, setPassError] = useState('');
	const [passLength, setPassLength] = useState('');

	function updateName(newValue: string) {
		setName(newValue);
	}
	function updateEmail(newValue: string) {
		setEmail(newValue);
	}
	function updatePassword(newValue: string) {
		if (newValue && newValue.length <= 7) {
			setPassLength('Password Length should be at least 8 character');
		} else {
			setPassLength('');
		}
		setPassword(newValue);
	}
	function confirmPassword(newValue: string) {
		setCPassword(newValue);
		if (newValue !== password) {
			setPassError('Passwords do not match');
		} else {
			setPassError('');
		}
	}

	function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		dispatch(registerUser({ name, email, password }));
	}

	return (
		<div className='flex justify-start flex-col gap-10 w-full'>
			<h1
				className={`${sans.className} font-bold text-4xl text-center`}
			>
				Create Account
			</h1>
			<form
				onSubmit={handleFormSubmit}
				className='flex flex-col gap-[30px]'
			>
				<FormInput
					label='Username'
					placeholder='Enter username'
					currentState={name}
					updateState={updateName}
					type='text'
				/>
				<FormInput
					label='Email'
					placeholder='email@email.com'
					currentState={email}
					updateState={updateEmail}
					type='email'
				/>
				<div className='flex gap-3 justify-between'>
					<aside>
						<FormInput
							type='password'
							label='Password'
							placeholder='*********'
							currentState={password}
							updateState={updatePassword}
							inputClassName={`${
								passLength && 'outline-error-500'
							}`}
						/>
						{passLength && (
							<p className='text-error-700 font-normal text-sm'>
								{passLength}
							</p>
						)}
					</aside>
					<aside>
						<FormInput
							type='password'
							label='Confirm Password'
							placeholder='*********'
							currentState={cpassword}
							updateState={confirmPassword}
							inputClassName={`${
								passError && 'outline-error-500'
							}`}
						/>
						{passError && (
							<p className='text-error-700 font-normal text-sm'>
								{passError}
							</p>
						)}
					</aside>
				</div>

				<button
					type='submit'
					className='w-full bg-dark-700 text-white py-3 hover:bg-dark-900 focus:bg-dark-500 font-normal text-sm md:text-base'
				>
					Create Account
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
