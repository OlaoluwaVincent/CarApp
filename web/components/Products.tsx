'use client'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "src/redux/features/product/product_slice";
import { AppDispatch, RootState } from "src/redux/store";
import Product from "./Product";
import  '../components/styles/products-style.css';
type Props = {}
const Products = (props: Props) => {
    // todo:: Include page and search params in the data
    //////////////////////////////////////////
    const { data, error, loading } = useSelector((state: RootState) => state.product);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts({ sort: 'asc', page: '1' }))

    }, [getProducts])

    if (loading) {
        return <p className="animate-pulse">Loading...</p>
    }
    console.log(error)
    return (
        <div>
            {error && <p className="text-error-700">{error}</p>}
            <article className="car-products">
                {data && data.data.map((product => (
                    <Product key={product.id} product={product} />
                )))}
            </article>
            {!error && !data &&
                <p className="text-info-900 font-bold text-lg">There are no Cars for hire at the moment, Please check back</p>
            }
        </div>
    )
}
export default Products