'use client';

import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const AuthError = () => {
	const error = useSelector((state: RootState) => state.auth.error);
	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (elementRef.current && error) {
			elementRef?.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [error]);

	return (
		<>
			{error && (
				<p
					ref={elementRef}
					className='text-error-500 text-sm font-medium'
				>
					{error}
				</p>
			)}
		</>
	);
};
export default AuthError;
