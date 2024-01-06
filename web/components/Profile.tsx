'use client';

import Image from 'next/image'
import { TiHeartFullOutline, FaBell, MdSettings } from '../src/utils/icons'
import ProfileImg from 'public/svg/logo.png'
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';


type Props = {}

const Profile = (props: Props) => {
  const user_data = useSelector((state: RootState) => state.auth.data);
  return (
    <div className='flex items-center justify-between w-full base:gap-2 sm:gap-2'>
      <span><TiHeartFullOutline size={'30px'} className='hidden base:inline-flex fill-black-400 cursor-pointer' /></span>

      <aside className='relative hidden base:inline-flex'>
        <span className='absolute top-0 -right-1 w-2 h-2 scale-100 bg-error-500 rounded-full'></span>
        <span><FaBell size={'30px'} className='fill-black-400 cursor-pointer' /></span>
      </aside>

      <span><MdSettings size={'30px'} className='hidden base:inline-flex fill-black-400 cursor-pointer' /></span>

      <aside>
        <Image src={user_data?.profileImg ?? ProfileImg} sizes='auto' alt={'Profile image of the ' + user_data?.name} className='max-w-[40px] aspect-square rounded-full border border-black-200' />
      </aside>
    </div>
  )
}

export default Profile