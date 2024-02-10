'use client'

import { usePathname } from "next/navigation";
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toggleShow } from 'src/redux/features/sidenav/sidebar-slice';
import { RootState } from "src/redux/store";


const MenuTrigger = () => {
    const pathName = usePathname()
    if (pathName !== '/products') {
        return null
    }

    const dispatch = useDispatch();
    const showSideNav = useSelector((state: RootState) => state.sidebar.show)

    function handleDispatch() {
        if (showSideNav === 'show') {
            return dispatch(toggleShow('hide'))
        }

        dispatch(toggleShow('show'))
    }

    return (
        <MdOutlineMenu size='30px' className='fill-black-400' onClick={handleDispatch} />
    )
}
export default MenuTrigger