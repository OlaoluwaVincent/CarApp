'use client'

import { useRouter } from "next/navigation"

type Props = {}
const GeneralFilter = (props: Props) => {
  const router = useRouter()
  
  function navigate(){
    router.push('/products')
  }
  return (
    <div className="flex items-center justify-between">
        <button type="button">Popular Car</button>
        <button type="button" onClick={navigate}>All</button>
    </div>
  )
}
export default GeneralFilter