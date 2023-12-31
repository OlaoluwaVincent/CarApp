'use client'

import BigButton from "@/components/BigButton";
import GeneralFilter from "@/components/GeneralFilter";
import Hero from "@/components/Hero";
import Pick from "@/components/Pick";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "src/redux/features/product/product_slice";
import { AppDispatch } from "src/redux/store";

interface Props { }
const Homepage = (props: Props) => {
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts({ sort: 'asc', page: '1' }))
	})
	return <div className='w-full'>
		<Hero />
		<section className="flex flex-col md:flex-row justify-between items-center my-8 gap-5">
			<Pick label="Pick-up" id="pick-up" />
			<BigButton />
			<Pick label="Drop-off" id="drop-off" />
		</section>

		<section className="w-full">
			<GeneralFilter />
		</section>
	</div>;
};
export default Homepage;
