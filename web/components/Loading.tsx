'use client';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const LoadingComponent = () => {
	const loading = useSelector((state: RootState) => state.auth.loading);

	if (loading) {
		return <p className='animate-pulse'>Loading...</p>;
	} else {
		return null;
	}
};
export default LoadingComponent;
