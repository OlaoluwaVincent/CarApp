import BigButton from "@/components/BigButton"
import Menu from "@/components/Menu"
import Pick from "@/components/Pick"
import '../../../components/styles/category-page.css'
import { findAll } from "src/redux/features/product/product_services";
import { Suspense } from "react";

const ProductLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const data = await findAll();
    return (
        <section className="category-container">
            <div className="category-page">
                <Suspense>
                    <Menu data={data.data} />
                </Suspense>

                <article className="category-content">
                    <section className="flex flex-col lg:flex-row justify-between items-center my-8 gap-5 w-full">
                        <Pick label="Pick-up" id="pick-up" />
                        <BigButton />
                        <Pick label="Drop-off" id="drop-off" />
                    </section>

                    {/* This should contain the manipulated state of the products */}
                    {children}
                </article>

            </div>
        </section>
    )
}
export default ProductLayout