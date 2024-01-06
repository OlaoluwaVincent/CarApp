'use client'

import Image from 'next/image';
import logoIcon from '../../public/svg/logo.png';
import redirectToDashboardIfLoggedIn from '@/components/IsLoggedIn';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isLoggedIn } = redirectToDashboardIfLoggedIn();

	if (isLoggedIn) {
		// navigate the user to dashboard screen
	}
	return (
		<section className='flex flex-col items-center justify-center md:gap-3 h-full py-5'>
			<Image
				src={logoIcon}
				alt='Website logo icons'
				height={150}
				width={200}
				priority={true}
				className='mx-auto mb-5'
			/>
			{children}
		</section>
	);
}
