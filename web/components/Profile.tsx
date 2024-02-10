"use client";

import Image from "next/image";
import { FaBell, MdSettings } from "../src/utils/icons";
import ProfileImg from "public/svg/logo.png";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { TiHeartFullOutline } from "react-icons/ti";
import Link from "next/link";


const Profile = () => {
  const [notification, setNotification] = useState(true);
  const user_data = useSelector((state: RootState) => state.auth.data);

  if (!user_data?.id) {
    return (
      <>
        <Link href={'/auth/login'} className="px-3 py-1.5 rounded-sm font-bold hover:bg-info-700 mr-4 tracking-wider bg-dark-800 text-white">
          Sign In
        </Link>
        <Link href={'auth/register'} className="px-3 py-1.5 rounded-sm font-bold hover:bg-dark-800 tracking-wider bg-info-700 text-white">
          Sign Up
        </Link>
      </>
    );
  }
  return (
    <div className="flex items-center justify-end w-full gap-2 sm:gap-4">
      <span>
        <TiHeartFullOutline
          size={"30px"}
          className="hidden base:inline-flex fill-black-400 cursor-pointer"
        />
      </span>

      <aside className="relative hidden base:inline-flex">
        {notification && (
          <span className="absolute top-0 -right-1 w-2 h-2 scale-100 bg-error-500 rounded-full"></span>
        )}
        <span>
          <FaBell size={"30px"} className="fill-black-400 cursor-pointer" />
        </span>
      </aside>

      <span>
        <MdSettings
          size={"30px"}
          className="hidden base:inline-flex fill-black-400 cursor-pointer"
        />
      </span>

      <aside>
        <Image
          src={user_data?.profileImg ?? ProfileImg}
          sizes="auto"
          alt={"Profile image of the " + user_data?.name}
          className="max-w-[40px] aspect-square rounded-full border border-black-200"
        />
      </aside>
    </div>
  );
};

export default Profile;
