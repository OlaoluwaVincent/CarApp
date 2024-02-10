'use client'

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "src/redux/store"
import Product from "./Product"
import { getProducts } from "src/redux/features/product/product_slice"

type Props = {}
const Category = (props: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const { data, loading } = useSelector((state: RootState) => state.product);
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        dispatch(getProducts({}))
    }, [])

    const filteredData = useMemo(() => {
        let filteredData = data?.data.slice();

        if (filterBy === 'lowest') {
            filteredData = filteredData?.sort((a, b) => Number(a.amount) - Number(b.amount));
        } else if (filterBy === 'highest') {
            filteredData = filteredData?.sort((a, b) => Number(b.amount) - Number(a.amount));
        } else if (filterBy === 'name') {
            filteredData = filteredData?.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filteredData;
    }, [data, filterBy]);


    if (loading) {
        return <p className="animate-pulse font-bold text-black-500">Loading...</p>
    }
    if (!data?.length) {
        return <p>No Data</p>
    }
    return (
        <>
            <div className="flex w-full flex-row-reverse justify-between px-5 gap-4 mb-5">
                <div className="flex gap-3">
                    <h5>Sort By:</h5>
                    <select name="sort" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                        <option value={'default'}>Select</option>
                        <option value={'highest'}>Price (Asc) </option>
                        <option value={'lowest'}>Price (Desc)</option>
                        <option value={'name'}>Title</option>
                    </select>
                </div>
                <div>
                    <p>Showing {data.length} of {data.totalCount}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-5 mb-5">
                {filteredData?.map((pro) => (
                    <Product product={pro} key={pro.id} />
                ))}
            </div>
        </>
    )
}
export default Category