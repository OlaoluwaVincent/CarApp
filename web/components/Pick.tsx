'use client'

import { useState } from "react";


type Props = {
    label: string;
    id:string;
}
const Pick = (props: Props) => {
    const [date, setDate] = useState('')
    const [Time, setTime] = useState('')
    const [location, setLocation] = useState('')
    return (
        <div className="w-full flex flex-col gap-2 lg:gap-4 px-2 lg:px-5 py-3 bg-white border border-black-200 rounded-xl">
            <aside>
                <input type="radio" name="pick" id={props.id}/>
                <label htmlFor={props.id} className="ml-2 font-bold text-base md:text-lg">{props.label}</label>
            </aside>
            <div className="flex gap-3 md:gap-[24px] justify-between md:justify-start">
                <div className="flex flex-col items-start justify-start gap-2">
                    <h3 className="font-bold text-sm md:text-base">Location</h3>
                    <div>
                        <select name="location" id="" className="text-sm md:text-base">
                            <option defaultValue="default">Location</option>
                            <option value="one">One</option>
                            <option value="two">Two</option>
                            <option value="three">Three</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                    <h3 className="font-bold text-sm md:text-base">Date</h3>
                    <div>
                        <select name="location" id="" className="text-sm md:text-base">
                            <option defaultValue="default">Date</option>
                            <option value="one">One</option>
                            <option value="two">Two</option>
                            <option value="three">Three</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                    <h3 className="font-bold text-sm md:text-base">Time</h3>
                    <div>
                        <select name="location" id="" className="text-sm md:text-base">
                            <option defaultValue="default">Time</option>
                            <option value="one">One</option>
                            <option value="two">Two</option>
                            <option value="three">Three</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Pick