import { FaUpDown } from "react-icons/fa6";
type Props = {}
const BigButton = (props: Props) => {
    return (
        <div className='rounded-lg flex-shrink-0 p-4 bg-info-500 w-max'>
            <FaUpDown size={'30px'} className='cursor-pointer' style={{ fill: 'white' }} />
        </div>
    )
}
export default BigButton