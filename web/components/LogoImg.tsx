import Image from 'next/image'
import React from 'react'
import logoIcon from 'public/svg/logo.png';


type Props = {
    height:number;
    width: number;
}

const LogoImg = (props: Props) => {
    return (
        <Image
            src={logoIcon}
            alt='Website logo icons'
            height={props.height}
            width={props.width}
            priority={true}
        />
    )
}

export default LogoImg