import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign In',
};

interface Props {}
function LoginPage({}: Props) {
	return <div>The Login Page</div>;
}
export default LoginPage;
