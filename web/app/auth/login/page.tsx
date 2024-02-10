import ClientComp from '@/components/ClientComp';
import Link from 'next/link';
import LoginForm from './loginForm';
import LoadingComponent from '@/components/Loading';
import AuthError from '@/components/AuthError';

function LoginPage() {
	return (
		<>
			<LoadingComponent />

			<ClientComp>
				<div className='flex items-center justify-center flex-col w-[90%] md:w-[500px] mx-auto'>
					<AuthError />
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
		</>
	);
}
export default LoginPage;
