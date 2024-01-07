import Image from "next/image"
import BannerOne from 'public/svg/Ads 1.png'
import BannerTwo from 'public/svg/Ads 2.png'

type Props = {}
const Hero = (props: Props) => {
  return (
    <div className=" md:flex items-center gap-5 justify-center">
        <div className="hidden md:block">
            <Image src={BannerOne} alt="Banner Image" sizes="auto" />
        </div>
        <div>
            <Image src={BannerTwo} alt="Banner Image" sizes="auto"/>
        </div>
    </div>
  )
}
export default Hero