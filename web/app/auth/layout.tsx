import Image from 'next/image';
import logoIcon from '../../public/svg/logo.png';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className='flex flex-col items-center justify-center md:gap-3 h-screen min-h-screen overflow-scroll'>
			<Image
				src={logoIcon}
				alt='Website logo icons'
				sizes='auto'
				priority={true}
				className='mx-auto mb-5'
			/>
			{children}
		</section>
	);
}
