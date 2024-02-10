import BigButton from "@/components/BigButton";
import GeneralFilter from "@/components/GeneralFilter";
import Hero from "@/components/Hero";
import Pick from "@/components/Pick";
import Products from "@/components/Products";

interface Props { }
const Homepage = (props: Props) => {
	return (
		<div className='w-full flex flex-col gap-8 px-5'>
			<Hero />
			<section className="flex flex-col md:flex-row justify-between items-center my-8 gap-5 w-full">
				<Pick label="Pick-up" id="pick-up" />
				<BigButton />
				<Pick label="Drop-off" id="drop-off" />
			</section>

			<section className="">
				<GeneralFilter />
			</section>

			<section id="products">
				<Products />
			</section>
		</div>
	)
};
export default Homepage;
