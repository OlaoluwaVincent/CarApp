'use client'

import { useState } from "react"
import { CiSearch } from '../src/utils/icons'
type Props = {
}

const SeachInput = (props: Props) => {
    const [search, setSearch] = useState('')
    function handleSearch(){
        // submit this to the backend
    }
    return (
        <form onSubmit={handleSearch} className="w-[85%] relative rounded-md base:rounded-[70px] overflow-hidden border border-black-200 bg-white text-info-800 font-medium">
            <CiSearch size={'30px'} className='absolute lefft-2 top-1/2 -translate-y-1/2 fill-black-400' />

            <input type="text" name="search" id="search" placeholder="Search Car" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full py-3 px-8 border-none outline-none" />
        </form>
    )
}

export default SeachInput