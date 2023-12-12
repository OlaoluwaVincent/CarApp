import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
	weight: '600',
	style: 'normal',
	subsets: ['devanagari'],
});

export default function AuthLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<h2 className={`${poppins.className} `}>This is the Auth Layout</h2>
			<Link href={'/'} className={`${poppins.className} underline `}>
				Return Home
			</Link>
			{children}
		</section>
	);
}
