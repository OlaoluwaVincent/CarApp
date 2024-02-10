import { Metadata } from 'next';
import RegisterForm from './register';
import ClientComp from '@/components/ClientComp';
import Link from 'next/link';
import AuthError from '@/components/AuthError';
import LoadingComponent from '@/components/Loading';

export const metadata: Metadata = {
	title: 'Create Account',
};

interface Props {}
function RegisterPage({}: Props) {
	return (
		<>
			<LoadingComponent />
			<ClientComp>
				<div className='flex items-center justify-center flex-col w-[90%] md:w-[500px] mx-auto'>
					<AuthError />
					<RegisterForm />
				</div>

				<p className='mt-2'>
					Already have an account?{' '}
					<Link
						href={'/auth/login'}
						className='text-sm text-dark-600 cursor-pointer'
					>
						Login here
					</Link>
				</p>
			</ClientComp>
		</>
	);
}
export default RegisterPage;
