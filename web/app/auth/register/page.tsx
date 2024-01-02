import { Metadata } from 'next';
import RegisterForm from './register';
import ClientComp from '@/components/ClientComp';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Create Account',
};

interface Props {}
function RegisterPage({}: Props) {
	return (
		<ClientComp>
			<div className='flex items-center justify-center flex-col w-[90%] md:w-[500px] mx-auto'>
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
	);
}
export default RegisterPage;
