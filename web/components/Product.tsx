import Image from "next/image";
import { useState } from "react"
import { TiHeartFullOutline, TiHeartOutline } from 'react-icons/ti';
import { GiSteeringWheel } from 'react-icons/gi';
import { BiSolidGasPump } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi2';
import { CarCredentials } from "src/utils/typing"
import Link from "next/link";

type Props = {
  product: CarCredentials
}

const Product = ({ product }: Props) => {

  const [isLiked, setIsLiked] = useState(false)
  function handleLikeCar() {
    setIsLiked(true)
  }
  function handleUnlikeCar() {
    if (isLiked) {
      setIsLiked(false)
    }
  }
  return (
    <article className="p-6 shadow-mild flex flex-col gap-5 w-full base:w-[350px] md:w-[300px] rounded-lg bg-white">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Link href={`products/rent/${product.id}`} className="text-xl font-bold text-black-500">{product.name}</Link>
          <p title="car name" className="text-sm text-black-300">{product.carType}</p>
        </div>
        {isLiked ?
          <TiHeartFullOutline size={'24px'} className='cursor-pointer fill-error-500' onClick={handleUnlikeCar} />
          :
          <TiHeartOutline size={'24px'} className='fill-black-300 cursor-pointer' onClick={handleLikeCar} />
        }
      </div>

      <section className="flex flex-row md:flex-col items-center justify-between gap-3">
      {/* Image */}
        <div className="relative my-[50px]">
          <Image
            src={product.carImage.images[0]}
            style={{ height: '90px', width: '200px' }}
            alt={product.name}
            width={200}
            height={70}
            className="mx-auto object-cover bg-cover object-center bg-center"
          />
          <div className="absolute rotate-180 w-full max-w-full h-[50%] bg-gradient-to-t from-transparent to-white right-0 -bottom-1"></div>
        </div>

        {/* Desc */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <aside className="flex gap-2 md:gap-1 items-center">
            <BiSolidGasPump size='24' className='fill-black-400' />
            <p className="text-black-400 text-xs md:text-sm ">{product.gasoline}</p>
          </aside>
          <aside className="flex gap-2 md:gap-1 items-center">
            <GiSteeringWheel size='24' className='fill-black-400' />
            <p className="text-black-400 text-xs md:text-sm ">{product.steering}</p>
          </aside>
          <aside className="flex gap-2 md:gap-1 items-center">
            <HiUsers size='24' className='fill-black-400' />
            <p className="text-black-400 text-xs md:text-sm ">{product.capacity} User</p>
          </aside>
        </div>
      </section>
      {/* Footer */}
      <div className="flex items-center justify-between">
        <aside className="font-bold text-sm md:text-base">
          ${product.amount} <span className="font-normal">/ Day</span>
        </aside>
        <aside>
          <button className="px-5 py-2 bg-info-600 hover:bg-info-500 rounded-[4px] text-white tracking-wider ">Rent Now</button>
        </aside>
      </div>
    </article>
  )
}
export default Product