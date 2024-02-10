import Link from 'next/link';
import LogoImg from './LogoImg';
import MenuTrigger from './MenuTrigger';
import Profile from './Profile';
import SeachInput from './SeachInput';

const Header = () => {
	return (
		<header className='grid grid-cols-12 w-full h-max md:h-[92px] lg:h-[112px] py-3 px-5 bg-white gap-4'>
			{/* logo */}
			<div className='flex items-center col-span-6 sm:col-span-3 gap-3'>
				<span className='md:hidden'><MenuTrigger /></span>
				<Link href={'/dashboard'}>
					<LogoImg height={50} width={100} />
				</Link>
			</div>

			{/* // Search component */}
			<div className='hidden sm:flex items-center justify-start col-start-4 col-span-6'>
				<SeachInput />
			</div>
			{/* Profile component */}
			<div className='flex items-center justify-center col-span-6 sm:col-span-3'>
				<Profile />
			</div>

			{/* search component */}
			<div className='flex items-center justify-center w-full sm:hidden col-span-12 mx-auto'>
				<SeachInput />
			</div>
		</header>
	);
};
export default Header;
