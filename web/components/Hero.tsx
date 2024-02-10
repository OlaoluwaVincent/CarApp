import Image from "next/image"
import Link from "next/link"
import BannerOne from 'public/svg/Ads 1.png'
import BannerTwo from 'public/svg/Ads 2.png'

type Props = {}
const Hero = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
      <div className="hidden md:block">
        <Link href={'#pick-up'}>
          <Image src={BannerOne} alt="Banner Image" sizes="auto" />
        </Link>
      </div>
      <div>
        <Link href={"#drop-off"}>
          <Image src={BannerTwo} alt="Banner Image" sizes="auto" />
        </Link>
      </div>
    </div>
  )
}
export default Hero