import { FaBell } from '../app/utils';

const Header = () => {
	return (
		<header className='grid grid-cols-12 w-full'>
			{/* logo */}
			<div className='col-span-6 md:col-span-3 bg-gray-300 p-4'>One</div>

			{/* // Search component */}
			<div className='hidden md:block col-start-4 col-span-6 bg-blue-500 p-4'>
				Two
			</div>
			{/* Profile component */}
			<div className='col-span-6 md:col-span-3 bg-gray-300 p-4'>
				Three
			</div>

			{/* search component */}
			<div className='md:hidden col-span-12 bg-blue-500 p-4'>Two</div>
		</header>
	);
};
export default Header;
