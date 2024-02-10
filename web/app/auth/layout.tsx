'use client';

import LogoImg from "@/components/LogoImg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const user_data = useSelector((state: RootState) => state.auth.data);

	useEffect(() => {
		if (user_data && user_data.id) {
			// Navigate the user to the dashboard screen only if not already there
			router.replace('/dashboard');
		}
	}, [user_data]);

	return (
		<section className='flex flex-col items-center justify-center md:gap-3 h-full py-5'>
			<LogoImg height={150} width={200} />
			{children}
		</section>
	);
}
