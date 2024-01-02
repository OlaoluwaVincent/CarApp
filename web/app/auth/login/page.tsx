'use client';

import ClientComp from '@/components/ClientComp';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import LoginForm from './loginForm';
import { useRef, useEffect } from 'react';

function LoginPage() {
	const loading = useSelector((state: RootState) => state.auth.loading);
	const error = useSelector((state: RootState) => state.auth.error);

	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (elementRef.current && error) {
			elementRef?.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [error]);

	if (loading) {
		return <p className='animate-pulse'>Loading...</p>;
	}

	return (
		<ClientComp>
			<div className='flex items-center justify-center flex-col w-[90%] md:w-[500px] mx-auto'>
				{error && (
					<p className='text-error-500 text-sm font-medium'>
						{error}
					</p>
				)}
				<LoginForm />
			</div>

			<p className='mt-2'>
				Do not have an account?{' '}
				<Link
					href={'/auth/register'}
					className='text-sm text-dark-600 cursor-pointer'
				>
					Register here
				</Link>
			</p>
		</ClientComp>
	);
}
export default LoginPage;
